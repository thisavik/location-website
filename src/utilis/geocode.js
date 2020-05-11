const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidGhpc2F2aWsiLCJhIjoiY2s5bDFkMDJpMDIwNzNrcGJudmNveDMxMiJ9.HqOe1CNDoMEs8P6L845mSA";

  // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidGhpc2F2aWsiLCJhIjoiY2s5bDFkMDJpMDIwNzNrcGJudmNveDMxMiJ9.HqOe1CNDoMEs8P6L845mSA';

  // using encodeURIComponent remove all special charcter by %
  // Like Los angelas to Los%angelas

  setTimeout(() => {
    request({ url, json: true }, (error, { body } = {}) => {
      if (error) {
        callback("Unable to access the Location Service !!", undefined);
      } else if (body.features.length === 0) {
        callback("Location not found. Try with another Location !!", undefined);
      } else {
        console.log(body.features[0])
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name,
        });
      }
    });
  }, 2000);
};

module.exports = geocode;
