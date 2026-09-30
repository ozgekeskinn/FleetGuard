"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceService = void 0;
class MaintenanceService {
    constructor() {
        this.maintenanceInterval = 10000;
    }
    getKilometersSinceLastMaintenance(vehicle) {
        return vehicle.kilometer - vehicle.lastMaintenanceKm;
    }
    isMaintenanceRequired(vehicle) {
        return (this.getKilometersSinceLastMaintenance(vehicle) >=
            this.maintenanceInterval);
    }
    applyMaintenanceRecord(vehicle, maintenanceRecord) {
        if (maintenanceRecord.vehicleId !== vehicle.id) {
            throw new Error("Bakım kaydı bu araca ait değil.");
        }
        if (maintenanceRecord.kilometer > vehicle.kilometer) {
            throw new Error("Bakım kilometresi aracın mevcut kilometresinden büyük olamaz.");
        }
        if (maintenanceRecord.kilometer < vehicle.lastMaintenanceKm) {
            throw new Error("Bakım kilometresi bir önceki bakım kilometresinden küçük olamaz.");
        }
        vehicle.lastMaintenanceKm = maintenanceRecord.kilometer;
    }
    getMaintenanceOverdueKilometers(vehicle) {
        const overdueKilometers = this.getKilometersSinceLastMaintenance(vehicle) -
            this.maintenanceInterval;
        return Math.max(0, overdueKilometers);
    }
}
exports.MaintenanceService = MaintenanceService;
