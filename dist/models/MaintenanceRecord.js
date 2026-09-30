"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceRecord = void 0;
class MaintenanceRecord {
    constructor(id, vehicleId, kilometer, description, cost) {
        this.id = id;
        this.vehicleId = vehicleId;
        this.kilometer = kilometer;
        this.description = description;
        this.cost = cost;
    }
}
exports.MaintenanceRecord = MaintenanceRecord;
