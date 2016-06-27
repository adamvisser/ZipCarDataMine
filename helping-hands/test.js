







console.log('{destination:"'+item.destination+'", name:"'+item.name+'", origin:"'+item.origin+'", time:'+item.time+', time0:'+item.time0+', x:'+item.x+', y:'+item.y+'}'); 


function createCORSRequest(method, url) {
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {

		// Check if the XMLHttpRequest object has a "withCredentials" property.
		// "withCredentials" only exists on XMLHTTPRequest2 objects.
		xhr.open(method, url, true);
	}else {
		// Otherwise, CORS is not supported by the browser.
		xhr = null;
	}
	return xhr;
}

var xhr = createCORSRequest('GET', url);
if (!xhr) {
	throw new Error('CORS open Request Failed');
}


xhr.onload = function() {
	var responseText = xhr.responseText;
	console.log(responseText);
	// process the response.
};


if(window.AdamHatesGlobals === undefined){
	window.AdamHatesGlobals = 0;
}else if(window.AdamHatesGlobals > 100){
	window.AdamHatesGlobals = 0;
	jQuery('#run').click();
}else{
	window.AdamHatesGlobals++;
}




function turn(vehicles,peoples,buildings){
	//documentation can be found in the source
	//Good luck :)
	//lets see how long a turn fully takes
	//56.23307
}