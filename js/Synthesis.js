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
		// When the message is finished.
		message.onend = function(event) {
			recognition.enable();
		};
		// When the language is changed.
		languages.onchange.push(function(language) {
			message.lang = language.code;
		});
		
		// On processor end.
		processor.onend.push(function(transcript) {
			message.text = transcript;
			speechSynthesis.speak(message);
		});
	};
}());

$(document).ready(function(event) {
	synthesis.initialize();
});