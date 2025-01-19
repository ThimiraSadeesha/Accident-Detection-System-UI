import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import L from 'leaflet';

@Component({
    selector: 'app-map',
    imports: [],
    templateUrl: './map.component.html',
    standalone: true,
    styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
    @ViewChild('map') private mapContainer!: ElementRef;
    @ViewChild('latInput') private latInput!: ElementRef;
    @ViewChild('lngInput') private lngInput!: ElementRef;

    private map!: L.Map;
    private currentMarker: L.Marker | null = null;
    private lat: number = 6.250374;
    private lng: number = 80.186204;

    ngAfterViewInit(): void {
        this.initMap();
    }

    private initMap(): void {
        this.map = L.map(this.mapContainer.nativeElement, {
            center: [this.lat, this.lng],
            zoom: 13
        });

        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 3,
            attribution: 'Accident Detection</a>'
        });

        tiles.addTo(this.map);
        this.map.on('click', (e: L.LeafletMouseEvent) => {
            this.handleMapClick(e.latlng);
        });
        this.addMarker([this.lat, this.lng]);
    }

    private handleMapClick(latlng: L.LatLng): void {
        this.lat = latlng.lat;
        this.lng = latlng.lng;

        // Update input fields
        if (this.latInput && this.lngInput) {
            this.latInput.nativeElement.value = this.lat.toFixed(6);
            this.lngInput.nativeElement.value = this.lng.toFixed(6);
        }

        this.addMarker([this.lat, this.lng]);
    }

    private addMarker(coords: [number, number]): void {
        // Remove existing marker if any
        if (this.currentMarker) {
            this.map.removeLayer(this.currentMarker);
        }

        // Add new marker
        this.currentMarker = L.marker(coords).addTo(this.map);
        this.currentMarker.bindPopup(`
      <b>Selected Location</b><br>
      Latitude: ${coords[0].toFixed(6)}<br>
      Longitude: ${coords[1].toFixed(6)}
    `).openPopup();
    }

    updateLat(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.lat = parseFloat(value);
    }

    updateLng(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.lng = parseFloat(value);
    }

    findLocation(): void {
        if (isNaN(this.lat) || isNaN(this.lng)) {
            alert('Please enter valid coordinates');
            return;
        }

        // Check if coordinates are within valid range
        if (this.lat < -90 || this.lat > 90 || this.lng < -180 || this.lng > 180) {
            alert('Please enter valid coordinates:\nLatitude: -90 to 90\nLongitude: -180 to 180');
            return;
        }

        // Update map view and marker
        this.map.setView([this.lat, this.lng], 13);
        this.addMarker([this.lat, this.lng]);
    }
}