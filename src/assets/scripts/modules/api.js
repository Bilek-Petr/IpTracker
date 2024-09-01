//https://leafletjs.com/ - to generate a map

const API_KEY = import.meta.env.VITE_API_KEY;

console.log(API_KEY);

const fetchIpData = async (url) => {
   try {
      const response = await fetch(url);
      if (!response.ok) {
         throw new Error(`HTTP error! status ${response.status}`);
      }
      return await response.json();
   } catch (error) {
      console.error('Error fetching IP location: ' + error);
      throw error;
   }
};

export const fetchIpLocation = async (ipAddress) => {
   const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ipAddress}`;
   return await fetchIpData(url);
};

export const fetchIpClient = async () => {
   const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=`;
   return await fetchIpData(url);
};
