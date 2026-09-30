"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("./utils/validators");
const Vehicle_1 = require("./models/Vehicle");
const mockData_1 = require("./data/mockData");
const MaintenanceService_1 = require("./services/MaintenanceService");
const FleetService_1 = require("./services/FleetService");
const AssignmentService_1 = require("./services/AssignmentService");
const ReportService_1 = require("./services/ReportService");
const calculations_1 = require("./utils/calculations");
if ((0, validators_1.isValidVehicleData)(mockData_1.rawVehicleData)) {
    // type assertion
    const vehicleData = mockData_1.rawVehicleData;
    const vehicle = new Vehicle_1.Vehicle(vehicleData.id, vehicleData.plate, vehicleData.brand, vehicleData.model, vehicleData.year, vehicleData.kilometer, vehicleData.lastMaintenanceKm, vehicleData.status, vehicleData.vehicleType);
    // console.log(vehicle);
}
else {
    // console.log("Geçersiz araç verisi.");
}
const maintenanceService = new MaintenanceService_1.MaintenanceService();
const fleetService = new FleetService_1.FleetService(maintenanceService);
const assignmentService = new AssignmentService_1.AssignmentService(maintenanceService);
const reportService = new ReportService_1.ReportService(fleetService);
mockData_1.vehicles.forEach((vehicle) => fleetService.addVehicle(vehicle));
// GENEL FİLO RAPORU
console.log(reportService.generateFleetReport(mockData_1.faults, mockData_1.maintenanceRecords));
console.log("\n");
// FİNAL SİSTEM RAPORU
console.log("======================================\nFLEETGUARD MANAGEMENT SYSTEM\n=======================================\n\n");
console.log(`Vehicles: ${fleetService.getVehicles().length}\n` +
    `Drivers: ${mockData_1.drivers.length}`);
console.log("---------------------------------------\nVEHICLE ANALYSIS\n---------------------------------------");
const vehicleDriverMap = {
    V001: "D001", // VAN   → B → uygun
    V002: "D004", // CAR   → B → uygun
    V003: "D002", // TRUCK → C → uygun
    V004: "D010", // CAR   → B → uygun
    V005: "D001", // CAR   → B → uygun (araç zaten OUT_OF_SERVICE)
    V006: "D005", // TRUCK → C → uygun
    // Edge case: CAR için B gerekir ama D005'in ehliyeti C
    V007: "D005",
    // Edge case: Ehliyet uygun (B) ama D006 inactive
    V008: "D006",
    V009: "D008", // TRUCK → C → uygun
    V010: "D004", // VAN   → B → uygun
    V011: "D002", // TRUCK → C → uygun
    V012: "D010", // CAR   → B → uygun
    V013: "D001", // CAR   → B → uygun
    V014: "D003", // BUS   → D → uygun
    V015: "D004", // VAN   → B → uygun
};
fleetService.getVehicles().forEach((vehicle) => {
    const driverId = vehicleDriverMap[vehicle.id];
    const driver = mockData_1.drivers.find((driver) => driver.id === driverId);
    if (!driver) {
        console.log(`Driver not found for vehicle ${vehicle.id}.`);
        return;
    }
    const evaluation = assignmentService.evaluateAssignment(vehicle, driver, mockData_1.faults);
    const healthScore = evaluation.healthScore;
    const riskLevel = (0, calculations_1.getVehicleRiskLevel)(healthScore);
    const overdueKilometers = maintenanceService.getMaintenanceOverdueKilometers(vehicle);
    let maintenanceStatus;
    if (!maintenanceService.isMaintenanceRequired(vehicle)) {
        maintenanceStatus = "OK";
    }
    else if (overdueKilometers === 0) {
        maintenanceStatus = "DUE";
    }
    else {
        maintenanceStatus = "OVERDUE";
    }
    const openFaultCount = mockData_1.faults.filter((fault) => fault.vehicleId === vehicle.id && fault.resolved === false).length;
    const missionReady = evaluation.approved ? "YES" : "NO";
    console.log(`
${vehicle.plate}
${vehicle.brand} ${vehicle.model}
${vehicle.kilometer.toLocaleString("en-US")} KM

Health: ${healthScore}/100
Risk: ${riskLevel}
Maintenance: ${maintenanceStatus}
Open Faults: ${openFaultCount}

MISSION READY: ${missionReady}
    `);
    if (!evaluation.approved) {
        console.log("Reasons:");
        evaluation.reasons.forEach((reason) => {
            console.log(`- ${reason}`);
        });
    }
    console.log("---------------------------------------");
});
console.log("=======================================");
