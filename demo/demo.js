var GeoAPI = require("@geoapi.es/nodejs")();

GeoAPI.setConfig("sandbox", 1);

GeoAPI.comunidades().then(function(data) {
	console.log(data);
}, function(error) {
	console.log(error);
});