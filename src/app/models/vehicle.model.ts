import { Insurance } from "./insurance.model";

export class Vehicle {
    id?: number;
    license_plate: string;
    type_vehicle: string;
    insurance?: Insurance;
}
