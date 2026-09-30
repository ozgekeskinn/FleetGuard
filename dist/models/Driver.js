"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
class Driver {
    constructor(id, name, licenseNumber, licenseType, active) {
        this.id = id;
        this.name = name;
        this.licenseNumber = licenseNumber;
        this.licenseType = licenseType;
        this.active = active;
    }
}
exports.Driver = Driver;
