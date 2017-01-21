import { Template } from 'meteor/templating';
import { TablesCollection } from '/api/TablesCollection';
import { User } from '/api/User';

import './mainPage.html';


Template.mainPage.events({
	"click #join-us-button": function(){
		//Session used to redirect link to other webpages
		User.update({_id:User.findOne({checkValue: 1})['_id']},{$set:{
			telegramID : $("#telegramID").val(),
		}});
		Session.set("templateName", "tablesPage");
	},
});

Template.tableInfo.helpers({

	HTMLTablesCollection: function(){
		return TablesCollection.find({}).fetch();
	},

});

