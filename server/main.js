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

  	// -------------- Start Telegram Bot ------------------
    TelegramBot.token = '309396508:AAHdsqT9dlHFxdYl3QIoo0W2FTjuooPAJG8';

    TelegramBot.start();

    TelegramBot.addListener('/start', function(command, username, original) {
    	TelegramBot.send("Hi " + original.chat.first_name + "!", original.chat.id);
    	TelegramBot.send("While you are waiting for more people to join your table, you can type /leave to leave the table.", original.chat.id);

        var activeTables = TablesCollection.find({}).fetch();
        for (var x=0; x<activeTables.length; x++){
			var table = activeTables[x];

			// Add user's chatID into collection. So that we can send them messages later.
			if (table.chatIDs) {
				table.chatIDs.push(original.chat.id);
			} else {
				table.chatIDs = [original.chat.id];
			}

			TablesCollection.upsert(table._id, {$set: {chatIDs: table.chatIDs}});


			for (var i = 0; i<table.occupants.length; i++) {
				if (table.occupants[i] === username) {	
					if (table.occupants.length < 4) {
						;
					} else {
						TelegramBot.send("Please wait while more people join your table!", original.chat.id);
					}
				}
			}
		}
		Meteor.call('addedUserToTableAlert', username, table._id);
		if (table.occupants.length === 4) {
			Meteor.call('tableIsFullAlert', table._id);
		}
    });
    TelegramBot.addListener('/leave', function(command, username, original) {
		var activeTables = TablesCollection.find({}).fetch();
        for (var x=0; x<activeTables.length; x++){
			var table = activeTables[x];

			for (var i = 0; i<table.occupants.length; i++) {
				if (table.occupants[i] === username) {	
					var newOccupants = table.occupants;
					newOccupants.splice(i, 1);
					TablesCollection.update(table._id, {$set: {occupants: newOccupants}});
				}
			}
		}
		TelegramBot.send("You have been removed from the table. Visit again soon!", original.chat.id);
    });
    TelegramBot.addListener('/status', function(command, username, original) {
	    TelegramBot.send("Here are your current table-mates", original.chat.id);
	    var activeTables = TablesCollection.find({}).fetch();
	    for (var x=0; x<activeTables.length; x++){
			var table = activeTables[x];

			for (var j = 0; j < table.occupants.length; j++) {
				if (table.occupants[j] === username) {
					var tableMates = [];
					table.occupants.forEach(function(tableMate) {
						if (tableMate != username) {
							tableMates.push(tableMate);
						}
					});
					tableMates.forEach(function(tableMate) {
					TelegramBot.send("@" + tableMate, original.chat.id);
					});
				}
			};
	  	}
    });
});

Meteor.methods({
	addedUserToTableAlert: function (username, tableID) {
	    var activeTables = TablesCollection.find({}).fetch();
	    for (var x=0; x<activeTables.length; x++){
			var table = activeTables[x];
			for (var i = 0; i<table.occupants.length; i++) {
				if (table.occupants[i] === username) {
					table.chatIDs.forEach(function(chatID) {
						TelegramBot.send("@" + username + " has joined your table!", chatID);
					});
				}
				break;
			}
	  	}
	},
	tableIsFullAlert: function (tableID) {
		var table = TablesCollection.findOne({_id:tableID});
		console.log(table);
		table.chatIDs.forEach(function(chatID) {
			var chatInfo = TelegramBot.method("getChat", {"chat_id": chatID});
			var username = chatInfo.result.username
			var firstName = chatInfo.result.first_name

			var tableMates = [];
			table.occupants.forEach(function(tableMate) {
				if (tableMate != username) {
					tableMates.push(tableMate);
				}
			});	
			TelegramBot.send("Thank you for your patience " + firstName + "! Your table-mates are @" + tableMates[0] + ", @" + tableMates[1] + ", and @" + tableMates[2]  + ". Enjoy your meal!", chatID);
		});
	},
});