import { Vehicle } from "../models/Vehicle";
import { MaintenanceService } from "./MaintenanceService";

export class FleetService {
  constructor(
    private maintenanceService: MaintenanceService,
    private vehicles: Vehicle[] = [],
  ) {}

  addVehicle(vehicle: Vehicle): void {
    const vehicleExists = this.vehicles.some(
      (existingVehicle) => existingVehicle.id === vehicle.id,
    );

    if (vehicleExists) {
      throw new Error("Bu ID'ye sahip araç zaten filoda mevcut.");
    }

    this.vehicles.push(vehicle);
  }

  getVehicles(): Vehicle[] {
    return [...this.vehicles];
  }

  getActiveVehicles(): Vehicle[] {
    return this.vehicles.filter((vehicle) => vehicle.status === "ACTIVE");
  }

  getMaintenanceRequiredVehicles(): Vehicle[] {
    return this.vehicles.filter((vehicle) =>
      this.maintenanceService.isMaintenanceRequired(vehicle),
    );
  }

  getInServiceVehicles(): Vehicle[] {
    return this.vehicles.filter((vehicle) => vehicle.status === "IN_SERVICE");
  }

  getOutOfServiceVehicles(): Vehicle[] {
    return this.vehicles.filter(
      (vehicle) => vehicle.status === "OUT_OF_SERVICE",
    );
  }

  findVehicleById(id: string): Vehicle | undefined {
    return this.vehicles.find((vehicle) => vehicle.id === id);
  }

  findVehicleByPlate(plate: string): Vehicle | undefined {
    const normalizedPlate = plate.replace(/\s/g, "").toUpperCase();

    return this.vehicles.find(
      (vehicle) =>
        vehicle.plate.replace(/\s/g, "").toUpperCase() === normalizedPlate,
    );
  }

  findVehiclesByBrand(brand: string): Vehicle[] {
    const normalizedBrand = brand.trim().toUpperCase();

    return this.vehicles.filter(
      (vehicle) => vehicle.brand.trim().toUpperCase() === normalizedBrand,
    );
  }
}
