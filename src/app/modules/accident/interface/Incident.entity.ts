export interface Device {
    id: number;
    type: string;
    userId: number;
    deviceId: string;
    vehicleId: number;
    deviceStatus: string;
    lastMaintenance: string;
}

export interface Vehicle {
    id: number;
    model: string;
    vehicleType: string;
    vehicleNumber: string;
    manufactureYear: string;
}

export interface User {
    id: number;
    nic: string;
    city: string;
    email: string;
    gender: string;
    district: string;
    fullName: string;
    province: string;
    userName: string;
    userStatus: string;
    contactNumber: string;
}

export interface Fire {
    id: number;
    city: string;
    district: string;
    fireCode: string;
    fireName: string;
    location: string;
    province: string;
    areaCovered: string;
    contactNumber: string;
}

export interface Hospital {
    id: number;
    city: string;
    district: string;
    location: string;
    province: string;
    areaCovered: string;
    hospitalCode: string;
    hospitalName: string;
    contactNumber: string;
}

export interface Police {
    id: number;
    city: string;
    district: string;
    location: string;
    province: string;
    policeCode: string;
    policeName: string;
    areaCovered: string;
    contactNumber: string;
}

export interface EmergencyPerson {
    id: number;
    nic: string;
    email: string;
    gender: string;
    address: string;
    relation: string;
    personName: string;
    contactNumber: string;
}

export interface IncidentGetDTO {
    id: number;
    severity: string;
    location: string;
    incidentTime: string;
    incidentStatus: string;
    device: Device;
    vehicle: Vehicle;
    user: User;
    fire: Fire;
    hospital: Hospital;
    police: Police;
    emergencyPerson: EmergencyPerson;
}
