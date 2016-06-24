
//there is so much DI going on here.... need to figure out of this is bad and if it can be cleaned up
function homeController($scope,TeamQuickInfo){
	//load the ui service
	//	$scope.userID = $cookies.get('userID');
	//	if (!ViewData.isSetup) {
	//		ViewData.setupUIService(ToolsUI, ReportsUI, HomeUI, UISettings, $scope.userID);
	//	}

	//for testing purposes
	$scope.startTime =1462905770;
	$scope.endTime = 1475107200;
	$scope.saas = TeamQuickInfo.get({team:'saas', startTime: $scope.startTime, endTime: $scope.endTime});
	$scope.paas =TeamQuickInfo.get({team:'paas', startTime: $scope.startTime, endTime: $scope.endTime});
	$scope.iaas =TeamQuickInfo.get({team:'iaas', startTime: $scope.startTime, endTime: $scope.endTime});
	$('.ui.styled.accordion').accordion();
}


function changemepleaseiamverywrong($scope){
	
}