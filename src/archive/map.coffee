mapC = {}

mapC.controller = ->

mapC.view = (ctrl, args) ->
	m 'div', {id: "map", config: addMap}

users = m.prop([])

addMap = (element, isInitialized, context) ->
	if (isInitialized) 
		return
	createMap(element)
	addDataToMap()

createMap = (elID) ->
	# el = document.getElementById(elID)
	console.log elID
	map = L.map(elID).setView([-31, 151],13)
	return

informationArray = []

$.ajax({
  url: "http://da.ballina.nsw.gov.au/atdis/1.0/applications.json",
  dataType: "json",
  success: (response) ->
    for application in response.response
      console.log application
      informationArray.push(application.application.info.estimated_cost)
    informationArray.push("success")
    return
});

# addDataToMap = (data) ->
# 	users = m.request({dataType:"jsonp", url: "http://datracking.berriganshire.nsw.gov.au/Horizon/@@horizondap@@/atdis/1.0/applications.json"})
# 	console.log users()
# 	group = L.layerGroup()
# 	for response in users.response
# 		group.addLayer(L.marker(response.coordinates).bindPopup(response.street))
# 	group.addTo(map)


m.mount(document.body, mapC)