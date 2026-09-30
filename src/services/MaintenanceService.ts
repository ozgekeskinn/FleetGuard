import { MaintenanceRecord } from "../models/MaintenanceRecord";
import { Vehicle } from "../models/Vehicle";

export class MaintenanceService {
  private readonly maintenanceInterval = 10_000;

  getKilometersSinceLastMaintenance(vehicle: Vehicle): number {
    return vehicle.kilometer - vehicle.lastMaintenanceKm;
  }

  isMaintenanceRequired(vehicle: Vehicle): boolean {
    return (
      this.getKilometersSinceLastMaintenance(vehicle) >=
      this.maintenanceInterval
    );
  }

  applyMaintenanceRecord(
    vehicle: Vehicle,
    maintenanceRecord: MaintenanceRecord,
  ): void {
    if (maintenanceRecord.vehicleId !== vehicle.id) {
      throw new Error("Bakım kaydı bu araca ait değil.");
    }

    if (maintenanceRecord.kilometer > vehicle.kilometer) {
      throw new Error(
        "Bakım kilometresi aracın mevcut kilometresinden büyük olamaz.",
      );
    }

    if (maintenanceRecord.kilometer < vehicle.lastMaintenanceKm) {
      throw new Error(
        "Bakım kilometresi bir önceki bakım kilometresinden küçük olamaz.",
      );
    }

    vehicle.lastMaintenanceKm = maintenanceRecord.kilometer;
  }

  getMaintenanceOverdueKilometers(vehicle: Vehicle): number {
    const overdueKilometers =
      this.getKilometersSinceLastMaintenance(vehicle) -
      this.maintenanceInterval;
    return Math.max(0, overdueKilometers);
  }
}
