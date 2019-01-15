/* Homeowner Inventory
 * Author: bhuelga
 */

class InventoryArea {
	
	constructor() {
		this.inventory = $('#inventory');
		this._initialize();
		this._setEventListeners();
	}

	_setEventListeners() {
		// favorites and unfavorites a property
		$('.favorite-star').click(function() {
			const curr = $(this).html();
			if (curr === 'star')
				$(this).html('star_border');
			else
				$(this).html('star');
		});

		// shows and hide details of house
		$('.inv-details-button').click(function() {
			const detailsDocument = $(this).parents('.inventory-selection').next('.property-details-document');
			$('#inventory .property-details-document').not(detailsDocument).slideUp();
			detailsDocument.slideToggle();

			if ($(this).hasClass('expanded'))
				$(this).html('Details');
			else
				$(this).html('Less Details');
			$(this).toggleClass('expanded');
		});
	}

	_initialize() {
		const inventory = localData['agent-data']['collection'];
		for (let home of inventory) {
			$('#inventory').append(this._makeInventorySelection(home));
			$('#inventory').append(makePropertyDetailsDocument(home, false));
		}
	}

	/* Make Inventory Selection 
	 * ------------------------
	 * Makes item of the inventory.
	 * @param home object : object containing data about the property
	 * @return JQObject : item of the inventory
	 */
	_makeInventorySelection(home) {
		let div = $('<div class="inventory-selection"></div>');
		let photo = $('<div class="inventory-photo"></div>');
		photo.append($('<div class="status ' + home['status'] + '-color">' + INVENTORY_STATUSES[home['status']] + '</div>'));
		photo.append($('<i class="material-icons favorite-star">star_border</i>'));
		photo.css('background-image', 'url(' + home['image'][0] + ')');
		div.append(photo);

		let info = $('<div class="inventory-info"></div>');
		let line1 = $('<div class="inv-line-1"></div>');
		line1.append($('<span class="inv-address">' + home['address'] +  ', ' + home['city'] + ' ' + home['zipcode'] + '</span>'));
		info.append(line1);
		let location = $('<div class="inv-location"></div>');
		location.append($('<span><strong>Cross Street: </strong>' + home['xst'] + '</span>'));
		location.append($('<span><strong>Listing Area: </strong>' + home['mls-area'] + '</span>'));
		info.append(location);
		let line2 = $('<div class="inv-line-2"></div>');
		line2.append($('<span class="inv-listing-price"><strong>List Price: </strong>$' + home['list-price'].toLocaleString() + '</span>'));
		line2.append($('<span class="inv-dom"><strong>Days On Market: </strong>' + home['dom'] + '</span>'));
		info.append(line2);
		let line3 = $('<div class="inv-line-3"></div>');
		line3.append($('<div class="inv-orig-price">Original Price: $' + home['original-price'].toLocaleString() + '</div>'));
		if (home['status'] == 'sold') line3.append($('<span class="inv-sale-date"><strong>Sale Date: </strong>' + home['sale-date'] + '</span>'));
		info.append(line3);
		info.append($('<div class="inv-beds"><strong>Beds: </strong>' + home['beds'] + '</div>'));
		let bathDiv = $('<div></div>');
		bathDiv.append($('<span class="inv-full-baths"><strong>Full Baths: </strong>' + home['full-baths'] + '</span>'));
		bathDiv.append($('<span class="inv-half-baths"><strong>&nbsp;&nbsp;&nbsp; Half Baths: </strong>' + home['half-baths'] + '</span>'));
		info.append(bathDiv);
		info.append($('<div class="inv-sqft">' + home['sqft'] + ' Sq Ft</div>'));
		info.append($('<div class="inv-lot-size"><strong>Lot Size: </strong>' + home['lot-size-sqft'] + ' Sq Ft &nbsp;/&nbsp;' + home['lot-size-acres'] + ' Acres</div>'));
		info.append($('<div class="inv-garage"><strong>Garage Spaces: </strong> ' + home['garage-spaces'] + '</div>'));
		info.append($('<div class="inv-stories"><strong>Stories: </strong> ' + home['stories'] + '</div>'));
		info.append($('<div class="inv-view"><strong>View: </strong> ' + home['view'] + '</div>'));
		info.append($('<div class="inv-build"><strong>Year Built: </strong> ' + home['year-built'] + '</div>'));
		div.append(info);

		let actions = $('<div class="inventory-actions"></div>');
		actions.append($(`<div class="inv-button-container">
							<button class="inv-view-map-button">Map</button>
			 			  	<button class="inv-video-button">Video</button>
			 			  	<button class="inv-print-button">Print</button>
						  	<button class="inv-share-button">Share</button>
						  	<button class="inv-details-button">Details</button>
						</div>`));
		actions.append($('<div class="ho-comment-title">Have a question or comment? <strong>Ask <span class="insert-agent-first-name"></span> below:</strong></div>'))
		actions.append($('<textarea class="ho-comment"></textarea><button>Send</button>'))
		div.append(actions);

		return div;
	}



}