meteor-rendered-test2
=====================

Further explaining my problems and lack of understanding of Meteor 0.8.0 Template.rendered function. There doesn't seem to be a callback for when data is finally loaded into a template. This repo is just trying to simplify my problem and find a solution. 

## Using Template._TemplateName_.rendered inside an {{#each}} block
The following seems to work according to the new Blaze documentation and the porting examples given here: https://github.com/meteor/meteor/wiki/Using-Blaze#rendered-callback-only-fires-once

client/views/client_list.html
```
	<template name="clientsList">
		
		<h1>Clients List</h1>
		
		<ul>
			{{#each clients}}
				{{> clientItem}}
			{{/each}}
		</ul>

	</template>

	<template name="clientDetails">
		<span class="details">details: {{title}}</span>
	</template>
```

client/views/client_list.js
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

