let synthesis = {};

(function() {
	'use strict';
	
	// Speech synthesis.
	let speechSynthesis;
	// Message.
	let message;
	
	synthesis.initialize = function() {
		// Is synthesizer available.
		if (!window.speechSynthesis) {
			return;
		}
		
		// Get speech synthesis.
		speechSynthesis = window.speechSynthesis;
		
		// Create and configure base message.
		message = new SpeechSynthesisUtterance();
		message.lang = languages.selected.code;
		// When the message is finished.
		message.onend = function(event) {
			// Enable new speech recognition again.
			recognition.enable();
		};
		// On language change.
		$('#languages').on('change', function(event, language) {
			message.lang = language.code;
		});
		
		// On processor end.
		$('#processor').on('end', function(event, transcript) {
			message.text = transcript;
			speechSynthesis.speak(message);
		});
	};
}());

$(document).ready(function(event) {
	synthesis.initialize();
});