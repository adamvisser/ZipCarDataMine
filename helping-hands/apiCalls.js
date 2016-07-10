

/*
====================================
	BEGIN CODE TO SUBMIT TO API
====================================
*/
function dataSubmissionSetup(method, url) {
	console.log('starting data submission setup');
	var ziptopiaCrossSiteRequest = new XMLHttpRequest();
	if ("withCredentials" in ziptopiaCrossSiteRequest) {
		//Chrome/Firefox/Opera/Safari.
		ziptopiaCrossSiteRequest.open(method, url, false);
		console.log('CSR setup');
	} else if (typeof XDomainRequest != "undefined") {
		//Microsoft has a larger "im different" complex than the others
		ziptopiaCrossSiteRequest = new XDomainRequest();
		ziptopiaCrossSiteRequest.open(method, url);
	} else {
		// this isnt going to work as this browser doesnt support it.... have the user contact me
		ziptopiaCrossSiteRequest = null;
	}
	return ziptopiaCrossSiteRequest;
}

function getDataSubmitterConnection() {
	
	//this is the api url i have setup
	var url = 'http://ziptopia.adamvisser.me/submitdata';
	//setting up the request to another site (my site)
	var ziptopiaCrossSiteRequest = dataSubmissionSetup('POST', url);
	if (!ziptopiaCrossSiteRequest) {
		//not supported by browser....
		ziptopiaCrossSiteRequest = null;
		alert('Please contact adam at: adamvissers@gmail.com to let him know you had a problem caused by his request code!');
	}else{
		//it actually worked! log the data so I can make sense of it as I program things out
		ziptopiaCrossSiteRequest.onload = function() {
			console.log('REQUEST WORKED AND RESPONDED WELL');
		};
		//it didnt work, so now I can have users get a notice, and I will have to check the error logs
		ziptopiaCrossSiteRequest.onerror = function() {
			alert('Please contact adam at: adamvissers@gmail.com to let him know to check his error logs!');
		};
	}

	//all that mumbo jumbo, just so I can run this call is pure JS.
	//it submits data to my api. 
	return ziptopiaCrossSiteRequest;
}


function getDataMapString(persons, currentTime){
	//build the json data we will submit later
	return JSON.stringify({
		ziptopiaID:getZiptopiaID(),
		turnNumber:getTurnNumber(),
		clientID:getClientID(),
		peoples:persons,
		currentTime,currentTime
	});
}
/*
====================================
	END CODE TO SUBMIT TO API
====================================
*/






/*
====================================
	BEGIN CODE TO PROPERLY TRACK DATAMAP
====================================
*/
function setupTurnNumber(){
	if(window.AdamHatesGlobalsTurnNumber === undefined){
		window.AdamHatesGlobalsTurnNumber = 0;
	}else if(window.AdamHatesGlobalsTurnNumber > 999){
		//we are starting at 0, but going until 1000 because we want the request to fully go through. this will act as our "sync"... for now
		window.AdamHatesGlobalsTurnNumber = 0;
		jQuery('#run').click();
	}else{
		window.AdamHatesGlobalsTurnNumber++;
	}
}

function setupZiptopiaID(id){
	//I baked in an "o goodness all is wrong" flag to the ziptopiaID. for now....
	if (id < -1) {
		resetupRun()
	} else {
		window.AdamHatesGlobalsZiptopiaID = id;
	}
	
}

function getZiptopiaID(){
	if(window.AdamHatesGlobalsZiptopiaID === undefined){
		return -1;
	}
	return window.AdamHatesGlobalsZiptopiaID;
}


//this breaks if it gets called more than once....
//thats some really crap programming adam
function getTurnNumber(){
	setupTurnNumber();
	return window.AdamHatesGlobalsTurnNumber;
}

function setupClientID(){
	if(window.AdamHatesGlobalsClientID === undefined){
		//just to be safe we use the parseint here
		window.AdamHatesGlobalsClientID = parseInt(Date.now());
	}
}

function getClientID(){
	setupClientID();
	return window.AdamHatesGlobalsClientID;
}

function resetupRun(){
	window.AdamHatesGlobalsTurnNumber = undefined;
	window.AdamHatesGlobalsClientID = undefined;
	window.AdamHatesGlobalsZiptopiaID = undefined;
	jQuery('#run').click();
}

/*
====================================
	END CODE TO PROPERLY TRACK DATAMAP
====================================
*/









function turn(vehicles,peoples,buildings){
	//just to be safe we use the parseint here
	console.log('Launching the request functions');
	var ziptopiaCrossSiteRequest = getDataSubmitterConnection();
	if (ziptopiaCrossSiteRequest !== null) {
		var dataMapString = getDataMapString(peoples, Date.now());
		ziptopiaCrossSiteRequest.send(dataMapString);
		var text = ziptopiaCrossSiteRequest.responseText;
		var hasZiptopiaID = text.search('{"ziptopiaID":');
		console.log(hasZiptopiaID );
		if (hasZiptopiaID) {
			//console.log(text);
			var subString = text.substring(hasZiptopiaID);
			console.log(subString);
			//were calling this every turn.... for now...
			//responseJSON = JSON.parse(subString);
			//setupZiptopiaID(responseJSON.ziptopiaID);
		}else{
			console.log('JSON Parse has no Ziptopia ID, have to restart the run!');
			resetupRun();
		}
	} else {
		console.log('CORS request cant be setup.... No POST, No Data.');
	}
	console.log('Ending the request functions');
}