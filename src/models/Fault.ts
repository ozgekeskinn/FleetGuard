import { IFault, FaultSeverity } from "../interfaces/IFault";

export class Fault implements IFault {
  constructor(
    public id: string,
    public vehicleId: string,
    public title: string,
    public description: string,
    public severity: FaultSeverity,
    public resolved: boolean,
  ) {}
}
