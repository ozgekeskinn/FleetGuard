"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FleetService = void 0;
class FleetService {
    constructor(maintenanceService, vehicles = []) {
        this.maintenanceService = maintenanceService;
        this.vehicles = vehicles;
    }
    addVehicle(vehicle) {
        const vehicleExists = this.vehicles.some((existingVehicle) => existingVehicle.id === vehicle.id);
        if (vehicleExists) {
            throw new Error("Bu ID'ye sahip araç zaten filoda mevcut.");
        }
        this.vehicles.push(vehicle);
    }
    getVehicles() {
        return [...this.vehicles];
    }
    getActiveVehicles() {
        return this.vehicles.filter((vehicle) => vehicle.status === "ACTIVE");
    }
    getMaintenanceRequiredVehicles() {
        return this.vehicles.filter((vehicle) => this.maintenanceService.isMaintenanceRequired(vehicle));
    }
    getInServiceVehicles() {
        return this.vehicles.filter((vehicle) => vehicle.status === "IN_SERVICE");
    }
    getOutOfServiceVehicles() {
        return this.vehicles.filter((vehicle) => vehicle.status === "OUT_OF_SERVICE");
    }
    findVehicleById(id) {
        return this.vehicles.find((vehicle) => vehicle.id === id);
    }
    findVehicleByPlate(plate) {
        const normalizedPlate = plate.replace(/\s/g, "").toUpperCase();
        return this.vehicles.find((vehicle) => vehicle.plate.replace(/\s/g, "").toUpperCase() === normalizedPlate);
    }
    findVehiclesByBrand(brand) {
        const normalizedBrand = brand.trim().toUpperCase();
        return this.vehicles.filter((vehicle) => vehicle.brand.trim().toUpperCase() === normalizedBrand);
    }
}
exports.FleetService = FleetService;
