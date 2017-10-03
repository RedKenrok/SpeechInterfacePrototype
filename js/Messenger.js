let messenger = {};

(function() {
	'use strict';
	
	// Message list item template.
	const template = '<li><div></div></li>';
	// Messenger of self element.
	let element = null;
	
	messenger.initialize = function() {
		// Get messenger.
		let messenger = $('#messenger');
		
		// From recognizer.
		recognition.onresult.push(function(transcript, transcript_interm) {
			if (element === null) {
				let elementTemp = $($.parseHTML(template));
				elementTemp.addClass('self');
				messenger.append(elementTemp);
				
				element = elementTemp.find('div');
			}
			
			element.text(transcript);
			if (transcript_interm !== '') {
				element.append('<span class="interm">' + transcript_interm + '</span>');
			}
		});
		recognition.onend.push(function(transcript) {
			element.text(transcript);
			element = null;
		});
		
		// From processor.
		processor.onend.push(function(transcript) {
			let elementTemp = $($.parseHTML(template));
			elementTemp.addClass('other');
			$(elementTemp).find('div').text(transcript);
			messenger.append(elementTemp);
		});
	};
}());

$(document).ready(function(event) {
	messenger.initialize();
});