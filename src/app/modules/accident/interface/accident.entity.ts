export interface IncidentViewDTO {
    id: number;
    nic: string;
    city: string;
    time: string;
    model: string;
    gender: string;
    deviceId: string;
    district: string;
    fullName: string;
    location: string;
    province: string;
    severity: string;
    deviceType: string;
    vehicleType: string;
    deviceStatus: string;
    contactNumber: string;
    vehicleNumber: string;
    incidentStatus: string;
    manufactureYear: number;
}


export interface IncidentGetBYDTO {
    id: number;
    severity: string;
    location: string;
    incidentTime: string; // ISO date string
    incidentStatus: string;
    device: DeviceDto;
    vehicle: VehicleDto;
    user: UserDto;
}

export interface DeviceDto {
    id: number;
    type: string;
    userId: number;
    deviceId: string;
    vehicleId: number;
    deviceStatus: string;
    lastMaintenance: string;
}

export interface VehicleDto {
    id: number;
    model: string;
    vehicleType: string;
    vehicleNumber: string;
    manufactureYear: string;
}

export interface UserDto {
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
