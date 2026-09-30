import { Driver } from "../models/Driver";
import { Fault } from "../models/Fault";
import { Vehicle } from "../models/Vehicle";
import type { VehicleStatus, VehicleType } from "../interfaces/IVehicle";

export function canDriveVehicle(driver: Driver, vehicle: Vehicle): boolean {
  switch (vehicle.vehicleType) {
    case "CAR":
    case "VAN":
      return driver.licenseType === "B";

    case "TRUCK":
      return driver.licenseType === "C";

    case "BUS":
      return driver.licenseType === "D";

    default:
      return false;
  }
}

export function hasCriticalUnresolvedFault(
  vehicle: Vehicle,
  faults: Fault[],
): boolean {
  return faults.some(
    (fault) =>
      fault.vehicleId === vehicle.id &&
      fault.severity === "CRITICAL" &&
      fault.resolved === false,
  );
}

const validVehicleStatuses: VehicleStatus[] = [
  "ACTIVE",
  "IN_SERVICE",
  "MAINTENANCE_REQUIRED",
  "OUT_OF_SERVICE",
];

const validVehicleTypes: VehicleType[] = ["CAR", "VAN", "TRUCK", "BUS"];

export function isValidVehicleData(data: unknown): boolean {
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return false;
  }

  const vehicleData = data as Record<string, unknown>;

  return (
    typeof vehicleData.id === "string" &&
    typeof vehicleData.plate === "string" &&
    typeof vehicleData.brand === "string" &&
    typeof vehicleData.model === "string" &&
    typeof vehicleData.year === "number" &&
    typeof vehicleData.kilometer === "number" &&
    typeof vehicleData.lastMaintenanceKm === "number" &&
    typeof vehicleData.status === "string" &&
    validVehicleStatuses.includes(vehicleData.status as VehicleStatus) &&
    typeof vehicleData.vehicleType === "string" &&
    validVehicleTypes.includes(vehicleData.vehicleType as VehicleType)
  );
}
