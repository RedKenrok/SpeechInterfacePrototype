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
		
		// On speech result.
		$('#speech').on('result', function(event, transcript, transcript_interm) {
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
		
		// On speech end.
		$('#speech').on('end', function(event, transcript) {
			element.text(transcript);
			element = null;
		});
		
		// On processor end.
		$('#processor').on('end', function(event, transcript) {
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