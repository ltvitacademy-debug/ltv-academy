# Capstone: Build It

With scope defined, this lesson is the actual build: every manifest for Northbridge Retail's product-catalog and checkout services, packaged as Helm charts, applied to a cluster, and verified end to end. Work through this in order — each piece depends on the one before it, the same way it would on a real team.

## What you'll learn

- Writing the Deployment, Service, Ingress, ConfigMap, Secret, and HPA for both services
- Packaging both as Helm charts with a shared pattern and environment-specific values
- Installing, verifying, upgrading, and rolling back the release
- Writing the Argo CD Application manifest and a short operational runbook

## Step 1: the Deployments

```yaml
# charts/product-catalog/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-product-catalog
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels: { app: product-catalog }
  template:
    metadata:
      labels: { app: product-catalog }
    spec:
      containers:
        - name: product-catalog
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          ports: [{ containerPort: 8080 }]
          envFrom:
            - configMapRef: { name: {{ .Release.Name }}-config }
          resources: {{- toYaml .Values.resources | nindent 12 }}
```

checkout's Deployment follows the same shape, with one addition: it reads its database credentials from a Secret, not just a ConfigMap.

```yaml
          env:
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: {{ .Release.Name }}-db-credentials
                  key: password
```

## Step 2: ConfigMap and Secret

```yaml
# charts/checkout/templates/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-config
data:
  CATALOG_SERVICE_URL: "http://product-catalog:80"
  LOG_LEVEL: "{{ .Values.logLevel }}"
```

```bash
# Create the Secret once, out of band — never commit raw credentials to Git
kubectl create secret generic checkout-db-credentials \
  --from-literal=password='<real-password-here>' \
  -n northbridge-retail
```

## Step 3: Service and Ingress

```yaml
# charts/checkout/templates/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: {{ .Release.Name }}-checkout
spec:
  selector: { app: checkout }
  ports: [{ port: 80, targetPort: 8080 }]
```

```yaml
# One Ingress routing to both services by path
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: northbridge-retail
spec:
  rules:
    - host: shop.northbridgeretail.com
      http:
        paths:
          - path: /catalog
            pathType: Prefix
            backend:
              service: { name: catalog-product-catalog, port: { number: 80 } }
          - path: /checkout
            pathType: Prefix
            backend:
              service: { name: checkout-checkout, port: { number: 80 } }
```

## Step 4: HorizontalPodAutoscaler on checkout

```yaml
# charts/checkout/templates/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: {{ .Release.Name }}-checkout
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: {{ .Release.Name }}-checkout
  minReplicas: {{ .Values.autoscaling.minReplicas }}
  maxReplicas: {{ .Values.autoscaling.maxReplicas }}
  metrics:
    - type: Resource
      resource:
        name: cpu
        target: { type: Utilization, averageUtilization: 70 }
```

## Step 5: install, verify, upgrade, roll back

```bash
helm lint ./charts/product-catalog ./charts/checkout
helm template catalog ./charts/product-catalog --values charts/product-catalog/values-prod.yaml

helm install catalog ./charts/product-catalog --values charts/product-catalog/values-prod.yaml -n northbridge-retail
helm install checkout ./charts/checkout --values charts/checkout/values-prod.yaml -n northbridge-retail

kubectl get pods -n northbridge-retail
kubectl get ingress -n northbridge-retail
kubectl get hpa -n northbridge-retail

# Exercise a real upgrade and rollback
helm upgrade checkout ./charts/checkout --set image.tag=1.6.0 -n northbridge-retail
helm rollback checkout 1 -n northbridge-retail
```

If any Pod doesn't reach `Running`, go back to lesson 34's playbook: `kubectl describe pod`, then `kubectl logs`.

## Step 6: the Argo CD manifest and the runbook

```yaml
# argocd/checkout-application.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: checkout
spec:
  source:
    repoURL: https://github.com/northbridgeretail/k8s-manifests.git
    path: charts/checkout
    helm: { valueFiles: [values-prod.yaml] }
  destination: { namespace: northbridge-retail }
  syncPolicy: { automated: { prune: true, selfHeal: true } }
```

In `RUNBOOK.md`, document at least: what `CrashLoopBackOff` on checkout usually means for this app, how to check whether the HPA is actually scaling (`kubectl get hpa -w`), and how to roll back a bad release.

## Key terms

- **envFrom / valueFrom.secretKeyRef** — the two patterns for injecting ConfigMap and Secret data into a container
- **scaleTargetRef** — the field telling an HPA which Deployment it controls
- **Out-of-band secret creation** — creating a Secret directly with `kubectl create secret`, outside of Git, so raw credentials never end up committed
