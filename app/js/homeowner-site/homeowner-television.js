/* Homeowner Television
 * Author: bhuelga
 */

class HomeownerTelevision {
	
	constructor() {
		this.television = $('#tv');
		this.pmaChannel = new PMAChannel();
		this.collectionChannel = new CollectionChannel();
		this._initialize();
		this._setEventListeners();
	}

	_setEventListeners() {
		// expands TV
		$('#tv').click(function() {
			$('#channel-menu').addClass('collapsed');
			$('#agent-info').addClass('collapsed');
			$('#main-container').addClass('expanded');
			$('#tv-container').addClass('expanded');
		});

		// contracts TV
		$('#contract-button').click(() => {
			this.collectionChannel.contractDetails();
			$('#channel-menu').removeClass('collapsed');
			$('#agent-info').removeClass('collapsed');
			$('#main-container').removeClass('expanded');
			$('#tv-container').removeClass('expanded');
		});
	}

	_initialize() {
		$('.tv-channel').hide();
		$('#collection-channel').show();
	}

	/*   PUBLIC    */

	/* Set Channel
	 * -----------
	 * Changes the channel of the central TV.
	 */
	setChannel(channelID, expandable) {
		$('.tv-channel').hide();
		$('#' + channelID).show();
		$('#tv-container').toggleClass('expandable', expandable);
		$('#homewatch-tv').css('font-size', '.62rem');
		setTimeout(function() {$('#homewatch-tv').css('font-size', '.6rem');}, 200);
	}


}