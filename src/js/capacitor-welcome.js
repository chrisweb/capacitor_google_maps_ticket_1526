import { GoogleMap } from '@capacitor/google-maps'
import config from '../../app.config'

let newMap;

const markerClickListenerCallback = (markerClickCallbackData) => {
    console.log('markerClickListenerCallback > markerClickCallbackData.markerId: ', markerClickCallbackData.markerId)
    console.log('typeof markerClickCallbackData.markerId: ', typeof markerClickCallbackData.markerId)
}

const initializeGoogleMap = async (shadowRoot) => {

    const apiKey = config.GOOGLE_MAPS_API_KEY;
    const mapElement = shadowRoot.querySelector('capacitor-google-map')

    try {
        // 1) create the map
        newMap = await GoogleMap.create({
            id: 'my-map', // Unique identifier for this map instance
            element: mapElement, // reference to the capacitor-google-map element
            apiKey: apiKey, // Your Google Maps API Key
            config: {
                center: {
                    // The initial position to be rendered by the map
                    lat: 33.6,
                    lng: -117.9,
                },
                zoom: 8, // The initial zoom level to be rendered by the map
            },
        });

        // 2) add an "on marker click" listener to the map
        newMap.setOnMarkerClickListener(markerClickListenerCallback)
    } catch (error) {
        console.log('initializeGoogleMap > GoogleMap.create > error: ', error)
    }

}

const addMarkerClickHandler = async (/*event*/) => {

    // 3) add a marker to the map
    const markerData = {
        coordinate: {
            lat: 33.6,
            lng: -117.9,
        },
        iconUrl: './marker_icon_92_132.png',
        iconSize: {
            width: 30,
            height: 42,
        },
        iconOrigin: { x: 0, y: 0 },
        iconAnchor: { x: 15, y: 42 },
        draggable: true,
    }

    let newMarkerId;

    try {
        newMarkerId = await newMap.addMarker(markerData)
        console.log('newMap > addMarker > newMarker: ', newMarkerId)
        console.log('typeof newMarkerId: ', typeof newMarkerId)
    } catch (error) {
        console.log('newMap > newMap.addMarker > error: ', error)
    }
    
}

window.customElements.define(
    'capacitor-welcome',
    class extends HTMLElement {
        constructor() {
            super();

            const root = this.attachShadow({ mode: 'open' });

            root.innerHTML = `
                <style>
                :host {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                    display: block;
                    width: 100%;
                    height: 100%;
                }
                main {
                    background-color: transparent;
                }
                </style>
                <div>
                <capacitor-welcome-titlebar>
                    <h1>code reproduction repository for capacitor google maps plugin ticket #1526</h1>
                </capacitor-welcome-titlebar>
                <main>
                    <capacitor-google-map-container></capacitor-google-map-container>
                    <add-marker-button-container></add-marker-button-container>
                </main>
                </div>
            `;
        }
    }
);

window.customElements.define(
    'capacitor-welcome-titlebar',
    class extends HTMLElement {
        constructor() {
            super();
            const root = this.attachShadow({ mode: 'open' });
            root.innerHTML = `
                <style>
                    :host {
                        position: relative;
                        display: block;
                        padding: calc(env(safe-area-inset-top) + 15px) 15px 15px 15px;
                        text-align: center;
                        background-color: #73B5F6;
                    }
                    ::slotted(h1) {
                        margin: 0;
                        font-size: 0.9em;
                        font-weight: 600;
                        color: #fff;
                    }
                </style>
                <slot></slot>
            `;
        }
    }
);

window.customElements.define(
    'capacitor-google-map-container',
    class extends HTMLElement {
        constructor() {
            super();
            const root = this.attachShadow({ mode: 'open' });
            root.innerHTML = `
                <style>
                    .map {
                        display: block;
                        width: 100%;
                        height: 50vh;
                        margin-bottom: 28px;
                    }
                </style>
                <capacitor-google-map class="map" id="my-map"></capacitor-google-map>
            `;
        }
        
        connectedCallback() {
            // wait for next tick, usually does the trick
            setTimeout(() => {
                initializeGoogleMap(this.shadowRoot);
            }, 100);
        }
    }
);

window.customElements.define(
    'add-marker-button-container',
    class extends HTMLElement {
        constructor() {
            super();
            const root = this.attachShadow({ mode: 'open' });
            root.innerHTML = `
                <style>
                    :host {
                        width: 100%;
                    }
                    .button {
                        display: block;
                        padding: 10px;
                        background-color: #73B5F6;
                        color: #fff;
                        font-size: 0.9em;
                        font-weight: 600;
                        border: 0;
                        border-radius: 3px;
                        text-decoration: none;
                        text-align: center;
                        cursor: pointer;
                        margin: 0 auto;
                        width: 200px;
                        margin-bottom: 28px;
                        text-transform: uppercase;
                      }
                </style>
                <div class="button" id="add-marker">Add a marker</div>
            `;
        }
        
        connectedCallback() {
            this.shadowRoot.querySelector('#add-marker').addEventListener('click', addMarkerClickHandler);
        }
    }
);
