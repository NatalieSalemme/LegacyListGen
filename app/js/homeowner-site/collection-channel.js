/* Collection Channel
 * Author: bhuelga
 */

class CollectionChannel {
	
	constructor() {
		this.currentScroll = 0;
		this._initialize();
		this._setEventListeners();
	}

	_setEventListeners() {
		// expands and contracts details of collection item
		$('.collection-details-button').click(function() {
			if ($(this).parent().parent().hasClass('expanded'))
				$(this).html('Details');
			else
				$(this).html('View Photos');
			$(this).parent().parent().toggleClass('expanded');
			$(this).parent().parent().siblings('.info-banner').toggleClass('expanded');
		});
	}
		

	_initialize() {
		for (const home of agentData['collection']) {
			$('#collection-list').append(this._makeCollectionItem(home));
		}
		
	}

	/* Make Collection Item
	 * ---------------------
	 * Makes an image and data that goes into the collection channel.
	 * @param home Object : object holding all data about a property
	 * @return JQObject : item to be added to collection channel
	 */
	_makeCollectionItem(home) {
		let item = $('<div class="collection-item"></div>');
		item.css('background-image', 'url(' + home['image'][0] + ')');
		item.append($('<div class="collection-item-status ' + home['status'] + '-color"><div>' + INVENTORY_STATUSES[home['status']] + '</div><div class="collection-item-status-date">List Date: 10/12/18</div></div>'));
		item.append($(`<div class="item-banner info-banner">
							<span class="collection-item-address">` + home['address'] + ', ' + home['city'] + `</span>
					   		<span class="collection-item-price">$` + home['list-price'].toLocaleString() + `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` + home['beds'] + ` bds - ` + home['full-baths'] + ` ba</span>
				   	   </div>`));
		let optionBanner = $('<div class="item-banner option-banner"></div>');
		optionBanner.append(`<div class="option-buttons">
								<button class="collection-map-button">Map</button>
								<button class="collection-video-button">Video</button>
								<button class="collection-details-button">Details</button>
								<button class="collection-contact-button">Have a question or comment on this property?</button>
							</div>`);
		optionBanner.append(makePropertyDetailsDocument(home, true));
		item.append(optionBanner);
		return item;
	}

	/*   PUBLIC    */

	contractDetails() {
		$('.collection-details-button').each(function() {
			$(this).trigger('click');
		})
	}
}