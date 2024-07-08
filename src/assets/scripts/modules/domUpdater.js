/**
 * Update the DOM elements with location data.
 * @param {Object} data - The location data.
 * @param {string} data.ip - The IP address.
 * @param {Object} data.location - The location information.
 * @param {string} data.location.region - The region.
 * @param {string} data.location.country - The country.
 * @param {string} data.location.timezone - The timezone.
 * @param {string} data.isp - The ISP.
 */

export const updateLocationData = (data) => {
   const elements = {
      ip: document.querySelector('[data-ip]'),
      location: document.querySelector('[data-location]'),
      timezone: document.querySelector('[data-timezone]'),
      isp: document.querySelector('[data-isp]'),
   };

   const updateTextContent = (element, text) => {
      if (element) {
         element.textContent = text || 'N/A';
      }
   };

   updateTextContent(elements.ip, data.ip ?? 'N/A');

   const locationText = `${data.location?.region ?? 'N/A'}, ${
      data.location?.country ?? 'N/A'
   }`;
   updateTextContent(elements.location, locationText);
   updateTextContent(elements.timezone, data.location?.timezone ?? 'N/A');
   updateTextContent(elements.isp, data.isp ?? 'N/A');
};
