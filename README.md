angular-googlePlacesAutcomplete
===

`googlePlacesAutocomplete` is an Angular module with a directive to run Google Places Autocomplete on an input field. It leverages the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/).

##Quick Start

Include the `googlePlacesAutocomplete.js` file and inject the `googlePlacesAutocomplete` dependency in your app module. You must also include the Google Maps JS API with the Places library in your HTML file.

**index.html:**

Include the Google Maps API with the Places library in your application. For production deployment, make sure you have a [Google API key](https://developers.google.com/maps/documentation/javascript/get-api-key).

```
<script src="https://maps.googleapis.com/maps/api/js?key=[YOUR API KEY]&v=3.exp&libraries=places"></script>
```

**Module:**

Inject the `googlePlacesAutocomplete` module in your app module.

```
angular.module('myApp', ['googlePlacesAutocomplete']);
```

**View:**

Add the `google-places-autocomplete` directive to your `input` field to use the autocomplete. You may also pass an options attribute. The `google-places=""` attribute will be the object that updates as a Place is selected. You can then `$watch` this object in your controller for updates.

```
<input id="place" type="text" google-places-autocomplete="place" options="optionsObj" ng-model="placeInput">
```

**Controller:**

You may declare an optional `options` object to pass to the Google Places directive. Documentation on options can be referened at the Google Maps API docs here: [https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete](https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete)

```
// restrict Places autocomplete to the US:
$scope.optionsObj = { componentRestrictions: {country: 'us'} };

// watch for the place to update
// get latitude and longitude of the place
// update the field input to the place formatted address
$scope.$watch('place', function(newVal, oldVal) {
	if (newVal) {
		console.log('New place:', newVal);
		console.log('Lat:', newVal.geometry.location.lat(), 'Lng:', newVal.geometry.location.lng());

		// set input ng-model to Place formatted address
		$scope.placeInput = newVal.formatted_address;
	}
});
```

Note that the `google-places-autocomplete` attribute value and the `ng-model` are NOT the same thing. The value from `google-places-autocomplete` is an object returned from Google Maps with all the components and information for the selected Place. 

The input field's `ng-model` does not automatically update when a Place is selected. It only contains the initial text that the user began typing before they selected a Place from the autocomplete. You may therefore wish to `$watch` the place object for changes and update the `ng-model` accordingly, if necessary for your purposes.