import { User } from ".";
import { MachineModel } from "./MachineModel";

export class Machine {
  private _id: string;
  constructor(
    public name: string,
    public imageUrl: string,
    public description: string,
    public model: MachineModel,
    public responsable: User,
    public status: 'available' | 'deactivated' | 'maintenance',
  ) {}
}
