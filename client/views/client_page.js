
// this will output the correct {{title}} variable on the 
// first load from the previous page 
// however if you refresh the single client page
// the {{title}} variable will not work
Template.clientPage.rendered = function() {
	// {{title}} is never loaded before rendered is called
	console.log("clientPage H1: " + this.$("h1").text());

	// {{title}} is never loaded before rendered is called
	console.log("clientPage H2: " + this.$("h2").text());
}

// the output for the {{title}} variable for this will never
// work either
// One interesting note is that this rendered callback fires
// before it's parent "clientPage"
Template.clientDetails.rendered = function() {
	console.log("clientDetails " + this.$(".details").text());
}