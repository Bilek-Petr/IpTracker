import { fetchIpClient, fetchIpLocation } from './api.js';

const setLocationPoints = (data) => {
   const { lat, lng } = data.location;
   return { latitude: lat, longitude: lng };
};

const createIcon = () => {
   return L.icon({
      iconUrl: '../assets/images/icon-location.svg',
      iconSize: [46, 56],
      iconAnchor: [23, 56],
      popupAnchor: [0, -56],
   });
};

const initializeMap = (latitude, longitude, icon) => {
   const map = L.map('map').setView([latitude, longitude], 13);

   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution:
         '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
   }).addTo(map);

   const marker = L.marker([latitude, longitude], { icon }).addTo(map);

   return { map, marker };
};

const updateMapWithIpLocation = async (map, marker, ipFetcher) => {
   try {
      const data = await ipFetcher();
      const { latitude, longitude } = setLocationPoints(data);

      // Update marker position or create new marker if it doesn't exist
      if (marker) {
         map.removeLayer(marker);
      }

      // Create new marker
      const newMarker = L.marker([latitude, longitude], { icon: createIcon() }).addTo(
         map
      );

      // Center the map to the new coordinates
      map.setView([latitude, longitude]);

      return newMarker;
   } catch (error) {
      console.error('Error updating map with IP location: ', error.message);
      return marker;
   }
};

export const initAndLoadMap = async () => {
   try {
      const data = await fetchIpClient();
      const { latitude, longitude } = setLocationPoints(data);
      const icon = createIcon();
      const { map, marker } = initializeMap(latitude, longitude, icon);
      const updatedMarker = await updateMapWithIpLocation(map, marker, fetchIpClient);
      return { map, marker: updatedMarker };
   } catch (error) {
      console.error('Error fetching initial location: ', error);
      return null;
   }
};

export const updateMapWithNewIp = async (map, marker, ipAddress) => {
   const ipFetcher = () => fetchIpLocation(ipAddress);
   const updatedMarker = await updateMapWithIpLocation(map, marker, ipFetcher);
   return updatedMarker;
};
