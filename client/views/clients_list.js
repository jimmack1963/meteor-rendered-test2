Template.clientsList.helpers({
	clients: function(){
		return Clients.find({}, {sort: {title: 1}});
	}
});


// never outputs the {{title}} variable correctly
Template.clientsList.rendered = function() {
	// obviously this always works as the content is static
	console.log("clientsList " + this.$("h1").text());

	// I guess it makes sense this doesn't work according to 
	// meteorpedia.com http://www.meteorpedia.com/read/Blaze_Notes
	// "New Rendered behaviour with external scripts e.g. jQuery"
	console.log("clientsList - items " + this.$("li:eq(0)").text());
}

// always outputs the {{title}} variable correctly
Template.clientItem.rendered = function() {
	console.log("clientItem " + this.$("li").text());
}