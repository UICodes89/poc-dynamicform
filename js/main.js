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
			  url: "form.json",
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

	function buildElement(data){
		//form element
		$.each(data, function(key, value){
          if(typeof this !== "object"){
            var element,
            	div = divInline();
                if(value === true || value === false){
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
                }else{
                	element = createInput();
                	element.name=key;
                	div.append(element);
            	 	div.find('label').append(key)
                }
                form.append(div);
          }else if(typeof this == "object"){
          		var div = $("<div/>"),
          		p = $("<p/>");
          			div.addClass('col-sm-12 block-of-element');
          			p.append(key);
          			div.append(p);
          			form.append(div); 
          			$.each(this[0], function(key, value){
          				var element = createInput(),
          					divNew = divInline();
          					element.name=key; 
		            	 	divNew.append(element);
		            	 	divNew.find('label').append(key)
			            	div.append(divNew);

          			});
          }else if(Object.keys(this).length > 0){
          	var div = $("<div/>"),
          		p = $("<p/>");
          			div.addClass('col-sm-12 block-of-element');
          			p.append(key);
          			div.append(p);
          			form.append(div); 
          			$.each(this, function(key, value){
          				var element = createInput(),
          					divNew = divInline();
          					element.name=key; 
		            	 	divNew.append(element);
		            	 	divNew.find('label').append(key)
			            	div.append(divNew);

          			});         			
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