import { isValidVehicleData } from "./utils/validators";
import { Vehicle } from "./models/Vehicle";
import type { VehicleStatus, VehicleType } from "./interfaces/IVehicle";

import {
  rawVehicleData,
  vehicles,
  drivers,
  faults,
  maintenanceRecords,
} from "./data/mockData";
import { MaintenanceService } from "./services/MaintenanceService";
import { FleetService } from "./services/FleetService";
import { AssignmentService } from "./services/AssignmentService";
import { ReportService } from "./services/ReportService";
import { getVehicleRiskLevel } from "./utils/calculations";

if (isValidVehicleData(rawVehicleData)) {
  // type assertion
  const vehicleData = rawVehicleData as {
    id: string;
    plate: string;
    brand: string;
    model: string;
    year: number;
    kilometer: number;
    lastMaintenanceKm: number;
    status: VehicleStatus;
    vehicleType: VehicleType;
  };

  const vehicle = new Vehicle(
    vehicleData.id,
    vehicleData.plate,
    vehicleData.brand,
    vehicleData.model,
    vehicleData.year,
    vehicleData.kilometer,
    vehicleData.lastMaintenanceKm,
    vehicleData.status,
    vehicleData.vehicleType,
  );

  // console.log(vehicle);
} else {
  // console.log("Geçersiz araç verisi.");
}

const maintenanceService = new MaintenanceService();
const fleetService = new FleetService(maintenanceService);
const assignmentService = new AssignmentService(maintenanceService);
const reportService = new ReportService(fleetService);

vehicles.forEach((vehicle) => fleetService.addVehicle(vehicle));

// GENEL FİLO RAPORU
console.log(reportService.generateFleetReport(faults, maintenanceRecords));

console.log("\n");

// FİNAL SİSTEM RAPORU
console.log(
  "======================================\nFLEETGUARD MANAGEMENT SYSTEM\n=======================================\n\n",
);

console.log(
  `Vehicles: ${fleetService.getVehicles().length}\n` +
    `Drivers: ${drivers.length}`,
);

console.log(
  "---------------------------------------\nVEHICLE ANALYSIS\n---------------------------------------",
);

const vehicleDriverMap: Record<string, string> = {
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

  const driver = drivers.find((driver) => driver.id === driverId);

  if (!driver) {
    console.log(`Driver not found for vehicle ${vehicle.id}.`);
    return;
  }

  const evaluation = assignmentService.evaluateAssignment(
    vehicle,
    driver,
    faults,
  );

  const healthScore = evaluation.healthScore;
  const riskLevel = getVehicleRiskLevel(healthScore);

  const overdueKilometers =
    maintenanceService.getMaintenanceOverdueKilometers(vehicle);

  let maintenanceStatus: "OK" | "DUE" | "OVERDUE";

  if (!maintenanceService.isMaintenanceRequired(vehicle)) {
    maintenanceStatus = "OK";
  } else if (overdueKilometers === 0) {
    maintenanceStatus = "DUE";
  } else {
    maintenanceStatus = "OVERDUE";
  }

  const openFaultCount = faults.filter(
    (fault) => fault.vehicleId === vehicle.id && fault.resolved === false,
  ).length;

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
