/**
 * Usage:
 *
 * Include Google Maps API: <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places"></script> (Add your API key: &key=)
 * Inject 'googlePlaces' in your app module: angular.module('myApp', ['google-places']);
 *
 * Use directive as an attribute in your template <input>:
 * <input id="place" type="text" google-places="place" options="optionsObj" ng-model="placeInput">
 *
 * Pass an optional options object (see documentation at: https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete)
 * The google-places attribute is required to pass data back and forth from the directive to your controller
 *
 * Controller example of $watch for place updates:
 *
 * $scope.$watch('place', function(newVal, oldVal) {
 *  if (newVal) {
 *		console.log('New place:', newVal);
 *		console.log('Lat:', newVal.geometry.location.lat(), 'Lng:', newVal.geometry.location.lng());
 *
 *	    // set input ng-model to Place formatted address
 *  	$scope.placeInput = newVal.formatted_address;
 *	}
 * });
 */

(function() {
	'use strict';

	// module setter
	angular.module('googlePlacesAutocomplete', []);

	angular
		.module('googlePlacesAutocomplete')
		.directive('googlePlacesAutocomplete', googlePlacesAutocomplete);

	function googlePlacesAutocomplete() {
		// return directive
		return {
			restrict: 'A',
			scope: {
				options: '=',
				googlePlacesAutocomplete: '='
			},
			link: googlePlacesAutocompleteLink
		};

		/**
		 * LINK function
		 *
		 * @param $scope
		 * @param $element
		 */
		function googlePlacesAutocompleteLink($scope, $element) {
			// initialize new Places autocomplete and pass options
			$scope.gPlace = new google.maps.places.Autocomplete($element[0], $scope.options);

			// clear placeholder attribute
			$element.attr('placeholder', '');

			// listen for place to change
			google.maps.event.addListener($scope.gPlace, 'place_changed', _placeChanged);

			/**
			 * Place changed event
			 *
			 * @private
			 */
			function _placeChanged() {
				var geoComponents = $scope.gPlace.getPlace();

				// update the googlePlaces object and propagate changes
				$scope.$apply(function() {
					$scope.googlePlacesAutocomplete = geoComponents;
				});
			}
		}
	}
}());