import { Fault } from "../models/Fault";
import { MaintenanceRecord } from "../models/MaintenanceRecord";
import { FleetService } from "./FleetService";

export class ReportService {
  constructor(private fleetService: FleetService) {}

  generateFleetReport(
    faults: Fault[],
    maintenanceRecords: MaintenanceRecord[],
  ): string {
    const totalVehicles = this.fleetService.getVehicles().length;
    const activeVehicles = this.fleetService.getActiveVehicles().length;

    const maintenanceRequiredVehicles =
      this.fleetService.getMaintenanceRequiredVehicles().length;

    const inServiceVehicles = this.fleetService.getInServiceVehicles().length;

    const outOfServiceVehicles =
      this.fleetService.getOutOfServiceVehicles().length;

    const totalFaults = faults.length;

    const criticalFaults = faults.filter(
      (fault) => fault.severity === "CRITICAL",
    ).length;

    const totalMaintenanceCost = maintenanceRecords.reduce(
      (total, record) => total + record.cost,
      0,
    );

    return (
      `============ FLEET REPORT ============\n\n` +
      `Total Vehicles: ${totalVehicles}\n\n` +
      `Active: ${activeVehicles}\n` +
      `Maintenance Required: ${maintenanceRequiredVehicles}\n` +
      `In Service: ${inServiceVehicles}\n` +
      `Out Of Service: ${outOfServiceVehicles}\n\n` +
      `Total Faults: ${totalFaults}\n` +
      `Critical Faults: ${criticalFaults}\n\n` +
      `Maintenance Cost: ${totalMaintenanceCost.toLocaleString("tr-TR")} TL`
    );
  }
}
