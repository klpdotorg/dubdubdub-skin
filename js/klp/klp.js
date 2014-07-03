var klp = klp || {};

(function(){
	var active_volunteer_step = "date";
	var volunteer_steps;
	var modal_tpl;
	var $modal_wrapper;
	var $modal_overlay;

	var init = function(){
		volunteer_steps = ['date', 'organization', 'opportunities'];
		modal_tpl = swig.compile($("#tpl-volunteer-modal").html());
		$modal_wrapper = $("#modal_wrapper");
		$modal_overlay = $("#modal_overlay");

		// setTimeout(open_modal,1500);
		// open_modal();
	};

	var open_modal = function(e){
		if( $(window).width()<768 ){
			return true;
		}
		e.preventDefault();

		var html = modal_tpl();
		$modal_wrapper.append(html);
		var $modal = $modal_wrapper.find(".modal-volunteer");
		init_modal($modal);

		setTimeout(function(){
			$modal.addClass("show");
			$modal_overlay.addClass("show");
		},0);
	};

	var init_modal = function($modal){
		var $input_data_location = $modal.find( "input[name=data_location]" );
		var $input_data_date = $modal.find( "input[name=data_date]" );
		var $input_data_type = $modal.find( "input[name=data_type]" );

		var $btn_close = $modal.find(".btn-modal-close");
		var $btn_back = $modal.find(".btn-modal-back");
		var $btn_next_step_cal = $modal.find('.btn-next-step-cal');
		var $btn_next_step_org = $modal.find('.btn-next-step-org');
		var $datepicker_input = $modal.find('#datepicker-input');
		var $select_location = $modal.find('#select-location').selectize({onChange: onLocationChange});

		function onLocationChange(value){
			$input_data_location.val(value);
		}

		$datepicker_input.Zebra_DatePicker({
		    always_visible: $modal.find('#datepicker-wrapper'),
		    first_day_of_week: 0,
		    show_clear_date: false,
		    show_select_today: false,
		    disabled_dates: ['1,3,4,5,12,13,14,22,24'],
		    onSelect: onDateSelect,
		    onClear: onDateClear
		});
		var datepicker = $datepicker_input.data('Zebra_DatePicker');

		function onDateSelect(date){
			$input_data_date.val(date);
			$btn_next_step_cal.show();
		}
		function onDateClear(){
			$input_data_date.val("");
			$btn_next_step_cal.hide();
		}

		$btn_next_step_cal.on("click", function(e){
			e.preventDefault();
			active_volunteer_step = "organization";
			show_next_step($modal, active_volunteer_step);
			$btn_back.show();
		});

		$btn_next_step_org.on("click", function(e){
			e.preventDefault();
			active_volunteer_step = "opportunities";
			show_next_step($modal, active_volunteer_step);
			$btn_back.show();
		});

		$btn_close.on("click", function(e){
			e.preventDefault();

			$modal.removeClass("show");
			$modal_overlay.removeClass("show");
			
			setTimeout(function(){
				$modal.remove();
			},300);
		});

		$btn_back.on("click", function(e){
			e.preventDefault();

			var current_step_index = jQuery.inArray(active_volunteer_step, volunteer_steps);
			if(current_step_index<=0){
				return;
			}
			current_step_index--;
			var prev_step = volunteer_steps[current_step_index];
			active_volunteer_step = prev_step;
			show_prev_step($modal, prev_step);

			if(current_step_index<=0){
				$btn_back.hide();
			}
		});

		$modal.on('click', ".js-open-map", open_map);	

		function open_map(e){
			e.preventDefault();
			var location = $input_data_location.val();
			var date = $input_data_date.val();
			var type = $(this).data("type");
			var url = "map.php?location="+location+"&date="+date+"&type="+type;
			window.location.href = url;
		}
	};

	var show_prev_step = function($modal, step_name){
		var $step_current = $modal.find(".step-item.visible");
		var $step_prev = $modal.find(".step-item[data-step-name='" + step_name +"']");

		$step_current.removeClass("fadein").addClass("move-right fadeout");
        $step_prev.removeClass("fadeut").addClass("move-left visible");

        // Hide current step
        setTimeout(function(){
            $step_current.removeClass("visible");
        },300);

        setTimeout(function(){
            $step_prev.addClass("fadein").removeClass("move-left");
        },10);
    };

	var show_next_step = function($modal, step_name){
		var $step_current = $modal.find(".step-item.visible");
		var $step_next = $modal.find(".step-item[data-step-name='" + step_name +"']");

		// Hide current step
    	$step_current.removeClass("move-right fadein").addClass("fadeout move-left");
        setTimeout(function(){
            $step_current.removeClass("visible");
        },300);

        // Show next step
        $step_next.addClass("move-right visible");
        setTimeout(function(){
            $step_next.addClass("fadein").removeClass("move-right");
        },10);
	};

	$(document).ready(function(){
		init();
		$(document).on('click', ".js-trigger-volunteer", open_modal);	
	});

})();

/* **********************************************
     Begin klp.volunteer-map.js
********************************************** */

var klp = klp || {};

(function(){
	var modal_tpl;
	var $modal_wrapper;
	var $modal_overlay;

	var init = function(){
		modal_tpl = swig.compile($("#tpl-volunteer-modal-map").html());
		$modal_wrapper = $("#modal_wrapper");
		$modal_overlay = $("#modal_overlay");
	};

	var open_modal = function(e){
		e.preventDefault();

		var date = $(this).data("date") || false;

		var ctx = {
			date: date
		}

		var html = modal_tpl(ctx);
		$modal_wrapper.append(html);
		var $modal = $modal_wrapper.find(".modal-volunteer.second-step");
		init_modal($modal);

		setTimeout(function(){
			$modal.addClass("show");
			$modal_overlay.addClass("show");
		},0);
	};

	var init_modal = function($modal){
		// var $input_data_location = $modal.find( "input[name=data_location]" );
		var $input_data_date = $modal.find( "input[name=data_date]" );
		var $input_data_type = $modal.find( "input[name=data_type]" );

		var $btn_close = $modal.find(".btn-modal-close");
		var $btn_back = $modal.find(".btn-modal-back");
		var $btn_next_step_cal = $modal.find('.btn-next-step-cal');
		var $btn_next_step_login = $modal.find('.btn-next-step-login');
		var $btn_next_step_details = $modal.find('.btn-next-step-details');
		var $datepicker_input = $modal.find('#datepicker-input');

		$datepicker_input.Zebra_DatePicker({
		    always_visible: $modal.find('#datepicker-wrapper'),
		    first_day_of_week: 0,
		    show_clear_date: false,
		    show_select_today: false,
		    disabled_dates: ['1,3,4,5,12,13,14,22,24'],
		    onSelect: onDateSelect,
		    onClear: onDateClear
		});
		var datepicker = $datepicker_input.data('Zebra_DatePicker');

		function onDateSelect(date){
			$input_data_date.val(date);
			$btn_next_step_cal.show();
		}
		function onDateClear(){
			$input_data_date.val("");
			$btn_next_step_cal.hide();
		}

		$btn_next_step_cal.on("click", function(e){
			show_next_step($modal, "signup");
			$btn_back.show();
			$btn_back.off();
			$btn_back.on("click", function(){
				show_prev_step($modal, "date");
				$btn_back.hide();
			});
		});
		$btn_next_step_login.on("click", function(e){
			show_next_step($modal, "login");
			$btn_back.off();
			$btn_back.on("click", function(){
				show_prev_step($modal, "signup");
			});
		});
		$btn_next_step_details.on("click", function(e){
			show_next_step($modal, "confirmation");
			$btn_back.hide();
		});

		$btn_close.on("click", function(e){
			$modal.removeClass("show");
			$modal_overlay.removeClass("show");
			
			setTimeout(function(){
				$modal.remove();
			},300);
		});
	};

	var show_prev_step = function($modal, step_name){
		var $step_current = $modal.find(".step-item.visible");
		var $step_prev = $modal.find(".step-item[data-step-name='" + step_name +"']");

		$step_current.removeClass("fadein").addClass("move-right fadeout");
        $step_prev.removeClass("fadeut").addClass("move-left visible");

        // Hide current step
        setTimeout(function(){
            $step_current.removeClass("visible");
        },300);

        setTimeout(function(){
            $step_prev.addClass("fadein").removeClass("move-left");
        },10);
    };

	var show_next_step = function($modal, step_name){
		var $step_current = $modal.find(".step-item.visible");
		var $step_next = $modal.find(".step-item[data-step-name='" + step_name +"']");

		// Hide current step
    	$step_current.removeClass("move-right fadein").addClass("fadeout move-left");
        setTimeout(function(){
            $step_current.removeClass("visible");
        },300);

        // Show next step
        $step_next.addClass("move-right visible");
        setTimeout(function(){
            $step_next.addClass("fadein").removeClass("move-right");
        },10);
	};

	$(document).ready(function(){
		init();
		$(document).on('click', ".js-trigger-volunteer-map", open_modal);	
	});

})();

/* **********************************************
     Begin klp.volunteer.js
********************************************** */

var klp = klp || {};

klp.volunteer2 = (function(){
	var $modal_wrapper,
		$modal_overlay,
		modal_tpl;

	var flow = function(_wrapper){
        var $wrapper,
            $steps,
            $btn_back,
            $prev_step_cache,
            _active_step;

        this.$wrapper = $(_wrapper);
        this.$steps = this.$wrapper.find(".step-item");
        this.$btn_back = this.$wrapper.find(".btn-modal-back");
        this._active_step = 1;
        this.init();
    };
    flow.prototype.init = function(){
    	var self = this;
		this.$wrapper.on('click', ".js-volunteer-next-step", function(e){
			e.preventDefault();
			self.show_next_step();
		});
		this.$wrapper.on('click', ".btn-modal-back", function(e){
			e.preventDefault();
			self.show_prev_step();
		});
		this.$wrapper.on('click', ".btn-modal-close", function(e){
			e.preventDefault();
			self.on_close();
		});

		var $cal_step_next_btn = this.$wrapper.find('.js-next-btn-cal-step');
		var $datepicker_input = this.$wrapper.find('#datepicker-input');

		var $select_state = this.$wrapper.find('#select-cities-state').selectize();

		$datepicker_input.Zebra_DatePicker({
		    always_visible: this.$wrapper.find('#datepicker-wrapper'),
		    first_day_of_week: 0,
		    show_clear_date: false,
		    show_select_today: false,
		    disabled_dates: ['1,3,4,5,12,13,14,22,24'],
		    onSelect: onDateSelect,
		    onClear: onDateClear
		});
		var datepicker = $datepicker_input.data('Zebra_DatePicker');

		function onDateSelect(){
			$cal_step_next_btn.show();
		}
		function onDateClear(){
			$cal_step_next_btn.hide();
		}
	};
    flow.prototype.get_step = function(step_id){
		return this.$wrapper.find('.step-item[data-step="'+ step_id +'"]');
    };
    flow.prototype.show_prev_step = function(){
    	var $step_current = this.get_step(this._active_step);
		var $step_prev = this.get_step(--this._active_step);

		$step_current.removeClass("fadein").addClass("move-right fadeout");
        $step_prev.removeClass("fadeut").addClass("move-left visible");

        // Hide current step
        setTimeout(function(){
            $step_current.removeClass("visible");
        },300);

        setTimeout(function(){
            $step_prev.addClass("fadein").removeClass("move-left");
        },10);

        if(this._active_step == 1){
        	this.$btn_back.hide();
        }
    };
    flow.prototype.show_next_step = function(){
		var $step_current = this.get_step(this._active_step);
		var $step_next = this.get_step(++this._active_step);
		this.$btn_back.show();

		// Hide current step
    	$step_current.removeClass("move-right fadein").addClass("fadeout move-left");
        setTimeout(function(){
            $step_current.removeClass("visible");
        },300);

        // Show next step
        $step_next.addClass("move-right visible");
        setTimeout(function(){
            $step_next.addClass("fadein").removeClass("move-right");
        },10);
	};
	flow.prototype.on_close = function(){
		var self = this;
		this.$wrapper.removeClass("show");
		$("#modal_overlay").removeClass("show");
		setTimeout(function(){
			self.$wrapper.remove();
		},300);
	};

	var open_modal = function(e){
		if($(window).width() < 1024){
			return true;
		}

		e.preventDefault();

		var ctx = {
			hide_input_location: false
		}
		// console.log(ctx);

		var html = modal_tpl(ctx);
		$modal_wrapper.append(html);

		var $modal = $modal_wrapper.find(".modal-volunteer");
		var modal_flow = new flow($modal);

		$modal.addClass("show");
		$modal_overlay.addClass("show");
	};

	var init_page_mode = function(){
		var $wrapper = $(".page-volunteer-register").find(".volunteer-flow");
		var page_flow = new flow($wrapper);
	};

	// Reset steps - show first step and reset params
	// var reset = function(){
	// 	_active_step = 1;

	// 	// Hide all steps
	// 	$modal.find('.step-item').removeClass("visible fadein fadeout move-left move-right");
	// 	// Show first step
	// 	$modal.find('.step-item[data-step="1"]').addClass("visible fadein");
	// };

	var init = function(){
		$modal_wrapper = $("#modal_wrapper");
		$modal_overlay = $("#modal_overlay");
		modal_tpl = swig.compile($("#tpl-volunteer-modal").html());

		//$(document).on('click', ".js-trigger-volunteer", open_modal);		
	};

	$(document).ready(function(){
		init();
	});
	
	return {
		init_page_mode : init_page_mode
	};
})();

/* **********************************************
     Begin klp.codekit.js
********************************************** */

// @codekit-prepend "klp.volunteer-initial.js"
// @codekit-prepend "klp.volunteer-map.js"
// @codekit-prepend "klp.volunteer.js"

$(document).ready(function(){

});
