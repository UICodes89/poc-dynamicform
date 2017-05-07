"use strict";
var App= App || {};
(function(App, $){
	if($==="undefined")
		return;
	var jsonObject,
	    form = $('form.dynamic-fields'),
	    submitBtn = $('<button/>');


	function getJson(){
     	var request = $.ajax({
			  url: "https://api.myjson.com/bins/j2cip",
			  method: "GET",
			  dataType: "json"
			});
			 
			request.done(function( msg ) {
			  buildElement(msg);
			});
			 
			request.fail(function( jqXHR, textStatus ) {
			  alert( "Request failed: " + textStatus );
			});
	}

	function createInput(){
        //create Input
        var input = document.createElement("input");
        return input;
	}
	function divInline(){
		var div = $("<div/>");
		div.append("<label/>");
		div.addClass('col-sm-6');
		div.find('label').addClass('col-sm-12');
		return div;
	}
	function createRadio(name, value){
		//create Radio Button
		var radio;
		if(value){
			radio = $('<input/>').attr('type', 'radio').attr('name', name).attr('checked', 'checked');
		}else{
			radio = $('<input/>').attr('type', 'radio').attr('name', name)
		}
		
        return radio;
	}

	function createCheckbox(){
		//create checkbox
	}

	function createSelect(){
		//create selectfield
	}

	function stringType(key, value){
			var element,
            		div = divInline();
                	element = createInput();
                	element.name=key;
                	div.append(element);
            	 	div.find('label').append(key);            
                	form.append(div);
	}

	function booleanType(key, value){
       var element,
            	div = divInline();
                
                	var radio1 = createRadio(key, value);
                	var radio2 = createRadio(key, false);
                	var span = $("<span/>");
                	var span1 = $("<span/>");
                	div.find('label').append(key);
                	span.append('Yes');
                	span.append(radio1);
                	div.append(span);
                	span1.append('No');
                	span1.append(radio2);
                	div.append(span1);
                	form.append(div);
	}

	function objectType(key, value, obj){
		var div = $("<div/>"),
      		p = $("<p/>");
      			div.addClass('col-sm-12 block-of-element');
      			p.append(key);
      			div.append(p);
      			form.append(div); 
      			$.each(obj, function(key, value){
      				var element = createInput(),
      					divNew = divInline();
      					element.name=key; 
	            	 	divNew.append(element);
	            	 	divNew.find('label').append(key)
		            	div.append(divNew);
		            	form.append(div);

      			});
	}

	function arrayType(key, value, obj){
		var div = $("<div/>"),
			      		p = $("<p/>");
			      			div.addClass('col-sm-12 block-of-element');
			      			p.append(key);
			      			div.append(p);
			      			form.append(div);
          	       var items = obj;
          			$.each(items, function(key, value){
          				if(typeof this === 'object'){
          					buildElement(this);
          				}else if(typeof this === "string"){
 							stringType(key, value);
          				}else if(typeof value === "boolean"){
          					booleanType(key, value);
          				}else if(typeof this == "object" && !Array.isArray(this)){
          					objectType(key, value, this);
          				}else if(Array.isArray(obj)){
          					arrayType(key, value, this);
          				}
			           
          			});
	}

	function buildElement(data){
		//form element
		
		$.each(data, function(key, value){
			
          if(typeof this === "string"){
           		stringType(key, value);
          }else if(typeof value === "boolean"){
          	 booleanType(key, value);
                
          }else if(typeof this == "object" && !Array.isArray(this)){
          		objectType(key, value, this);
          }else if(Array.isArray(this)){
          	      arrayType(key,value, this);     

           }
		});
		var buttonDiv = $("<div/>").addClass('col-sm-7')
		buttonDiv.append(submitBtn.addClass('btn btn-primary btn-lg btn-block').prop('type','submit').html('submit'));
		form.append(buttonDiv);
	}


	App.init= function(){
		getJson();
	}
	

})(App, $);

$(document).ready(function(){ 	
	App.init(); //initialize your app
});