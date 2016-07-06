// require ("C:\\Users\\s-rasher\\AppData\\Roaming\\npm\\node_modules\\ramda")
// informationArray = [];
// $.ajax({
//   url: "http://da.ballina.nsw.gov.au/atdis/1.0/applications.json",
//   dataType: "json",
//   success: function(response) {
//     var application, i, len, ref;
//     ref = response.response;
//     for (i = 0, len = ref.length; i < len; i++) {
//       application = ref[i];
//       informationArray.push(application.application.info.estimated_cost);
//     }
//     informationArray.push("success");
//   }
// });

//

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FydGhkYmVldGxlIiwiYSI6ImNpcHl5emhrdjB5YmxoY25yczF6MHhhc2IifQ.2Ld30uLqcffVv-RUAWk_qQ';

map = new mapboxgl.Map({
				    container: 'map',
				    style: 'mapbox://styles/mapbox/light-v9',
				    center: [151.102, -33.82],
				    zoom: 9
				});

var sydneySa1Source = new mapboxgl.GeoJSONSource({
   data: sydneySa1
});

map.on('load', function () {
	map.addSource('syd', sydneySa1Source);
	map.addLayer({
		'id': 'syd',
		'type': 'fill',
		'source': 'syd',
		'layout': {},
		'paint': {
			'fill-color': '#088',
			'fill-opacity': 0.8
		}
	});
});

results = {};


properties = R.keys(sydneySa1.features[0].properties)

function filterOutliers(someArray) {  

    // Copy the values, rather than operating on references to existing values
    var values = someArray.concat();

    // Then sort
    values.sort( function(a, b) {
            return a - b;
         });

    /* Then find a generous IQR. This is generous because if (values.length / 4) 
     * is not an int, then really you should average the two elements on either 
     * side to find q1.
     */     
    var q1 = values[Math.floor((values.length / 4))];
    // Likewise for q3. 
    var q3 = values[Math.ceil((values.length * (3 / 4)))];
    var iqr = q3 - q1;

    // Then find min and max values
    var maxValue = q3 + iqr*1.5;
    var minValue = q1 - iqr*1.5;

    // Then filter anything beyond or beneath these values.
    var filteredValues = values.filter(function(x) {
        return (x < maxValue) && (x > minValue);
    });

    // Then return
    return filteredValues;
}

function dataPropertyButton(elID, text){
	el = $('#'+elID)
	el.append($('<div>%s</div>'.replace('%s', text)).toggleClass('pure_button block ab'));
	console.log(text);
}
addCtrlButtons = R.curry(dataPropertyButton)("controls")

R.map(addCtrlButtons, properties)

function containerListener(elID){
	el = $('#'+elID);
	el.click(function(event){
		dataPropertyColor(event.target.textContent);
		}) 
    }

containerListener("controls",dataPropertyColor)



// map.addSource('syd', sydneySa1Source); // add

// map.removeSource('some id');  // remove
// console.log(R.pluck('data')(sydneySa1Source))



function dataPropertyColor(text){
	// console.log(text);
	props = R.map(R.path(['properties',text],R.__),sydneySa1.features)
	// console.log(props)
	// props = R.filter(function(x){return !(x<0.5);},props)
	max = R.reduce(R.max,-Infinity,filterOutliers(props));
	// console.log(max)
	newStyle = {
			property: text,
			stops: [
			[max/10, 'yellow'],
			[max/2, 'orange'],
			[max, 'red']
                ]
            };
    map.setPaintProperty('syd','fill-color',newStyle)
}



 // { "__gid": 607.0, "id": 1102801, "median_age": 0, "median_mor": 0, "median_ren": 0, "per_room": 0.0, "round": 0.0 },
