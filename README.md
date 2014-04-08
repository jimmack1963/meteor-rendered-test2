meteor-rendered-test2
=====================

Further explaining my problems and lack of understanding of Meteor 0.8.0 Template.rendered function. There doesn't seem to be a callback for when data is finally loaded into a template. This repo is just trying to simplify my problem and find a solution. 

### Using Template._TemplateName_.rendered inside an {{#each}} block
The following seems to work according to the new Blaze documentation and the porting examples given here: https://github.com/meteor/meteor/wiki/Using-Blaze#rendered-callback-only-fires-once

/client/views/client_list.html
```
<template name="clientsList">
	<h1>Clients List</h1>
	<ul>
		{{#each clients}}
			{{> clientItem}}
		{{/each}}
	</ul>
</template>

<template name="clientItem">
	<li><a href="{{pathFor 'clientPage'}}">{{title}}</a></li>
</template>
```

/client/views/client_list.js
```
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
```


### Using Template._TemplateName_.rendered in a basic single item template

The following shows the problems I am having loading in data. In this example at no point is the {{title}} variable available to the jQuery when the Template._TemplateName_.rendered is fired.

/client/views/client_page.html
```
<template name="clientPage">
	<h1>{{title}}</h1>
	<h2>{{> clientDetails}}</h2>
	<p><a href="{{pathFor 'clientsList'}}">back to client list</a></p>
</template>

<template name="clientDetails">
	<span class="details">details: {{title}}</span>
</template>
```

/client/views/client_page.js
```
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
```








