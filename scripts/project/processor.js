let processor = {};

(function() {
	'use strict';
	
	processor.initialize = function() {
		// On speech end.
		$('#speech').on('end', function(event, transcript) {
			$('#processor').trigger('end', transcript);
		});
	};
}());

$(document).ready(function(event) {
	processor.initialize();
});