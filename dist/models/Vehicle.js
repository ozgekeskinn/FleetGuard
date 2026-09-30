"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
class Vehicle {
    constructor(id, plate, brand, model, year, _kilometer, lastMaintenanceKm, status, vehicleType) {
        this.id = id;
        this.plate = plate;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this._kilometer = _kilometer;
        this.lastMaintenanceKm = lastMaintenanceKm;
        this.status = status;
        this.vehicleType = vehicleType;
        if (this._kilometer < 0) {
            throw new Error("Başlangıç kilometresi negatif olamaz.");
        }
    }
    get kilometer() {
        return this._kilometer;
    }
    addKilometers(value) {
        if (value <= 0) {
            throw new Error("Eklenecek kilometre 0'dan büyük olmalıdır.");
        }
        this._kilometer += value;
    }
}
exports.Vehicle = Vehicle;
