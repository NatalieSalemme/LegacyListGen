/* Homeowner Site
 * Author: bhuelga
 */

var agentData = localData['agent-data'];

class HomeownerSite {
	constructor() {
		this.homeownerTelevision = new HomeownerTelevision();
		this.inventoryArea = new InventoryArea();
		this._addEventListeners();
		this._initialize();
	}

	_initialize() {
		updateCurrentText();
		this._populateagentData();
	}

	_addEventListeners() {
		// expands welcome to splash screen
		$('#top-bar').click(function() {
			if ($(this).hasClass('expanded'))
				$('#top-bar-overlay').toggle();
			else
				setTimeout(function() {$('#top-bar-overlay').fadeToggle(1000); }, 200);
			$(this).toggleClass('expanded');
		});

		// closes top bar
		$('#top-bar-overlay').click(function() {
			$('#top-bar-overlay').hide();
			$('#top-bar').removeClass('expanded');
		});

		// changes channel on television
		$('.nav-channel').click((e) => {
			$('.nav-channel').removeClass('active');
			$(e.currentTarget).addClass('active');
			const navID = $(e.currentTarget).attr('id');
			const channelID = navID.slice(0, navID.length - 4);
			this.homeownerTelevision.setChannel(channelID + '-channel', EXPANDABLE[channelID]);
			$('html, body').animate({ scrollTop: 0 }, 500);	
		})
		
		// opens contact modal
		$('#contact-button').click(function() {
			$('#contact-modal').fadeIn(300);
			$('#modal-overlay').fadeIn(300);
		});

		// closes modals
		$('#modal-overlay').click(function() {
			$('.modal').fadeOut(300);
			$('#modal-overlay').fadeOut(300);
		});
	}


	/* Populate Agent Info
	 * -------------------
	 * Inputs agent's information into right bar.
	 */
	_populateagentData() {
		$('#agent-photo').css('background-image', 'url(' + agentData['photo'] + ')');
		$('#agent-name').html(agentData['name']);
		$('#agent-title').html(agentData['title']);
		$('#agent-dre').html('DRE#: ' + agentData['dre']);
		$('#agent-phone-number').html(agentData['phone-number']);
		$('#agent-email').html(agentData['email']);
		for (const accolade of agentData['accolades'])
			$('#agent-accolades').append($('<i>' + accolade['name'] + ' - ' + accolade['date'] + '</i>'));
		for (const site in agentData['social-media']) {
			const link = agentData['social-media'][site];
			$('#' + site + '-link').attr('href', link);
		}
	}
}


// Starts Site
$(document).ready(() => {
	const homeownerSite = new HomeownerSite();
});

