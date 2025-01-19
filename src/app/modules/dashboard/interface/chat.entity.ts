export interface IncidentChartDTO {
    totalIncidents: string;
    openIncidents: string;
    closedIncidents: string;
    activeIncidents: string;
    highIncidents: string;
    lowIncidents: string;
    mediumIncidents: string;
    data: MonthIncidentDTO[];
}

export interface MonthIncidentDTO {
    month: string;
    incidentHistoryCount: number;
}