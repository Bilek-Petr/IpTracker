import { fetchIpClient } from './modules/api.js';
import { handleFormSubmit, setMapAndMarker } from './modules/form.js';
import { updateLocationData } from './modules/domUpdater.js';
import { initAndLoadMap, updateMapWithNewIp } from './modules/map.js';

let map, marker;

document.addEventListener('DOMContentLoaded', async () => {
   // Initialize the map with client's IP location
   const initResult = await initAndLoadMap();

   if (initResult) {
      map = initResult.map;
      marker = initResult.marker;

      // Set the map and marker in form.js
      setMapAndMarker(map, marker);
      const form = document.querySelector('form');
      form.addEventListener('submit', handleFormSubmit);

      try {
         const locationData = await fetchIpClient();
         updateLocationData(locationData);
      } catch (err) {
         console.error('Error fetching data: ' + err);
      }
   } else {
      console.error('Failed to initialize and load map');
   }
});

//    // Handle form submission
//    const form = document.querySelector('form');
//    form.addEventListener('submit', async (e) => {
//       e.preventDefault();
//       const ipAddress = form.querySelector('[data-ip]').value;

//       try {
//          // Update the map with the new IP location
//          await updateMapWithNewIp(map, marker, ipAddress);

//          // Fetch and update location data
//          const locationData = await fetchIpLocation(ipAddress);
//          updateLocationData(locationData);
//       } catch (err) {
//          console.error('Error fetching data: ' + err);
//       }
//    });

//    try {
//       const locationData = await fetchIpClient();
//       updateLocationData(locationData);
//    } catch (err) {
//       console.error('Error fetching data: ' + err);
//    }
// });
