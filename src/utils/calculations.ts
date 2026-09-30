import { Fault } from "../models/Fault";
import { Vehicle } from "../models/Vehicle";
import { MaintenanceService } from "../services/MaintenanceService";

export function calculateVehicleHealthScore(
  vehicle: Vehicle,
  faults: Fault[],
  maintenanceService: MaintenanceService,
): number {
  let score = 100;

  const vehicleFaults = faults.filter(
    (fault) => fault.vehicleId === vehicle.id,
  );

  vehicleFaults.forEach((fault) => {
    switch (fault.severity) {
      case "LOW":
        score -= 5;
        break;

      case "MEDIUM":
        score -= 10;
        break;

      case "HIGH":
        score -= 20;
        break;

      case "CRITICAL":
        score -= 40;
        break;

      default:
        break;
    }
  });

  const overdueKilometers =
    maintenanceService.getMaintenanceOverdueKilometers(vehicle);

  if (overdueKilometers > 0 && overdueKilometers <= 1000) {
    score -= 10;
  } else if (overdueKilometers > 1000 && overdueKilometers < 5000) {
    score -= 20;
  } else if (overdueKilometers >= 5000) {
    score -= 30;
  }

  return Math.max(0, score);
}

export type VehicleRiskLevel =
  | "HEALTHY"
  | "ATTENTION"
  | "HIGH_RISK"
  | "CRITICAL";

export function getVehicleRiskLevel(healthScore: number): VehicleRiskLevel {
  if (healthScore >= 80) {
    return "HEALTHY";
  } else if (healthScore >= 60) {
    return "ATTENTION";
  } else if (healthScore >= 40) {
    return "HIGH_RISK";
  } else {
    return "CRITICAL";
  }
}
