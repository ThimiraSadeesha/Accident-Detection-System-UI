export interface HospitalDTO {
    id: number;
    code: string;
    name: string;
    mobileNumber: string;
    area: string;
    city: string;
    district: string;
    province: string;
}


export interface Hospital {
    hospitalId: number;
    hospitalCode: string;
    hospitalName: string;
    contactNumber: string;
    city: string;
    district: string;
    province: string;
    coverdArea: string;
}
