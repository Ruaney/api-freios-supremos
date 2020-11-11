import { User } from ".";

export class Machine {
  private _id: string;
  constructor(
    public name: string,
    public imageUrl: string,
    public description: string,
    public model: string,
    public responsable: User,
    public status: 'available' | 'deactivated' | 'maintenance',
  ) {}
}
