import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Austin, TX", "(512) 555-0147", "john.doe@example.com", "linkedin.com/in/johndoe-quantumexample"];

export const RESUMES: PathResumes = {
  "quantum-software-developer": {
    levelLabel: "Quantum Software Developer",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Quantum software developer trained in the mathematics, quantum mechanics, and programming fluency needed to build real quantum applications — linear algebra and complex vector spaces, superposition/entanglement/measurement, and hands-on development in both major quantum SDKs, Qiskit (IBM Quantum) and Q# (Azure Quantum). Built and simulated quantum circuits from scratch, validated measurement outcomes against theoretical predictions, and ran circuits on real IBM Quantum hardware. Bringing that foundation to a Quantum Software Developer or Quantum Application Engineer role.",
    skills: [
      "Linear Algebra & Complex Vector Spaces for Quantum Computing",
      "Quantum Mechanics (Superposition, Entanglement, Measurement, No-Cloning)",
      "Qiskit & the IBM Quantum Development Workflow",
      "Q# & Azure Quantum (Resource Estimation, Workspace Management)",
      "Quantum Circuit Design & State-Vector Simulation",
      "Quantum Teleportation & Superdense Coding",
      "Python & NumPy for Scientific Computing",
      "Quantum State Visualization (Bloch Sphere, Q-Sphere)",
      "Noise Modeling & Basic Error Mitigation",
      "Scientific Reproducibility & Research-Grade Documentation",
    ],
    tools: "Qiskit, Qiskit Aer, IBM Quantum Platform, Q#, Azure Quantum, Python, NumPy, Matplotlib, Jupyter",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Quantum Computing Software Engineer Track",
            right: "2026",
            sub: "Quantum Computing Software Engineer Path · Austin, TX",
            bullets: [
              "Built the linear algebra and complex-number foundation quantum computing actually runs on: vector spaces, matrix transformations, eigenvalues/eigenvectors, unitary and Hermitian operators, and tensor products for multi-qubit systems — connecting every concept directly to why quantum gates are unitary and how measurement probabilities are computed.",
              "Developed real scientific-Python fluency for quantum work: NumPy linear algebra, Kronecker products for multi-qubit state spaces, complex-matrix computation, and Bloch-sphere visualization, closing with a self-built mini quantum math toolkit.",
              "Studied real quantum mechanics for computing — not a physics-major treatment, but genuine fluency in Dirac notation, superposition, the Born rule for measurement, Bell states and entanglement, the no-cloning theorem, and unitary time evolution — then applied it directly to quantum teleportation and superdense coding.",
              "Learned quantum computing fundamentals from the ground up: every single-qubit gate (Pauli X/Y/Z, Hadamard, phase, rotation gates), entangling multi-qubit gates (CNOT, SWAP, Toffoli), reading and designing circuit diagrams, and building a state-vector simulator from scratch to understand exactly what a simulator does and why it hits an exponential wall.",
              "Built real IBM Quantum development fluency with Qiskit: constructing circuits with the QuantumCircuit class, running on the Aer simulator with realistic noise models, visualizing results (histograms, Bloch sphere, Q-sphere plots), transpiling circuits for real hardware, and running actual circuits on IBM Quantum's free-tier hardware.",
              "Built parallel fluency in Q# and Azure Quantum as a second major toolchain: Q# operations and quantum data types, controlled/adjoint functors, the Azure Quantum resource estimator, and Python/Q# interoperability — then directly compared Q#'s and Qiskit's design philosophies by porting a circuit between them.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Quantum Circuit Simulator — Portfolio Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Quantum Computing Software Engineer Path",
            bullets: [
              "Built a quantum circuit simulator from first principles: state-vector representation, gate application as matrix-vector multiplication, and measurement sampling from the Born-rule probability distribution.",
              "Validated every measurement outcome against hand-computed theoretical probabilities rather than trusting the simulator blindly, catching and fixing a sign error in the simulator's phase-gate implementation in the process.",
              "Wrote a clear, step-by-step explanation of state-vector evolution through the circuit, suitable for walking a non-specialist reviewer through exactly what the simulator is doing and why.",
              "Ran the equivalent circuit on real IBM Quantum hardware via the free tier and compared the noisy real-hardware distribution against the simulator's noiseless theoretical prediction, documenting the gap honestly.",
            ],
          },
        ],
      },
    ],
  },
  "quantum-algorithms-engineer": {
    levelLabel: "Quantum Algorithms Engineer",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Quantum algorithms engineer with the full Quantum Computing Software Engineer foundation plus advanced depth in landmark quantum algorithms, real quantum hardware, error correction, quantum machine learning, and quantum optimization. Implemented Grover's algorithm, the quantum Fourier transform, and phase estimation from scratch, modeled realistic noise and built elementary error-correcting codes, and built a working hybrid quantum-classical optimization workflow benchmarked honestly against a classical baseline. Bringing hardware-aware algorithm design and honest, rigorous benchmarking to a Quantum Algorithms Engineer or quantum research-engineering role.",
    skills: [
      "Everything from the Quantum Software Developer level, plus:",
      "Quantum Complexity Theory (BQP) & Honest Quantum Speedup Analysis",
      "Grover's Algorithm, Quantum Fourier Transform & Phase Estimation",
      "Shor's Algorithm & Its Real Practical Limitations",
      "Quantum Hardware Modalities (Superconducting, Trapped-Ion, Photonic, Neutral-Atom)",
      "Quantum Error Correction (Stabilizer Codes, Surface Code) & Fault-Tolerance Resource Estimation",
      "Variational Quantum Circuits & Quantum Machine Learning (Honest Framing)",
      "QAOA & VQE for Combinatorial Optimization",
      "Hybrid Quantum-Classical Architecture & Cost/Latency Management",
      "Quantum Software Testing, Architecture & Reproducibility",
      "Benchmarking Quantum Algorithms Against Classical Baselines",
    ],
    tools: "Qiskit, Qiskit Aer, Q#, Azure Quantum, PennyLane/Qiskit Machine Learning concepts, Python, NumPy, Jupyter, Git",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Quantum Computing Software Engineer Track, Algorithms Engineer Depth",
            right: "2026",
            sub: "Quantum Computing Software Engineer Path · Austin, TX",
            bullets: [
              "Completed the full Quantum Software Developer foundation (math, quantum mechanics, Qiskit, Q#/Azure Quantum — see below), then went deep on landmark quantum algorithms: the quantum Fourier transform's derivation and circuit construction, phase estimation as a building block for other algorithms, Grover's algorithm with its real oracle/diffusion-operator mechanics and optimal iteration count, and Shor's algorithm's period-finding reduction with an honest treatment of why breaking RSA today is not practical.",
              "Studied all four major quantum hardware modalities — superconducting, trapped-ion, photonic, and neutral-atom — with real tradeoffs (coherence time, connectivity, calibration) and how to choose a platform for a given workload, not just a feature checklist.",
              "Built real quantum error correction fluency: noise modeling, the 3-qubit bit-flip and phase-flip codes, the Shor 9-qubit code, stabilizer formalism, the surface code's lattice structure, and resource estimation for logical vs. physical qubits — closing with an honest comparison of the NISQ era against the fault-tolerant era the field is still working toward.",
              "Covered quantum machine learning with explicit honesty about where the field stands: variational quantum circuits, the parameter-shift rule, data encoding strategies, quantum kernel methods, and barren plateaus as a genuine training obstacle — with no claim of proven practical QML advantage over classical methods.",
              "Built quantum optimization fluency for real combinatorial problems: QUBO formulation, QAOA's cost/mixer Hamiltonian structure, VQE for molecular ground-state energy, and quantum finance applications like portfolio optimization — every result benchmarked against a credible classical baseline, not presented in isolation.",
              "Applied real software-engineering discipline to quantum code: testing and debugging quantum programs (including statistical testing of measurement outcomes), backend-abstraction architecture patterns for supporting multiple SDKs, and reproducibility practices (pinned SDK versions, recorded random seeds and shot counts) specific to quantum research code.",
              "Built a hybrid quantum-classical computing architecture from the ground up: the variational hybrid-loop pattern, orchestrating pipelines across classical and quantum compute, error handling and retry strategies for queued hardware, and real cost/latency budget management for a quantum cloud workflow.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Quantum Algorithms Laboratory — Portfolio Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Quantum Computing Software Engineer Path",
            bullets: [
              "Implemented Grover's algorithm from scratch for an unstructured search problem, building the oracle and diffusion operator as explicit circuit components and verifying the amplitude-amplification behavior across iterations against the theoretical ⌊π/4·√N⌋ optimal iteration count.",
              "Implemented the quantum Fourier transform and explored phase estimation, comparing the circuit's observed output distribution against hand-computed theoretical predictions rather than assuming correctness.",
              "Documented where the implementation's observed results diverged from theory under simulated noise, and explained the specific mechanism behind each divergence.",
            ],
          },
          {
            left: "Quantum Error Correction Laboratory — Portfolio Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Quantum Computing Software Engineer Path",
            bullets: [
              "Modeled realistic bit-flip and phase-flip noise and implemented the 3-qubit repetition code end to end: encoding, error injection, syndrome measurement, and correction.",
              "Compared physical vs. logical error rates across a range of noise levels, producing a real, computed threshold-behavior curve rather than asserting the threshold theorem's result without evidence.",
            ],
          },
          {
            left: "Hybrid Quantum Optimization — Portfolio Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Quantum Computing Software Engineer Path",
            bullets: [
              "Built a real hybrid quantum-classical optimization workflow (QAOA) for a combinatorial problem formulated as a QUBO, with a classical optimizer driving the circuit's variational parameters.",
              "Benchmarked the QAOA result honestly against a classical baseline (simulated annealing), documenting both the solution quality gap and the real computational cost of each approach rather than only reporting favorable numbers.",
            ],
          },
        ],
      },
    ],
  },
};
