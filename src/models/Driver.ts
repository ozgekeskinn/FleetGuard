import { IDriver, LicenceType } from "../interfaces/IDriver";

export class Driver implements IDriver {
  constructor(
    public id: string,
    public name: string,
    public licenseNumber: string,
    public licenseType: LicenceType,
    public active: boolean,
  ) {}
}
