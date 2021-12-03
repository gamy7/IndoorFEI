// Inicializacion de map
var map = L.map('map').setView([19.54126, -96.92720], 19); //Se le asiganan las coordenadas de la facultad

//osm layer
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 19,
    maxZoom: 30,
    attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);

// proveedores de capas
    //osm_mapnik
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 19,
    maxZoom: 30,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
    //osm_de
var OpenStreetMap_DE = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
    minZoom: 19,
    maxZoom: 30,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

    //google street
googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    minZoom: 19,
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

// google hybrid

googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    minZoom:19,
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

/*  //geoserver
var wms = L.tileLayer.wms("https://localhost:8080/geoserver/wms", {
    layers : 'geoapp:Admin',
    format : 'image/png',
    transparent : true,
    attribution : "wms test"
});
*/

//marcador
var marca = L.marker([19.5412371, -96.9271773], {draggable: true})
var popup = marca.bindPopup('ubicacion'+ marca.getLatLng()).openPopup()

console.log(marca.getLatLng());
    //marca.addTo(map);
popup.addTo(map);


/* +++++++ layer controlador +++++++
 */

var baseMaps ={
    "OSM_Mapnik" : OpenStreetMap_Mapnik,
    "OSM_DE" : OpenStreetMap_DE,
    "Google Street" : googleStreets,
    "Google Hybrid" : googleHybrid,
    //"wms" : wms,

};

var overlayMaps = {
    "Marker" : marca,
    //"Nivel 1" : nivel1,
    //"Nivel 2" : nivel2,
};

L.control.layers(baseMaps, overlayMaps).addTo(map);



function buildOverpassApiUrl(map, overpassQuery) {
    var bounds = map.getBounds().getSouth() + ',' + map.getBounds().getWest() + ',' + map.getBounds().getNorth() + ',' + map.getBounds().getEast();
    var nodeQuery = 'node[' + overpassQuery + '](' + bounds + ');';
    var wayQuery = 'way[' + overpassQuery + '](' + bounds + ');';
    var relationQuery = 'relation[' + overpassQuery + '](' + bounds + ');';
    var query = '?data=[out:json][timeout:15];(' + nodeQuery + wayQuery + relationQuery + ');out body geom;';
    var baseUrl = 'http://overpass-api.de/api/interpreter';
    var resultUrl = baseUrl + query;
    return resultUrl;
}

$("#uno").click(function(){
    alert("holamunod");
    var level1 =  buildOverpassApiUrl(map, 'level=1');
    
}); 




// Hacer la consulta por medio de una busqueda 
$("#query-button").click(function () {
    // var queryTextfieldValue = 'level=1';
          var queryTextfieldValue = $("#query-textfield").val()
          var overpassApiUrl = buildOverpassApiUrl(map, queryTextfieldValue);

          $.get(overpassApiUrl, function (osmDataAsJson) {
              var resultAsGeojson = osmtogeojson(osmDataAsJson);
              var resultLayer = L.geoJson(resultAsGeojson, {style: function (feature) {
                  return {color: "#333c87"};
                  },
                  filter: function (feature, layer) {
                  var isPolygon = (feature.geometry) && (feature.geometry.type !== undefined) && (feature.geometry.type === "Polygon");
            //  if (isPolygon) {
              //  feature.geometry.type = "Point";
               // var polygonCenter = L.latLngBounds(feature.geometry.coordinates[0]).getCenter();
               // feature.geometry.coordinates = [ polygonCenter.lat, polygonCenter.lng ];
             // }
                      return true;
                      },

                  onEachFeature: function (feature, layer) {
                  var popupContent = "";
                  popupContent = popupContent + "<dt>@id</dt><dd>" + feature.properties.type + "/" + feature.properties.id + "</dd>";
                  var keys = Object.keys(feature.properties.tags);
                  keys.forEach(function (key) {
                      popupContent = popupContent + "<dt>" + key + "</dt><dd>" + feature.properties.tags[key] + "</dd>";
                  });

              }

              }).addTo(map);
          });
});

