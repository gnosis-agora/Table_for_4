import { Template } from 'meteor/templating';
import { TablesCollection } from '/api/TablesCollection';
import { User } from '/api/User';

import './tablesPage.html';

var chosenLocation = "";
var chosenTiming = "";
var currUser = {};

Template.tablesPage.onRendered(function () {
	// forces web page to always stay on top
    $(document).ready(function(){
    	$(this).scrollTop(0);
	});
});

Template.tablesPage.events({
	"click #test-button": function(){
		//Session used to redirect link to other webpages
		Session.set("templateName", "mainPage");
	},
});

Template.welcomeMessage.helpers({
	telegramID : function() {
		currUser = User.find({}).fetch()[0]
		return currUser.telegramID;
	}
});


Template.locationDropDown.helpers({
	locations: function() {
		return [
			{locationID : 'Yusof-Ishak-House', locationName: 'Yusof Ishak House'},
			{locationID : 'Utown-Food-Clique', locationName: 'Utown Food Clique'},
			{locationID : 'Techno-Edge', locationName: 'Techno Edge'},
			{locationID : 'The-Terrace', locationName: 'The Terrace'},
			{locationID : 'The-Deck', locationName: 'The Deck'},
			{locationID : 'The-Frontier', locationName: 'The Frontier'},
			{locationID : 'The-Hwangs', locationName: "The Hwang's"},
			{locationID : 'Alcove', locationName: 'Alcove'},
			{locationID : 'Utown-Pizza-Hut', locationName: 'Utown Pizza Hut'},
			{locationID : 'Platypus-Food-Bar', locationName: 'Platypus Food Bar'},
		];
	},
});

Template.locationDropDown.events({
	"click .location-buttons": function(e){
		$('.location-buttons').not(this).removeClass('active');   
		$("#"+this.locationID).toggleClass("active");
		chosenLocation = this.locationID
;	}
});

Template.timingDropDown.helpers({
	timings: function(){
		return [
			{timingID: 'time-06-07', timingName: "6am to 7am"},
			{timingID: 'time-07-08', timingName: "7am to 8am"},
			{timingID: 'time-08-09', timingName: "8am to 9am"},
			{timingID: 'time-09-10', timingName: "9am to 10am"},
			{timingID: 'time-10-11', timingName: "10am to 11am"},
			{timingID: 'time-11-12', timingName: "11am to 12pm"},
			{timingID: 'time-12-13', timingName: "12pm to 1pm"},
			{timingID: 'time-13-14', timingName: "1pm to 2pm"},
			{timingID: 'time-14-15', timingName: "2pm to 3pm"},
			{timingID: 'time-15-16', timingName: "3pm to 4pm"},
			{timingID: 'time-16-17', timingName: "4pm to 5pm"},
			{timingID: 'time-17-18', timingName: "5pm to 6pm"},
			{timingID: 'time-18-19', timingName: "6pm to 7pm"},
			{timingID: 'time-19-20', timingName: "7pm to 8pm"},
			{timingID: 'time-20-21', timingName: "8pm to 9pm"},
		];
	},
});

Template.timingDropDown.events({
	"click .timing-buttons": function(){
		$('.timing-buttons').not(this).removeClass('active');   
		$("#"+this.timingID).toggleClass("active");
		chosenTiming = this.timingID;
	}
});
