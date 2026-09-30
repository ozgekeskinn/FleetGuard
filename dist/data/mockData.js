"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maintenanceRecords = exports.faults = exports.drivers = exports.vehicles = exports.rawVehicleData = void 0;
const Driver_1 = require("../models/Driver");
const Fault_1 = require("../models/Fault");
const MaintenanceRecord_1 = require("../models/MaintenanceRecord");
const Vehicle_1 = require("../models/Vehicle");
// Type Assertion Test Data
exports.rawVehicleData = {
    id: "RAW001",
    plate: "06 ABC 123",
    brand: "Ford",
    model: "Transit",
    year: 2022,
    kilometer: 82430,
    lastMaintenanceKm: 71000,
    status: "ACTIVE",
    vehicleType: "VAN",
};
// Vehicles
exports.vehicles = [
    // V001 - Sağlıklı, bakım sorunu yok, fault yok
    new Vehicle_1.Vehicle("V001", "06 ABC 123", "Ford", "Transit", 2022, 82430, 78000, "ACTIVE", "VAN"),
    // V002 - Bakımı tam 1 KM geçmiş
    // 50.001 - 40.000 = 10.001 KM
    new Vehicle_1.Vehicle("V002", "34 DEF 456", "Renault", "Clio", 2021, 50001, 40000, "ACTIVE", "CAR"),
    // V003 - Çözülmemiş CRITICAL fault var
    new Vehicle_1.Vehicle("V003", "34 GHI 789", "Mercedes", "Actros", 2020, 192410, 186000, "ACTIVE", "TRUCK"),
    // V004 - 3 adet LOW fault var
    new Vehicle_1.Vehicle("V004", "16 JKL 101", "Toyota", "Corolla", 2023, 28500, 23000, "ACTIVE", "CAR"),
    // V005 - OUT_OF_SERVICE
    new Vehicle_1.Vehicle("V005", "35 MNO 202", "Ford", "Focus", 2019, 145000, 138000, "OUT_OF_SERVICE", "CAR"),
    // V006 - Bakımı geçmiş + HIGH fault
    // 110.000 - 94.000 = 16.000 → 6.000 KM overdue
    new Vehicle_1.Vehicle("V006", "06 PRS 303", "Volvo", "FH", 2020, 110000, 94000, "ACTIVE", "TRUCK"),
    // V007 - Araç tamamen sağlıklı
    // Final testte yanlış ehliyetli sürücü atanacak
    new Vehicle_1.Vehicle("V007", "34 TUV 404", "Honda", "Civic", 2024, 12000, 8000, "ACTIVE", "CAR"),
    // V008 - MEDIUM fault
    new Vehicle_1.Vehicle("V008", "41 XYZ 505", "Fiat", "Doblo", 2022, 64000, 59000, "ACTIVE", "VAN"),
    // V009 - Bakımı 6.000 KM geçmiş
    new Vehicle_1.Vehicle("V009", "07 AAA 606", "MAN", "TGX", 2019, 156000, 140000, "ACTIVE", "TRUCK"),
    // V010 - IN_SERVICE
    new Vehicle_1.Vehicle("V010", "34 BBB 707", "Mercedes", "Sprinter", 2021, 92000, 85000, "IN_SERVICE", "VAN"),
    // V011 - Birden fazla HIGH fault
    new Vehicle_1.Vehicle("V011", "16 CCC 808", "Scania", "R500", 2018, 210000, 204000, "ACTIVE", "TRUCK"),
    // V012 - Bakım sınırına tam ulaşmış
    // 70.000 - 60.000 = 10.000 KM
    new Vehicle_1.Vehicle("V012", "06 DDD 909", "Volkswagen", "Passat", 2020, 70000, 60000, "ACTIVE", "CAR"),
    // V013 - CRITICAL fault var ama resolved = true
    new Vehicle_1.Vehicle("V013", "34 EEE 111", "BMW", "320i", 2021, 48000, 43000, "ACTIVE", "CAR"),
    // V014 - Sağlıklı BUS
    new Vehicle_1.Vehicle("V014", "06 FFF 222", "Mercedes", "Tourismo", 2022, 88000, 82000, "ACTIVE", "BUS"),
    // V015 - Çok sayıda fault nedeniyle düşük health score
    new Vehicle_1.Vehicle("V015", "34 GGG 333", "Iveco", "Daily", 2019, 135000, 128000, "ACTIVE", "VAN"),
];
// Drivers
exports.drivers = [
    new Driver_1.Driver("D001", "Ahmet Yılmaz", "LIC-B-001", "B", true),
    new Driver_1.Driver("D002", "Mehmet Kaya", "LIC-C-002", "C", true),
    new Driver_1.Driver("D003", "Ayşe Demir", "LIC-D-003", "D", true),
    new Driver_1.Driver("D004", "Emre Şahin", "LIC-B-004", "B", true),
    new Driver_1.Driver("D005", "Zeynep Aydın", "LIC-C-005", "C", true),
    // Pasif sürücü
    new Driver_1.Driver("D006", "Burak Arslan", "LIC-B-006", "B", false),
    new Driver_1.Driver("D007", "Selin Koç", "LIC-D-007", "D", true),
    new Driver_1.Driver("D008", "Can Özkan", "LIC-C-008", "C", true),
    // Pasif sürücü
    new Driver_1.Driver("D009", "Elif Yıldız", "LIC-B-009", "B", false),
    new Driver_1.Driver("D010", "Mert Çelik", "LIC-B-010", "B", true),
];
// Faults
exports.faults = [
    // V003 - CRITICAL unresolved
    new Fault_1.Fault("F001", "V003", "Engine Warning", "Critical engine pressure warning detected.", "CRITICAL", false),
    new Fault_1.Fault("F002", "V003", "Brake Sensor", "Brake sensor requires inspection.", "MEDIUM", false),
    // V004 - 3 LOW faults
    new Fault_1.Fault("F003", "V004", "Washer Fluid", "Washer fluid level is low.", "LOW", false),
    new Fault_1.Fault("F004", "V004", "Cabin Light", "Cabin light intermittently fails.", "LOW", false),
    new Fault_1.Fault("F005", "V004", "Wiper Wear", "Wiper blades should be replaced.", "LOW", false),
    // V005
    new Fault_1.Fault("F006", "V005", "Transmission", "Transmission malfunction detected.", "HIGH", false),
    new Fault_1.Fault("F007", "V005", "Battery", "Battery voltage is unstable.", "MEDIUM", false),
    // V006 - HIGH fault
    new Fault_1.Fault("F008", "V006", "Brake Wear", "Brake system requires service.", "HIGH", false),
    new Fault_1.Fault("F009", "V006", "Oil Pressure", "Oil pressure below expected value.", "MEDIUM", false),
    // V008 - MEDIUM
    new Fault_1.Fault("F010", "V008", "Tire Pressure", "Rear tire pressure is below recommended level.", "MEDIUM", false),
    // V009
    new Fault_1.Fault("F011", "V009", "Coolant Level", "Coolant level requires inspection.", "LOW", false),
    new Fault_1.Fault("F012", "V009", "Air Filter", "Air filter replacement recommended.", "LOW", true),
    // V010
    new Fault_1.Fault("F013", "V010", "Suspension", "Front suspension inspection required.", "HIGH", false),
    new Fault_1.Fault("F014", "V010", "ABS Sensor", "ABS sensor warning detected.", "MEDIUM", false),
    // V011 - birden fazla HIGH
    new Fault_1.Fault("F015", "V011", "Turbo System", "Turbo pressure problem detected.", "HIGH", false),
    new Fault_1.Fault("F016", "V011", "Brake System", "Brake efficiency below expected level.", "HIGH", false),
    new Fault_1.Fault("F017", "V011", "Exhaust System", "Exhaust system requires inspection.", "MEDIUM", false),
    // V012
    new Fault_1.Fault("F018", "V012", "Headlight", "Left headlight requires replacement.", "LOW", false),
    // V013 - resolved CRITICAL
    new Fault_1.Fault("F019", "V013", "Engine Temperature", "Previous engine overheating issue.", "CRITICAL", true),
    new Fault_1.Fault("F020", "V013", "Mirror", "Right mirror adjustment issue.", "LOW", false),
    // V014
    new Fault_1.Fault("F021", "V014", "Seat Sensor", "Passenger seat sensor warning.", "LOW", false),
    // V015 - düşük health score oluşturacak kombinasyon
    new Fault_1.Fault("F022", "V015", "Engine Control", "Engine control unit reports a serious fault.", "CRITICAL", false),
    new Fault_1.Fault("F023", "V015", "Brake Pressure", "Brake pressure below safe threshold.", "HIGH", false),
    new Fault_1.Fault("F024", "V015", "Cooling System", "Cooling system efficiency reduced.", "HIGH", false),
    new Fault_1.Fault("F025", "V015", "Battery Health", "Battery capacity has degraded.", "MEDIUM", false),
    // Ek farklı senaryolar
    new Fault_1.Fault("F026", "V002", "Tire Wear", "Front tires show minor wear.", "LOW", false),
    new Fault_1.Fault("F027", "V003", "Lighting", "Rear light requires replacement.", "LOW", true),
    new Fault_1.Fault("F028", "V006", "Fuel Sensor", "Fuel level sensor reports inconsistent values.", "LOW", false),
    new Fault_1.Fault("F029", "V008", "Door Sensor", "Sliding door sensor requires inspection.", "LOW", true),
    new Fault_1.Fault("F030", "V011", "Battery", "Battery performance is below normal.", "LOW", false),
];
// Maintenance Records
exports.maintenanceRecords = [
    new MaintenanceRecord_1.MaintenanceRecord("M001", "V001", 78000, "Periodic maintenance", 4200),
    new MaintenanceRecord_1.MaintenanceRecord("M002", "V002", 40000, "Oil and filter replacement", 2800),
    new MaintenanceRecord_1.MaintenanceRecord("M003", "V003", 186000, "Heavy vehicle maintenance", 12500),
    new MaintenanceRecord_1.MaintenanceRecord("M004", "V004", 23000, "Periodic maintenance", 3200),
    new MaintenanceRecord_1.MaintenanceRecord("M005", "V005", 138000, "Transmission inspection", 9600),
    new MaintenanceRecord_1.MaintenanceRecord("M006", "V006", 94000, "Brake and oil service", 7800),
    new MaintenanceRecord_1.MaintenanceRecord("M007", "V007", 8000, "Periodic maintenance", 2500),
    new MaintenanceRecord_1.MaintenanceRecord("M008", "V008", 59000, "Filter replacement", 3100),
    new MaintenanceRecord_1.MaintenanceRecord("M009", "V009", 140000, "Truck periodic maintenance", 11200),
    new MaintenanceRecord_1.MaintenanceRecord("M010", "V010", 85000, "Suspension inspection", 6700),
    new MaintenanceRecord_1.MaintenanceRecord("M011", "V011", 204000, "Heavy vehicle periodic maintenance", 14800),
    new MaintenanceRecord_1.MaintenanceRecord("M012", "V012", 60000, "Oil replacement", 2900),
    new MaintenanceRecord_1.MaintenanceRecord("M013", "V013", 43000, "Engine inspection", 5200),
    new MaintenanceRecord_1.MaintenanceRecord("M014", "V014", 82000, "Bus periodic maintenance", 13400),
    new MaintenanceRecord_1.MaintenanceRecord("M015", "V015", 128000, "Commercial vehicle maintenance", 7500),
    // Ek geçmiş bakım kayıtları
    new MaintenanceRecord_1.MaintenanceRecord("M016", "V001", 68000, "Previous periodic maintenance", 3900),
    new MaintenanceRecord_1.MaintenanceRecord("M017", "V003", 176000, "Previous truck maintenance", 10800),
    new MaintenanceRecord_1.MaintenanceRecord("M018", "V006", 84000, "Previous brake maintenance", 6400),
    new MaintenanceRecord_1.MaintenanceRecord("M019", "V011", 194000, "Previous heavy vehicle maintenance", 12100),
    new MaintenanceRecord_1.MaintenanceRecord("M020", "V014", 72000, "Previous bus maintenance", 11600),
];
