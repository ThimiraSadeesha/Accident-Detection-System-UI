export const SRI_LANKA_REGIONS = [
    {
        province: 'Western Province',
        districts: ['Colombo', 'Gampaha', 'Kalutara']
    },
    {
        province: 'Central Province',
        districts: ['Kandy', 'Matale', 'Nuwara Eliya']
    },
    {
        province: 'Southern Province',
        districts: ['Galle', 'Matara', 'Hambantota']
    },
    {
        province: 'Eastern Province',
        districts: ['Batticaloa', 'Ampara', 'Trincomalee']
    },
    {
        province: 'Northern Province',
        districts: ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya']
    },
    {
        province: 'North Western Province',
        districts: ['Kurunegala', 'Puttalam']
    },
    {
        province: 'North Central Province',
        districts: ['Anuradhapura', 'Polonnaruwa']
    },
    {
        province: 'Uva Province',
        districts: ['Badulla', 'Moneragala']
    },
    {
        province: 'Sabaragamuwa Province',
        districts: ['Ratnapura', 'Kegalle']
    }
];


export interface IncidentReportDto {
    fullName: string;
    nic: string;
    contactNumber: string;
    gender: string;
    city: string;
    district: string;
    province: string;
    vehicleNumber: string;
    manufactureYear: string;
    vehicleType: string;
    model: string;
    deviceId: string;
    deviceType: string;
    deviceStatus: string;
    severity: string;
    location: string;
    time: string;
    incidentStatus: string;
}