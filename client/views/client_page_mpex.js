
// Below is the only way I seem to be able to make
// sure that the {{title}} variables are in place 
// to run jquery on the data

// Note that it is just as efficient to use one
// template rather than embed an additional template

Template.clientPageEx.rendered = function() {
	console.log("clientpageEx rendered =  \"" + this.$("h1").text() + "\"" );

	Meteor.setTimeout(function() {
		console.log("clientpageEx #2 rendered");
		console.log("clientpageEx #2 copy = \"" + this.$("h1").text() + "\"" );
	}, 300);

}

Template.clientDetailsEx.rendered = function() {
	console.log("clientDetailsEx rendered");
	console.log("clientDetailsEx copy = \"" + this.$(".details").text() + "\"" );

	Meteor.setTimeout(function() {
		console.log("clientDetailsEx #2 rendered");
		console.log("clientDetailsEx #2 copy = \"" + this.$(".details").text() + "\"" );
	}, 300);

}

Template.clientPageEx.destroyed = function() {
	delete(Template.clientDetailsEx.rendered);
}
