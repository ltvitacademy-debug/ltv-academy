import type { Metadata } from "next";
import CareerLaunchDashboard from "@/components/app/CareerLaunchDashboard";

export const metadata: Metadata = {
  title: "LTV Career Launch",
  robots: { index: false },
};

export default function CareerLaunchDashboardPage() {
  return <CareerLaunchDashboard />;
}
