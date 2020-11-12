import { Company, Machine } from ".";

export class CompanyUnity {
  constructor(
    public name: string,
    public address: string,
    public company: Company,
    public machines?: Machine[],
    public id?: string
  ) {}
}
