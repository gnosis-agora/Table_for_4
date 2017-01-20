import { Template } from 'meteor/templating';

import './main.html';


Template.tableInfo.helpers({
	myCollection : function(){
		return [
			{text: "hello"},
			{text: "world"},
			{text: "this is a test"},
		];
	},

	mySettings : function(){
		return {
			showFilter : false, 
			showNavigationRowsPerPage : false,
			showNavigation: 'never',
			fields: [
				{key: 'text', label: "random text", sortable: false}
			]
		};
	},


});