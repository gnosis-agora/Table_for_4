import { Meteor } from 'meteor/meteor';
import { TablesCollection } from '/api/TablesCollection';
import { User } from '/api/User';

Meteor.startup(() => {
	if (User.find().count() == 0){
  		User.insert({
	  		checkValue: 1,
			telegramID : "",
  		});
	}

  	// set telegram token
    TelegramBot.token = '309396508:AAHdsqT9dlHFxdYl3QIoo0W2FTjuooPAJG8';
    console.log(TelegramBot);
    TelegramBot.start(); // start the bot
    // add a listener for '/test'
    TelegramBot.addListener('/test', function(command, username, original) {
        console.log(username);
        console.log(original);
        if(!command[1]) { // if no arguments
            return false
            // if you return false the bot wont answer
        }
        // command[1] will be the first argument, command[2] the second etc
        // below the bot will reply with 'test: hi' if you sent him /test hi
        return "test: " + command[1]
    });

});
