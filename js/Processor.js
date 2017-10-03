let processor = {
	// On end event.
	onend: []
};

(function() {
	'use strict';
	
	processor.initialize = function() {
		// On end of the recognizer.
		recognition.onend.push(function(transcript) {
			processor.onend.forEach(function(event) {
				event(transcript);
			});
		});
	};
}());

$(document).ready(function(event) {
	processor.initialize();
});