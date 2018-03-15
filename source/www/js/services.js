angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('Helper', ['$http', '$ionicTabsDelegate', '$ionicLoading', function($http, $ionicTabsDelegate, $ionicLoading){
	// list storing the languages
	if (typeof window.localStorage.getItem('langs') == 'object') {
		var langs =['english'];
	} else {
		var langs = JSON.parse(window.localStorage.getItem('langs'));
	}	
	this.getLangs = function(){
		return langs;
	}

	
	// object storing all words by language
	var words = {};
	for (var i = langs.length - 1; i >= 0; i--) {
		var x = JSON.parse(window.localStorage.getItem(langs[i]));
		
		if (x == null || x == "undefined") {
			x = {};
		}
		words[langs[i]] = x;	
	};
	this.getWords = function(){
		return words;
	}


	// this function creates a two column array out of a normal array
	function chunk(arr, size) {
		var newArr = [];
		for (var i=0; i<arr.length; i+=size) {
			newArr.push(arr.slice(i, i+size));
		}
		return newArr;
	}
	var chunkedData = chunk(langs, 2);
	this.getChunk = function (){
		return chunkedData;
	}


	// function called when saving a word
	this.save = function(word, meaning, lang){
		words[lang][word] = meaning;
		window.localStorage.setItem(lang, angular.toJson(words[lang]));
		this.postData();
	}

	// function called when new language group is created
	this.newLang = function(data){
		if (data !== undefined) {
			langs.push(data);
			window.localStorage.setItem('langs', angular.toJson(langs));
			this.postData();
			angular.copy(chunk(langs, 2), chunkedData);
		}
	}

	// function called when deleting group
	this.deleteLang = function(item){
		var indexOf = langs.indexOf(item);
		langs.splice(indexOf, 1);
		window.localStorage.removeItem(item);
		window.localStorage.setItem("langs", angular.toJson(langs));
		this.postData();
		angular.copy(chunk(langs, 2), chunkedData);
	
	}

	//randomly creates an ID out of 4 characters for CouchDB
	function makeid(){
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for( var i=0; i < 4; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	}

	this.getID = function(){
    	return dbid;
    }

    var dbid = JSON.parse(window.localStorage.getItem('dbid'));
	var dbrev = JSON.parse(window.localStorage.getItem('dbrev'));

	// posting data to a CouchDB database
	this.postData = function () {
		var myContent = {};
		var data = window.localStorage;
		for (var i in data) {
			myContent[i] = JSON.parse(data[i]);
		}
		var cloudant_USER = 'csga14';
		var cloudant_DB = 'mashups';
		var cloudant_KEY = 'flenespeakeheingmendraid';
		var cloudant_PASSWORD = '5e64a3a73d809a76c5d9facb98cf2da1ab237bf0';
		var  hash = btoa(cloudant_KEY+':'+cloudant_PASSWORD);
		if (dbid === null) {
			var cloudant_URL = "https://" + cloudant_USER + ".cloudant.com/" + cloudant_DB + "/" + makeid();
			var myData = {content: myContent};
		} else {
			cloudant_URL = "https://" + cloudant_USER + ".cloudant.com/" + cloudant_DB +"/"+ dbid;
			var myData = {"_id": dbid,"_rev": dbrev, content: myContent};
		}
		$http({
			url: cloudant_URL,
			method: 'PUT',
			headers: {
				'Authorization': "Basic " + hash
			},
			data: myData
		}).success(function(response) {
			window.localStorage.setItem("dbid", angular.toJson(response.id));
			window.localStorage.setItem("dbrev", angular.toJson(response.rev));
			dbid = response.id;
			dbrev = response.rev;
			console.log(response);
		}).error(function(response){
			console.log(response);
			dbid = null;
			});
	}

	// Functions called when swiping
	this.goForward = function () {
		var selected = $ionicTabsDelegate.selectedIndex();
		if (selected != -1) {
            $ionicTabsDelegate.select(selected + 1);
        }
    };
    this.goBackward = function () {
		var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1) {
            $ionicTabsDelegate.select(selected - 1);
        }
    };

    // I had a list of words already so I made a shortcut to import those words
    this.importWords = function(){
    	$http.get('/android_asset/www/js/data/english.json').
		    success(function(data, status, headers, config) {
		      	langs.push('English');
				window.localStorage.setItem('langs', angular.toJson(langs));
				angular.copy(chunk(langs, 2), chunkedData);
		    	words['English'] = data;
		      	window.localStorage.setItem('English', angular.toJson(data));
		    }).
		    error(function(data, status, headers, config) {
		      	console.log(data);
		    });
    	$http.get('/android_asset/www/js/data/german.json').
		    success(function(data, status, headers, config) {
		    	langs.push('Deutsch');
				window.localStorage.setItem('langs', angular.toJson(langs));
				angular.copy(chunk(langs, 2), chunkedData);
		      	words['Deutsch'] = data
		      	window.localStorage.setItem('Deutsch', angular.toJson(data));
		    }).
		    error(function(data, status, headers, config) {
		    	words['Deutsch'] = data;
		     	console.log(data);
		    });	
    }

}]);

