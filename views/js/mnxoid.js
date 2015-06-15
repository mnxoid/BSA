var counter = 4;
			var addItem;
			var original;
		  $(function() {
		    $( "#sortable" ).sortable();
		    $( "#sortable" ).disableSelection();
		    function elemListeners() {
			    $( ".xicon" ).click(function() {
			    	$(this).parent().slideUp(function() {
			    		$(this).remove();
			    	});
			    });
			    $( "#sortable > li").dblclick(function() {
			    	//need to add editing
			    	original = $(this).text();
			    	var id = $(this).find("input").attr("id");
			    	$(this).replaceWith("<li><input class=\"input_field ed_input\" value=\""+ original +"\" /></li>");
			    	Mousetrap(document.querySelector( ".ed_input" )).bind('enter',function(e, combo) {
						$(".ed_input").parent().replaceWith("<li><input id=\""+id+"\" name=\""+id+"\" type=\"checkbox\"><label for=\""+id+"\">"+ $(".ed_input").val() +"</label><img class=\"xicon hide\" src=\"cross.svg\"></li>");
						initChbx();
						elemListeners();
					});
					Mousetrap(document.querySelector( ".ed_input" )).bind('esc',function(e, combo) {
						$(".ed_input").parent().replaceWith("<li><input id=\""+id+"\" name=\""+id+"\" type=\"checkbox\"><label for=\""+id+"\">"+ original +"</label><img class=\"xicon hide\" src=\"cross.svg\"></li>");
						initChbx();
						elemListeners();
					});
			    });
			}
			elemListeners();
			addItem = function() {
				if($(".nameinput").val()==="") return;
				counter++;
		    	var id = "cb" + counter;
		    	$( "#sortable" ).prepend("<li><input id=\""+id+"\" name=\""+id+"\" type=\"checkbox\"><label for=\""+id+"\">"+ $(".nameinput").val() +"</label><img class=\"xicon hide\" src=\"cross.svg\"></li>");
		    	$(".nameinput").val("");
		    	// var checkbxsCheckmark = Array.prototype.slice.call( document.querySelectorAll( 'form.ac-checkmark input[type="checkbox"]' ) );
		    	initChbx();
		    	elemListeners();
			}
		    $( ".addbtn" ).click(function() {
		    	addItem();
		    });
		    $( ".checkbtn" ).click(function() {
		    	if($(this).text()===" Check all ") {
			    	$("input:checkbox:not(:checked)").click();
			    	$(this).text("Uncheck all");
		    	} else {
		    		$("input:checkbox:checked").click();
			    	$(this).text(" Check all ");
		    	}
		    });
		    $( ".clearbtn" ).click(function() {
		    	$("input:checkbox:checked").parent().find(".xicon").click();
		    });
		    $("body").click(function(e) {
		    	if($(e.target).closest("input:text").length==0){
			    	counter++;
			    	var id = "cb" + counter;
			    	$(".ed_input").parent().replaceWith("<li><input id=\""+id+"\" name=\""+id+"\" type=\"checkbox\"><label for=\""+id+"\">"+ original +"</label><img class=\"xicon hide\" src=\"cross.svg\"></li>");
					initChbx();
					elemListeners();
				}
			});
		  });