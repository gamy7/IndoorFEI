var map = L.map('map', {
    maxZoom: 21,
    minZoom: 18,
    maxBounds: [
        //sur oeste
        [19.54068, -96.92768],
        //north east
        [19.54230, -96.92665]
        ], 
}).setView([19.54126, -96.2720], 20);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}) .addTo(map);

L.marker([40.743, -74.176]) .addTo(map);

var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    center: [19.54126, -96.92720],
    maxNativeZoom: 19,
    minZoom: 19,
    maxZoom: 30,
    attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// proveedores de capas
    //osm_mapnik
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxNativeZoom: 19,
    minZoom: 19,
    maxZoom: 30,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


OpenStreetMap_Mapnik.addTo(map);

    //osm_de
var OpenStreetMap_DE = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',{    
    maxNativeZoom: 19,
    minZoom: 19,
    bbox: [19.54126, -19.54126],
    maxZoom: 30,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

    //google street
let googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    minZoom: 19,
    maxZoom: 30,
    subdomains:['mt0','mt1','mt2','mt3']
});

// google hybrid

let googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    minZoom:19,
    maxZoom: 30,
    subdomains:['mt0','mt1','mt2','mt3']
});


var nivel3 = L.geoJSON(hqData, {
      style: function () {
                return {color: "#154F72"};
              },
   onEachFeature: function (feature, layer) {
    layer.bindPopup('<h3>'+feature.properties.name+'</h3><p>Nivel: '+feature.properties.level+'</p>' + feature.properties.tags + "</dd>");
 }
})



//var marker = L.markerClusterGroup();
var nivel22 = L.geoJSON(hqData2, {
    style: function (feature) {
              return {color: "#16B1C7"};
            },

  onEachFeature: function (feature, layer) {
    layer.bindPopup('<h3>'+feature.properties.name+'</h3><h3>Nivel: '+feature.properties.level+'</h3>' + feature.properties.id + "</dd>");
  }
})


//+++++++ niveles capas

nivel1 =L.geoJSON(hqData)
nivel2 = L.geoJSON(hqData2)

/*
  //geoserver
varÑ geo = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/feindoor2/wms", {
    layers: 'feindoor2:osm_line',
    format: 'image/png',
    transparent: true,
    attribution: "wms test",
});
*/

//marcador
var marca = L.marker([19.5412371, -96.9271773], {draggable: true})
var popup = marca.bindPopup('ubicacion poerson'+ marca.getLatLng()).openPopup()

//console.log(marca.getLatLng());
    //marca.addTo(map);
popup.addTo(map);



/* +++++++ layer controlador +++++++
*/

var baseMaps ={
    "Google Street" : googleStreets,
    "OSM_Mapnik" : OpenStreetMap_Mapnik,
    "OSM_DE" : OpenStreetMap_DE,
    "Google Hybrid" : googleHybrid,
    //"wms" : geo,

};

var niveles = {
    "Nivel 1" : nivel3,
    "Nivel 2": nivel22,
}

//var overlayMaps = {
  //  "Marker" : marca,  //
//
//
//};


L.control.layers(baseMaps, niveles).addTo(map);



/* ++++++ eventos de leaflet +++
 */
// e
map.on('mouseover',  function (){
    console.log('el mouse esta en el mapa')
});
map.on('mousemove', function(e){
   document.getElementsByClassName('coordinate')[0].innerHTML = 'lat: ' + e.latlng.lat + ' lng: ' + e.latlng.lng;
  //  console.log('lat: ' + e.latlng.lat, 'lng: ' + e.latlng.lng)
})

map.on('click', function (e){
    popupdata= [];
    document.getElementsByClassName('coordinate')[0].innerHTML = 'lat: ' + e.latlng.lat + ' lng: ' + e.latlng.lng;
    if(popupc){
        console.info("ya hay un marcadorc")
        map.removerLayer(popupc)
    }else
   // popupdata.push('prueba lat: ' + e.latlng.lat, 'lng: ' + e.ltlng.lng)
    console.log(popupdata)
    //popupdata.addTo(map);
    var marcac = L.marker([e.latlng.lat, e.latlng.lng], {draggable: true})
    var popupc = marcac.bindPopup('ubicacion'+ marcac.getLatLng()).openPopup()
    popupc.addTo(map);

})





	 var salamancaMonumental = L.layerGroup().addTo(map);

	 			function colorPuntos(d) { 
					return d == "aula102" ? '#FF0000' : 
						'#FF0000'; 
				};

				function estilo_monumentos (feature) {
					return{
						radius: 7,
						fillColor: colorPuntos(feature.properties.name), 
			    		color: colorPuntos(feature.properties.name), 
						weight: 1,
						opacity : 1,
						fillOpacity : 0.5
					};
				};
				function popup_monumentos (feature, layer) {
					layer.bindPopup("<div style=text-align:center><h3>"+feature.properties.name+
			        "<h3></div><hr><table><tr><td> Tipo: "+feature.properties.id+
			        "</td></tr><tr><td>Nivel: "+feature.properties.level+
			        "</td></tr></table>",
			        {minWidth: 150, maxWidth: 200});				
					};

				var MarkerOptions = {
				    radius: 8,
				    fillColor: "#ff7800",
				    color: "#000",
				    weight: 1,
				    opacity: 1,
				    fillOpacity: 0.8
					};


	function myFunction() { 
			 	var monumentos = L.geoJSON(hqDat, {
							pointToLayer: function (feature, latlng) {
									return L.circleMarker(latlng, MarkerOptions);
								},	
							style:estilo_monumentos,
							onEachFeature: popup_monumentos	
					});		

			 	//salamancaMonumental.addLayer(monumentos);	
	
	}

	$("#buscar").click(function(){
		var miSelect = document.getElementById("nombres").value;

		if (miSelect == ""){
			swal.fire( 'el contendi no puede ir vacio','You clicked the button!')	

		}
		var monumentos = L.geoJSON(hqDat, {
							pointToLayer: function (feature, latlng) {
									return L.circleMarker(latlng, MarkerOptions);
								},
							filter: function(feature, layer) {								
								if(miSelect != "TODOS"){
								var x = feature.properties.name == miSelect;
									console.log(x);
									return (feature.properties.name == miSelect );
								//alert("hola");
								}	else
									return true;
									
							},	
							style:estilo_monumentos,
							onEachFeature: popup_monumentos	
					});		

		salamancaMonumental.clearLayers();
		salamancaMonumental.addLayer(monumentos);
	});


