Router.configure({
	layoutTempalte: 'layout',
	waitOn: function() { 
		return Meteor.subscribe('clients');
	}
});

Router.map(function(){

	// client list (active clients)
		this.route('clientsList', { 
			path: '/'
		});


	// single client page - clientSingle
		this.route('clientPage', { 
			path: '/client/:_id',
			waitOn: function() { },
			data: function() { 
				return Clients.findOne(this.params._id); 
			}
		});

});