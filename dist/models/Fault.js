"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fault = void 0;
class Fault {
    constructor(id, vehicleId, title, description, severity, resolved) {
        this.id = id;
        this.vehicleId = vehicleId;
        this.title = title;
        this.description = description;
        this.severity = severity;
        this.resolved = resolved;
    }
}
exports.Fault = Fault;
