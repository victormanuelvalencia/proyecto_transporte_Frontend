import { Insurance } from "./insurance.model";

export class Vehicle {
    id?: number;
    license_plate: string;
    type_vehicle: string;
    insurances: Insurance[]; // Un array porque va a tener N seguros 
}
