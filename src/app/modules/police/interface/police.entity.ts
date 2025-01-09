export interface PoliceStationDTO {
    policeId: number;
    PoliceCode: string;
    PoliceName: string;
    contactNumber: string;
    city: string;
    district: string;
    province: string;
    areaCovered: string;
}

export interface PoliceStation{
    policeId: number;
    PoliceCode: string;
    PoliceName: string;
    contactNumber: string;
    city: string;
    district: string;
    province: string;
    areaCovered: string;
}

export interface PoliceFind{
    id: number;
    code: string;
    name: string;
    mobileNumber: string;
    area: string;
    city: string;
    district: string;
    province: string;
}

