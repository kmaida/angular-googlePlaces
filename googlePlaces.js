/**
 * Usage:
 *
 * Include Google Maps API: <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&sensor=false"></script>
 * Inject 'googlePlaces' in your app module: angular.module('myApp', ['google-places']);
 *
 * Use directive as an attribute in your template <input>:
 * <input id="place" type="text" google-places options="optionsObj" place="place">
 *
 * Pass an optional options object (see https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete)
 * The place attribute is required to pass data back and forth from the directive to your controller
 *
 * Controller example of $watch for place updates:
 *
 * $scope.$watch('place', function(newVal, oldVal) {
 *  if (newVal) {
 *		console.log('New place:', newVal);
 *		console.log('Lat:', newVal.geometry.location.lat(), 'Lng:', newVal.geometry.location.lng());
 *	}
 * });
 */

(function() {
	'use strict';

	// setter
	angular
		.module('googlePlaces', []);

	angular
		.module('googlePlaces')
		.directive('googlePlaces', googlePlaces);

	function googlePlaces() {
		// return directive
		return {
			restrict: 'A',
			scope: {
				options: '=',
				place: '='
			},
			link: googlePlacesLink
		};

		/**
		 * LINK function
		 *
		 * @param $scope
		 * @param $element
		 */
		function googlePlacesLink($scope, $element) {
			// $scope namespace
			$scope.gp = {};
			$scope.gp.gPlace = new google.maps.places.Autocomplete($element[0], $scope.options);

			$element.attr('placeholder', '');

			google.maps.event.addListener($scope.gp.gPlace, 'place_changed', function() {
				var geoComponents = $scope.gp.gPlace.getPlace();

				$scope.$apply(function() {
					$scope.place = geoComponents;
				});
			});
		}
	}
}());