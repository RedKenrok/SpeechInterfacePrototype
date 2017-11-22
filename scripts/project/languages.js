let languages = {
	// Selected lanuage data.
	selected: {
		name: 'English (Great Britain)',
		name_en: 'English (United Kingdom)',
		code: 'en-GB'
	}
};

(function() {
	'use strict';
	
	// Template for language option.
	const template = `<li></li>`;
	// Currently selected element.
	let selectedElement;
	
	languages.initialize = function() {
		// Add input event to search bar.
		$('#languages > input').on('change', function() {
			let query = $(this).val().toLowerCase();
			let element;
			$('#languages > ul > li').each(function(i, object) {
				element = $(this);
				// Select based on name, name_en, and code.
				element.css('display', (query === '' || element.attr('data-name').toLowerCase().indexOf(query) >= 0 || element.attr('data-name_en').toLowerCase().indexOf(query) >= 0 || element.attr('data-code').toLowerCase().indexOf(query) >= 0) ? 'block' : 'none');
			});
		});
		
		// Get languages data.
		jsonUtil.load(window.location + '/data/languages.json', function(data) {
			// Create language list.
			let list = $('#languages > ul');
			data.forEach(function(language) {
				// Create language option.
				let element = $($.parseHTML(template));
				element.attr({
					'data-name': language.name,
					'data-name_en': language.name_en,
					'data-code': language.code
				});
				element.text(language.name);
				list.append(element);
				
				// Select default language.
				if (language.code === languages.selected.code) {
					selectedElement = element;
					selectedElement.attr('selected', true);	
				}
			});
			
			// Add clickable event foreach language option.
			list.find('> li').on('click', function(event) {
				event.preventDefault();
				// Compare selection to current.
				if ($(this) === selectedElement) {
					return;
				}
				// Reset previously selected element.
				if (selectedElement) {
					selectedElement.removeAttr('selected');	
				}
				// Set-up currently selected element.
				selectedElement = $(this);
				selectedElement.attr('selected', true);
				// Store selection data.
				languages.selected = {
					name: selectedElement.attr('data-name'),
					name_en: selectedElement.attr('data-name_en'),
					code: selectedElement.attr('data-code')
				};
				// Trigger change event.
				$('#languages').trigger('change', languages.selected);
			});
		});
	};
}());

$(document).ready(function(event) {
	languages.initialize();
});