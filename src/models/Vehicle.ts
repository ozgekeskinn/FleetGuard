import { IVehicle, VehicleStatus, VehicleType } from "../interfaces/IVehicle";

export class Vehicle implements IVehicle {
  constructor(
    public id: string,
    public plate: string,
    public brand: string,
    public model: string,
    public year: number,
    private _kilometer: number,
    public lastMaintenanceKm: number,
    public status: VehicleStatus,
    public vehicleType: VehicleType,
  ) {
    if (this._kilometer < 0) {
      throw new Error("Başlangıç kilometresi negatif olamaz.");
    }
  }

  get kilometer(): number {
    return this._kilometer;
  }

  addKilometers(value: number): void {
    if (value <= 0) {
      throw new Error("Eklenecek kilometre 0'dan büyük olmalıdır.");
    }
    this._kilometer += value;
  }
}
