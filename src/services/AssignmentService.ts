import { Driver } from "../models/Driver";
import { Fault } from "../models/Fault";
import { Vehicle } from "../models/Vehicle";
import { calculateVehicleHealthScore } from "../utils/calculations";
import {
  canDriveVehicle,
  hasCriticalUnresolvedFault,
} from "../utils/validators";
import { MaintenanceService } from "./MaintenanceService";

export class AssignmentService {
  constructor(private maintenanceService: MaintenanceService) {}

  evaluateAssignment(vehicle: Vehicle, driver: Driver, faults: Fault[]) {
    const reasons: string[] = [];

    if (vehicle.status !== "ACTIVE") {
      reasons.push("Vehicle is not active.");
    }

    if (this.maintenanceService.isMaintenanceRequired(vehicle)) {
      const overdueKilometers =
        this.maintenanceService.getMaintenanceOverdueKilometers(vehicle);

      if (overdueKilometers > 0) {
        reasons.push(`Maintenance overdue by ${overdueKilometers} KM.`);
      } else {
        reasons.push("Maintenance is due");
      }
    }

    if (hasCriticalUnresolvedFault(vehicle, faults)) {
      reasons.push("Critical unresolved fault.");
    }

    const healthScore = calculateVehicleHealthScore(
      vehicle,
      faults,
      this.maintenanceService,
    );

    if (healthScore < 60) {
      reasons.push("Health score below mission threshold.");
    }

    if (!driver.active) {
      reasons.push("Driver is not active.");
    }

    if (!canDriveVehicle(driver, vehicle)) {
      reasons.push("Driver license is not suitable for this vehicle.");
    }

    return {
      approved: reasons.length === 0,
      healthScore,
      reasons,
    };
  }
}
