export type LicenceType = "B" | "C" | "D";

export interface IDriver {
  id: string;
  name: string;
  licenseNumber: string;
  licenseType: LicenceType;
  active: boolean;
}
