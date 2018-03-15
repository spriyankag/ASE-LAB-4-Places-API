angular.module('app.controllers', [])



//////////////////////////////////////////////////////////////
//controller for the add new word page
//////////////////////////////////////////////////////////////
.controller('addCtrl', function($scope, $ionicPopover, $ionicLoading, Helper) {
	
	// Function called when swiping to change tabs
	$scope.goForward = function(){Helper.goForward();}
    $scope.goBackward = function(){Helper.goBackward();}

    //function to delte an item
	$scope.deletion = function(item){
		Helper.deleteLang(item);
	};

	//function called when submitting a new language
	$scope.newLang = function (data) {
		Helper.newLang(data);
		$scope.newlanguage.name = "";
	};

	//function called when adding a new word to the database
	$scope.save = function() {
		if ($scope.list !== undefined) {
			if ($scope.list.word !== undefined && $scope.list.meaning !== undefined) {
				Helper.save($scope.list.word, $scope.list.meaning, $scope.choice.checked)
				$scope.list = {};
			} else {
				$ionicLoading.show({ template: 'There was a mistake', noBackdrop: true, duration: 2000 });
			}
		}else {
			$ionicLoading.show({ template: 'There was a mistake', noBackdrop: true, duration: 2000 });
		}
	};
	//shortcut for me to import my own words
	$scope.importWords = function(){
		Helper.importWords();
	}


	// creates an array of the language groups that the user created before on pageload
	$scope.langs = Helper.getLangs();
	// the name of the new group is stored here
	$scope.newlanguage = {'name': ''};
	// the list of groups displayed is based on this variable
	$scope.chunkedData = Helper.getChunk();
	//the group selected by th user is stored here
	$scope.choice = {'checked':$scope.langs[0]};
	//if you open the popover, this function calls its template
	$ionicPopover.fromTemplateUrl('templates/popover.html', {
		scope: $scope,
		}).then(function(popover) {
		$scope.popover = popover;
	});
})



//////////////////////////////////////////////////////////////
//controller for the list of words page
//////////////////////////////////////////////////////////////
.controller('listCtrl', function($scope, $http, $ionicTabsDelegate, Helper) {
	//called when a swipe happens and directs us to the next page
    $scope.goBackward = function(){Helper.goBackward();}
    
    //updates the list on page
	$scope.updateList = function (){
		$scope.words = Helper.getWords()[$scope.choice.checked];
	};
	
	//this is the function called when the user clicks delete an item
	$scope.deletion = function(item){
		delete $scope.words[item];
		window.localStorage.setItem($scope.choice.checked, angular.toJson($scope.words));
		//Helper.setWords($scope.choice.checked, $scope.words)
		Helper.postData();
	};	
	
	// creates an array of the language groups that the user created before on pageload
	$scope.langs = Helper.getLangs();
	// the list of groups displayed is based on this variable
	$scope.chunkedData = Helper.getChunk();
	//the group selected by th user is stored here
	$scope.choice = {};
	//the words of the group the user selected are displayed here
	$scope.words =[];
	//dbid for display
	$scope.dbid = Helper.getID();

})



//////////////////////////////////////////////////////////////
//controller for the quiz page
//////////////////////////////////////////////////////////////
.controller('quizCtrl', function($scope, $timeout, $ionicTabsDelegate, Helper) {
	// Function called when swiping
	$scope.goForward = function(){Helper.goForward();}
    
	// when choosing new group the words have to change...
    $scope.updateList = function (){
    	$scope.words = Helper.getWords()[$scope.choice.checked] || {};
    	$scope.testWord();
    };

    // creates the question and the answer to it
    $scope.testWord = function (){
    	$scope.toDisplay = pickRandomProperty($scope.words);
    	if (Math.random() < 0.65) {
    		$scope.question = $scope.words[$scope.toDisplay] || ".........";
    		$scope.answer = $scope.toDisplay || "the group is empty";
    	} else {
    		$scope.question = $scope.toDisplay || ".........";
    		$scope.answer = $scope.words[$scope.toDisplay] || "the group is empty";
    	};
    };

    // displays answer and calls a new round of words
    $scope.shuffle = function(){
    	$scope.answerDisplayed = "To check: " + $scope.answer;
    	$timeout(function(){ 
    		$scope.answerDisplayed = "";
			$scope.testWord();
		}, 1500);	
    };

    //function picking a random property of an Object
	function pickRandomProperty(obj) {
	    var keys = Object.keys(obj)
    	return keys[ keys.length * Math.random() << 0];
	}

	// creates an array of the language groups that the user created before on pageload
	$scope.langs = Helper.getLangs();
    // the list of groups displayed is based on this variable
	$scope.chunkedData = Helper.getChunk();
	//the group selected by th user is stored here
	$scope.choice = {};

	$scope.toDisplay;
	//placeholder
	$scope.question = ".........";
    //placeholder
    $scope.answer = "no group selected";

});

