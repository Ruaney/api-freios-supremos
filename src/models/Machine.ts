import { User } from ".";
import { MachineModel } from "./MachineModel";

export class Machine {
  constructor(
    public name: string,
    public image: string,
    public description: string,
    public model: MachineModel,
    public responsable: User,
    public status: 'available' | 'deactivated' | 'maintenance',
    public id?: string
  ) {}
}
