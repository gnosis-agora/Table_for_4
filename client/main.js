import { Template } from 'meteor/templating';

import './main.html';

Meteor.startup(function () {
	// setting default page upon startup to mainPage
	Session.setDefault("templateName", "mainPage")
});

Template.body.helpers({
  template_name: function(){
    return Session.get("templateName")
  }
});

