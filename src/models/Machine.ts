import { User } from ".";

export class Machine {
  private _id: string;
  constructor(
    private _imageUrl: string,
    private _name: string,
    private _description: string,
    private _model: string,
    private _responsable: User,
    private _status: 'available' | 'deactivated' | 'maintenance',
  ) {}
}
