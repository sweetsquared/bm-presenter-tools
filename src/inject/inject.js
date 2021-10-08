
chrome.extension.sendMessage({}, function(response) {

	function activateTab(position) {
		const tabs = getTabs()
		
		if ( tabs && tabs[position - 1] ) {
			console.log(tabs[position-1].text)
			tabs[position-1].element.children()[0].click()
		}
	}
	
	function getTabs() {
		const tabs = {}
	
		const regex = /(\w+)/gm;
		$('#clroom-tab-box li').each(function(index) {

			if ( $(this).parent().attr('id') === 'clroom-tab-box' && $(this).attr('id') !== 'clroom-tab-box-add-li' ) { 
				const txt = $(this).text().match(regex)
				if ( txt && Array.isArray(txt) && txt[0] !== '+' ) {
					tabs[index] = {
						text: txt[0].trim(),
						element: $(this)
					}
				}
			}
			
		})

		return tabs
	}

	function mute( value ) {
		if ( value === undefined ) {
			value = $('#mic-status-mute').is(':visible')
		}
		if ( value ) {
			$('#clroom-audio-dropdown-li-unmute').trigger('click')
		} else {
			$('#clroom-audio-dropdown-li-mute').trigger('click')
		}
	}

	function camera(value) {

		if ( value === undefined) {
			value = $('#switch-video').is(':visible')
		}
		if ( value ) {
			// Video is on, turn it off
			$('#switch-video').trigger('click')
		} else {
			// Video is off, turn it on
			$('#cam-status-on').trigger('click')
		}
	}

	function playvideo() {
		const element = $("#mp4-share-container .clroom-video-overlay-play-icon")
		if ( element ) {
			element.trigger('click')
		}
	}

	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		document.addEventListener('keydown', function(event) {
			if ( event.altKey ) {
				// only trigger when using alt
				const key = event.key.toUpperCase()
				switch (key) {
					case '1':
					case '2':
					case '3':
					case '4':
					case '5':
					case '6':
						activateTab(+event.key)
						break;
					case 'M':
						mute()
						break;
					case 'V':
						playvideo()
						break;
					case 'K':
						camera()
						break;
				}
			}
		})

	}
	}, 10);
});