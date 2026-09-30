"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentService = void 0;
const calculations_1 = require("../utils/calculations");
const validators_1 = require("../utils/validators");
class AssignmentService {
    constructor(maintenanceService) {
        this.maintenanceService = maintenanceService;
    }
    evaluateAssignment(vehicle, driver, faults) {
        const reasons = [];
        if (vehicle.status !== "ACTIVE") {
            reasons.push("Vehicle is not active.");
        }
        if (this.maintenanceService.isMaintenanceRequired(vehicle)) {
            const overdueKilometers = this.maintenanceService.getMaintenanceOverdueKilometers(vehicle);
            if (overdueKilometers > 0) {
                reasons.push(`Maintenance overdue by ${overdueKilometers} KM.`);
            }
            else {
                reasons.push("Maintenance is due");
            }
        }
        if ((0, validators_1.hasCriticalUnresolvedFault)(vehicle, faults)) {
            reasons.push("Critical unresolved fault.");
        }
        const healthScore = (0, calculations_1.calculateVehicleHealthScore)(vehicle, faults, this.maintenanceService);
        if (healthScore < 60) {
            reasons.push("Health score below mission threshold.");
        }
        if (!driver.active) {
            reasons.push("Driver is not active.");
        }
        if (!(0, validators_1.canDriveVehicle)(driver, vehicle)) {
            reasons.push("Driver license is not suitable for this vehicle.");
        }
        return {
            approved: reasons.length === 0,
            healthScore,
            reasons,
        };
    }
}
exports.AssignmentService = AssignmentService;
