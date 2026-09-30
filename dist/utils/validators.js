"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canDriveVehicle = canDriveVehicle;
exports.hasCriticalUnresolvedFault = hasCriticalUnresolvedFault;
exports.isValidVehicleData = isValidVehicleData;
function canDriveVehicle(driver, vehicle) {
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
function hasCriticalUnresolvedFault(vehicle, faults) {
    return faults.some((fault) => fault.vehicleId === vehicle.id &&
        fault.severity === "CRITICAL" &&
        fault.resolved === false);
}
const validVehicleStatuses = [
    "ACTIVE",
    "IN_SERVICE",
    "MAINTENANCE_REQUIRED",
    "OUT_OF_SERVICE",
];
const validVehicleTypes = ["CAR", "VAN", "TRUCK", "BUS"];
function isValidVehicleData(data) {
    if (typeof data !== "object" || data === null || Array.isArray(data)) {
        return false;
    }
    const vehicleData = data;
    return (typeof vehicleData.id === "string" &&
        typeof vehicleData.plate === "string" &&
        typeof vehicleData.brand === "string" &&
        typeof vehicleData.model === "string" &&
        typeof vehicleData.year === "number" &&
        typeof vehicleData.kilometer === "number" &&
        typeof vehicleData.lastMaintenanceKm === "number" &&
        typeof vehicleData.status === "string" &&
        validVehicleStatuses.includes(vehicleData.status) &&
        typeof vehicleData.vehicleType === "string" &&
        validVehicleTypes.includes(vehicleData.vehicleType));
}
