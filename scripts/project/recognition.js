let recognition = {};

(function() {
	'use strict';
	
	// Whether to enable the recognition.
	let enabled = false;
	
	// Webkit reference.
	let speechRecognition;
	// Most recent transcript.
	let transcript;
	// Most recent transcript, still possible to change.
	let transcript_interim;
	
	// Configures the speech recognition API.
	recognition.initialize = function() {
		if (!('webkitSpeechRecognition' in window)) {
			console.error('webkitSpeechRecognition not available.');
			return;
		}
		
		// Sets up webkit.
		speechRecognition = new webkitSpeechRecognition();
		speechRecognition.interimResults = true; // onresult will also contain non-final text.
		
		// On start
		speechRecognition.onstart = function() {
			console.log('recognition start');
		};
		// On end
		speechRecognition.onend = function() {
			console.log('recognition end: ' + transcript);
			// Trigger end event.
			$('#speech').trigger('end', transcript);
		};
		// On error
		speechRecognition.onerror = function(event) {
			console.log('recognition error');
			if (event.error == 'no-speech') {
				console.error('no speech');
			}
			if (event.error == 'audio-capture') {
				console.error('no microphone');
			}
			if (event.error == 'not-allowed') {
				console.error('not allowed');
			}
		};
		// On result
		speechRecognition.onresult = function(event) {
			console.log('recognition result');
			// Clears interim transcript.
			transcript_interim = '';
			// Loop through results
			for (let i = event.resultIndex; i < event.results.length; i++) {
				// If result is final or interim.
				if (event.results[i].isFinal) {
					transcript += event.results[i][0].transcript;
				}
				else {
					transcript_interim += event.results[i][0].transcript;
				}
			}
			
			// Trigger result event.
			$('#speech').trigger('result', transcript, transcript_interim);
		};
		
		// On language change.
		$('#languages').on('change', function(event, language) {
			speechRecognition.lang = language.code;
		});
		
		// Start recording on button click.
		$('#record').on('click', function(event) {
			// If disabled return.
			if (!enabled) {
				return;
			}
			recognition.disable();
			
			transcript = '';
			speechRecognition.start();
		});
		
		// After initialization enable.
		recognition.enable();
	};
	
	recognition.enable = function() {
		enabled = true;
	};
	
	recognition.disable = function() {
		enabled = false;
	}
}());

$(document).ready(function(event) {
	recognition.initialize();
});