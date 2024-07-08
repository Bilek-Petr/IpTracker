import { fetchIpLocation } from './api.js';
import { updateLocationData } from './domUpdater.js';
import { updateMapWithNewIp } from './map.js';

//VARIABLES
const formInput = document.querySelector('#form__input');
let map, marker;

//FUNCTIONS
const getInputValue = () => formInput.value.trim();

const shakeInput = (inputElement) => {
   inputElement.classList.add('shake');
   setTimeout(() => inputElement.classList.remove('shake'), 300);
};

export const handleFormSubmit = async (e) => {
   e.preventDefault();

   const ipAddress = getInputValue();
   if (!ipAddress) {
      console.error('Please enter a valid IP address');
      shakeInput(formInput);
      return;
   }

   try {
      const locationData = await fetchIpLocation(ipAddress);
      updateLocationData(locationData);

      // Update the map and marker
      marker = await updateMapWithNewIp(map, marker, ipAddress);
   } catch (err) {
      console.error('Error fetching data: ' + err);
      shakeInput(formInput);
   }
};

// Function to set the map and marker instances (called from main.js)
export const setMapAndMarker = (mapInstance, markerInstance) => {
   map = mapInstance;
   marker = markerInstance;
};
