export class MaintenanceRecord {
  constructor(
    public id: string,
    public vehicleId: string,
    public kilometer: number,
    public description: string,
    public cost: number,
  ) {}
}
