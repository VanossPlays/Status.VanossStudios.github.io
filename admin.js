(function(){
	$("#time_input").flatpickr({enableTime:true, minDate: "today",time_24hr:true, onChange: function(date, dateStr, instance) {
    	$("#time_input_js").val(date[0].toISOString());
	}});
	$("#end_time").flatpickr({enableTime:true, minDate: "today",time_24hr:true, onChange: function(date, dateStr, instance) {
	    $("#end_time_js").val(date[0].toISOString()); // iso date str
	}});


	var classes = ["panel panel-danger", "panel panel-warning", "panel panel-primary", "panel panel-success"];
	var icons = ["fa fa-times", "fa fa-exclamation", "fa fa-info", "fa fa-check"];

	$("body").on("change","#new-incident select", function(){
		var val = parseInt($(this).val()); //this should make exploitation harder

		$("#new-incident .panel.new .panel-heading i").get(0).className = icons[val];
		$("#new-incident .panel.new").get(0).className = classes[val] + " new";
		$("#time_input").val("");
		$("#end_time").val("");
	});

	$("#new-incident select").trigger("change");

	$("body").on("submit","#new-incident",function(){
		var time = Date.parse($("#time_input").val());
		var end_time = Date.parse($("#end_time").val());
		var type = $("#type").val() || 0;

		if (parseInt(type) === 2 &&(isNaN(time) || isNaN(end_time)))
		{
			if (isNaN(end_time))
			{
				$("#time_input").addClass("error");	
				$.growl.error({ message: "Start time is invalid!" });
			}
			
			if (isNaN(end_time))
			{
				$("#end_time").addClass("error");
				$.growl.error({ message: "End time is invalid!" });	
			}
			return false;	
		}
		else if (parseInt(type) === 2 && time >= end_time)
		{
			$.growl.error({ message: "End time is either the same or earlier than start time!" });
			$("#time").addClass("error");
			$("#end_time").addClass("error");
			return false;	
		}

		if($("#status-container :checkbox:checked").length === 0)
		{
			$.growl.error({ message: "Please check at least one service!" });
			$("#status-container").addClass("error");
			return false;
		}
	});
})();
    
