export class User {
  private _id: string;
  constructor(private _name: string) {}

  public get name(): string {
    return this._name;
  }

}