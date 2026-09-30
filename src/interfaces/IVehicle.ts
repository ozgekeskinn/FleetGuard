export type VehicleStatus =
  | "ACTIVE"
  | "IN_SERVICE"
  | "MAINTENANCE_REQUIRED"
  | "OUT_OF_SERVICE";

export type VehicleType = "CAR" | "VAN" | "TRUCK" | "BUS";

export interface IVehicle {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  readonly kilometer: number;
  status: VehicleStatus;
  vehicleType: VehicleType;
}
