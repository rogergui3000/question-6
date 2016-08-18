(function() {
  'use strict';

  angular.module('meetIrl', [
    'ui.router'
  ])
  .config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
  });
})();


angular.module('app', [])
// Inject the pouchdb service into HomeCtrl and create a new pouch database for both the local pouch db and the remote couch db.
.controller('HomeCtrl', ['$scope', 'pouchdb',  function($scope, pouchdb) {

	$scope.item = {};

	$scope.items = [];
	
	var dbLocal = new PouchDB('expenses');
	var dbRemote = new PouchDB('http://localhost:5984/expenses');
	
	dbLocal.allDocs({
		include_docs: true
	}).then(function(result) {
		console.log('re	var dbLocal = new s is', result.rows);
		for (var i = 0; i < result.rows.length; i++) {
			var obj = {
				"_id": result.rows[i].doc.id,
				"expense": result.rows[i].doc.expense,
				"amount": result.rows[i].doc.amount
			}
			$scope.items.push(obj);
			$scope.$apply();
		}
		console.log($scope.items);
		Array.prototype.sumamount = function (prop) {
		    var total = 0
		    for ( var i = 0, _len = this.length; i < _len; i++ ) {
		        total += this[i][prop]
		    }
		    return total
		}
		$scope.sum = $scope.items.sumamount("amount");
	}).catch(function(err) {
		console.log(err);
	});

	dbLocal.replicate.to(dbRemote, {
		live: true
	}, function(err) {
		console.log(err);
	});
	//Add two functions inside the HomeCtrl to show and close the modal pop up.
	// Get the button that opens the modal
	$scope.modal = document.getElementById('myModal');
	$scope.btn = document.getElementById("myBtn");
	$scope.span = document.getElementsByClassName("close")[0];
	$scope.popup = function() {
		// Get the <span> element that closes the modal
		$scope.modal.style.display = "block";

	};

	$scope.add = function() {

		
		$scope.modal.style.display = "none";
		var timeStamp = String(new Date().getTime());
		console.log(timeStamp);

		var item = {
			"_id": timeStamp,
			"expense": $scope.item.expense,
			"amount": $scope.item.amount
		};

		dbLocal.put(
			item
		).then(function(response) {
			$scope.items.push(item);
			$scope.modal.style.display = "none";
			
		}).catch(function(err) {
			console.log(err);
		});
	};
	
	$scope.remove = function(e) {

		var item = {
			"_id": event
		};
		$(this).parent().hide();
		dbLocal.remove(
			item
		).then(function(response) {
			$scope.items.pop(item);
			
		}).catch(function(err) {
			console.log(err);
		});

	};
	$scope.closemodal = function(){
		$scope.modal.style.display = "none";
	}

}])

.service('CommonProp', function() {
	var items = [];

	return {
		getUser: function() {
			return items;
		},
		setUser: function(value) {
			items.push(value);
		}
	};
})

.factory('pouchdb', function() {
	return new PouchDB('myApp');
});
