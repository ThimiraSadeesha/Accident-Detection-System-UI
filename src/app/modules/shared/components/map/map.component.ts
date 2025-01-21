import {
    AfterViewInit,
    Component,
    effect,
    ElementRef,
    inject,
    ViewChild
} from '@angular/core';
import L from 'leaflet';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { ReactiveFormsModule } from "@angular/forms";
import { AccidentService } from "../../../accident/service/accident.service";

@Component({
    selector: 'app-map',
    imports: [
        FaIconComponent,
        ReactiveFormsModule
    ],
    templateUrl: './map.component.html',
    standalone: true,
    styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
    @ViewChild('map') private mapContainer!: ElementRef;
    @ViewChild('latInput') private latInput!: ElementRef;
    @ViewChild('lngInput') private lngInput!: ElementRef;

    private readonly DEFAULT_ZOOM = 13;
    private readonly DEFAULT_COORDS: [number, number] = [6.250374, 80.186204];

    accidentService = inject(AccidentService);
    private map!: L.Map;
    private currentMarker: L.Marker | null = null;
    private lat: number = this.DEFAULT_COORDS[0];
    private lng: number = this.DEFAULT_COORDS[1];

    constructor() {
        effect(() => {
            const accident = this.accidentService.active();
            if (accident?.location) {
                try {
                    const [latitude, longitude] = accident.location.split(',').map(coord => parseFloat(coord.trim()));

                    if (this.isValidCoordinates(latitude, longitude)) {
                        this.updateLocation(latitude, longitude);
                    }
                } catch (error) {
                    console.error('Error parsing accident location:', error);
                }
            }
        });
    }

    ngAfterViewInit(): void {
        this.initMap();
    }

    private initMap(): void {
        this.map = L.map(this.mapContainer.nativeElement, {
            center: [this.lat, this.lng],
            zoom: this.DEFAULT_ZOOM
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 3,
        }).addTo(this.map);

        this.map.on('click', (e: L.LeafletMouseEvent) => {
            this.handleMapClick(e.latlng);
        });

        this.addMarker([this.lat, this.lng]);
    }

    private handleMapClick(latlng: L.LatLng): void {
        if (this.isValidCoordinates(latlng.lat, latlng.lng)) {
            this.updateLocation(latlng.lat, latlng.lng);
            this.updateInputFields();
        }
    }

    private updateLocation(lat: number, lng: number): void {
        this.lat = lat;
        this.lng = lng;

        if (this.map) {
            this.map.setView([lat, lng], this.map.getZoom() || this.DEFAULT_ZOOM);
        }

        this.addMarker([lat, lng]);
    }

    private updateInputFields(): void {
        if (this.latInput && this.lngInput) {
            this.latInput.nativeElement.value = this.lat.toFixed(6);
            this.lngInput.nativeElement.value = this.lng.toFixed(6);
        }
    }

    private addMarker(coords: [number, number]): void {
        if (this.currentMarker) {
            this.map.removeLayer(this.currentMarker);
        }

        this.currentMarker = L.marker(coords)
            .addTo(this.map)
            .bindPopup(`
                <b>Aaccident Location</b><br>
                Latitude: ${coords[0].toFixed(6)}<br>
                Longitude: ${coords[1].toFixed(6)}
            `)
            .openPopup();
    }

    private isValidCoordinates(lat: number, lng: number): boolean {
        return !isNaN(lat) &&
            !isNaN(lng) &&
            lat >= -90 &&
            lat <= 90 &&
            lng >= -180 &&
            lng <= 180;
    }
    close(): void {
        this.accidentService.createModal.set(false)
        this.accidentService.initial()
    }

}