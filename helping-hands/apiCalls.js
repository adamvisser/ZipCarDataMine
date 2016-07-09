

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
		ziptopiaCrossSiteRequest.open(method, url, true);
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

function submitDataToServer(persons, currentTime) {
	//build the json data we will submit later
	var dataMap = {
		turnNumber:getTurnNumber(),
		clientID:getClientID(),
		peoples:persons,
		currentTime,currentTime
	};
	//this is the api url i have setup
	var url = 'http://ziptopia.adamvisser.me/submitdata';
	//setting up the request to another site (my site)
	var ziptopiaCrossSiteRequest = dataSubmissionSetup('POST', url);
	if (!ziptopiaCrossSiteRequest) {
		//not supported by browser....
		alert('Please contact adam at: adamvissers@gmail.com to let him know you had a problem caused by his request code!');
	}
	//it actually worked! log the data so I can make sense of it as I program things out
	ziptopiaCrossSiteRequest.onload = function() {
		var text = ziptopiaCrossSiteRequest.responseText;
		console.log('REQUEST WORKED AND RESPONDED WELL ==== BEGIN RESPONSE DUMP');
		console.log(text);
		console.log('===inmid===');
		console.log(JSON.parse(text));
		console.log('REQUEST WORKED AND RESPONDED WELL ==== END RESPONSE DUMP');
	};
	//it didnt work, so now I can have users get a notice, and I will have to check the error logs
	ziptopiaCrossSiteRequest.onerror = function() {
		alert('Please contact adam at: adamvissers@gmail.com to let him know to check his error logs!');
	};
	//all that mumbo jumbo, just so I can run this call is pure JS.
	//it submits data to my api. 
	console.log('sending request....');
	ziptopiaCrossSiteRequest.send(JSON.stringify(dataMap));
	console.log('request sent....');
}
/*
====================================
	END CODE TO SUBMIT TO API
====================================
*/






/*
====================================
	BEGIN CODE TO PROPERLY TRACK GLOBALS
====================================
*/
function setupTurnNumber(){
	if(window.AdamHatesGlobalsTurnNumber === undefined){
		window.AdamHatesGlobalsTurnNumber = 0;
	}else if(window.AdamHatesGlobalsTurnNumber > 999){
		window.AdamHatesGlobalsTurnNumber = 0;
		jQuery('#run').click();
	}else{
		window.AdamHatesGlobalsTurnNumber++;
	}
}


//this breaks if it gets called more than once....
//thats some really crap programming adam
function getTurnNumber(){
	console.log('turn number was requested');
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
	console.log('client id was requested');
	setupClientID();
	return window.AdamHatesGlobalsClientID;
}

/*
====================================
	END CODE TO PROPERLY TRACK GLOBALS
====================================
*/









function turn(vehicles,peoples,buildings){
	//lets change this to only run once eh?
	if(window.AdamHatesGlobalsTurnNumber === undefined){
		//just to be safe we use the parseint here
		console.log('Launching the request functions');
		submitDataToServer(peoples, Date.now());
	}
	
}