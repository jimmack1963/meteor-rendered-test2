meteor-rendered-test2
=====================

Further explaining my problems and lack of understanding of Meteor 0.8.0 Template.rendered function. There doesn't seem to be a callback for when data is finally loaded into a template. This repo is just trying to simplify my problem and find a solution. Please feel free to let me know if I am doing something stupid or not using "best practices" in any way as I am still pretty new to application development and Meteor development.

It does look like there is some attention to this problem there is now an issue logged on the main Meteor repo (https://github.com/meteor/meteor/issues/2010). Also, I have seen several Meteor Google Groups and Stack Overflow threads about this issue.

* [[0.8.0] How to update DOM after every data change without rendered event?](https://groups.google.com/forum/#!topic/meteor-talk/w9oxqdUs-pA)
* [Issue with meteor rendered callback](https://groups.google.com/forum/#!topic/meteor-talk/nol-6nDxUJg)
* [rendered called before DOM completion - meteor blaze](https://groups.google.com/forum/#!topic/meteor-talk/47Orrrz7kjg)
* [How do I use X-editable on dynamic fields in a Meteor template now with Blaze?](http://stackoverflow.com/questions/22867690/how-do-i-use-x-editable-on-dynamic-fields-in-a-meteor-template-now-with-blaze)


### Examples and Explanations

#### Using Template._TemplateName_.rendered inside an {{#each}} block
The following seems to work according to the new Blaze documentation and the porting examples given here: https://github.com/meteor/meteor/wiki/Using-Blaze#rendered-callback-only-fires-once

**/client/views/client_list.html**
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

**/client/views/client_list.js**
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


#### Using Template._TemplateName_.rendered in a basic single item template

The following shows the problems I am having loading in data. In this example at no point is the {{title}} variable available to the jQuery when the Template._TemplateName_.rendered is fired.

**/client/views/client_page.html**
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

**/client/views/client_page.js**
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


#### Workaround for using Template._TemplateName_.rendered in a basic single item template

The following show the only way I was able to reliable use the {{title}} variable. By using a setTimeout there is enough time for the data to be loaded into the template. This seems like a really unfortunate method for ensuring data is loaded into a template.

**/client/views/client_page_mpex.html**
```
<template name="clientPageEx">
	<h1>{{title}}</h1>
	<h2>{{> clientDetailsEx}}</h2>
	<p><a href="{{pathFor 'clientsList'}}">back to client list</a></p>
</template>

<template name="clientDetailsEx">
	<span class="details">details: {{title}}</span>
</template>
```

**/client/views/client_page_mpex.js**
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








