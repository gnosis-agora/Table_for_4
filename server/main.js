import { Meteor } from 'meteor/meteor';
import { TablesCollection } from '/api/TablesCollection';
import { User } from '/api/User';

Meteor.startup(() => {
	if (User.find().count() == 0){
  		User.insert({
	  		checkValue: 1,
			name : "",
			mobileNumber : "",
			telegramID : "",
  		});
	}

});
