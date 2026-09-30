export type FaultSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface IFault {
  id: string;
  vehicleId: string;
  title: string;
  description: string;
  severity: FaultSeverity;
  resolved: boolean;
}
