// This modal opens when user clicks on "Volunteer" button on an opportunity item
// Uses template id: "tpl-volunteer-modal-confirm"

var klp = klp || {};

(function(){
	var modal_tpl;
	var $modal_wrapper;
	var $modal_overlay;

	var init = function(){
		var $modal_tpl_src = $("#tpl-volunteer-modal-confirm");
		if(!$modal_tpl_src.length){
			console.log("Volunteer confirm modal template is missing");
			return;
		}

		modal_tpl = swig.compile($modal_tpl_src.html());
		$modal_wrapper = $("#modal_wrapper");
		$modal_overlay = $("#modal_overlay");
	};

	var open_modal = function(e){
		e.preventDefault();

		var ctx = {};	// This context is passed to swig template
		ctx.date = $(this).data("date") || false;
		ctx.opportunity_id = $(this).data("opportunity_id") || false;

		var html = modal_tpl(ctx);
		$modal_wrapper.append(html);
		var $modal = $modal_wrapper.find(".js-volunteer-modal-confirmation-step");
		init_modal($modal);

		setTimeout(function(){
			$modal.addClass("show");
			$modal_overlay.addClass("show");
		},0);
	};

	var init_modal = function($modal){

		var $btn_close = $modal.find(".btn-modal-close");
		var $btn_back = $modal.find(".btn-modal-back");
		var $btn_next_step_login = $modal.find('.btn-next-step-login');
		var $btn_next_step_confirmation = $modal.find('.btn-next-step-confirmation');
		var $btn_next_step_submit = $modal.find('.btn-next-step-submit');

		$btn_next_step_confirmation.on("click", function(e){
			show_next_step($modal, "confirmation");
			$btn_back.hide();
			$btn_back.off();
			$btn_back.on("click", function(){
				show_prev_step($modal, "login");
			});
		});

		$btn_next_step_login.on("click", function(e){
			show_next_step($modal, "login");
			$btn_back.show();
			$btn_back.off();
			$btn_back.on("click", function(){
				show_prev_step($modal, "signup");
				$btn_back.hide();
			});
		});
		$btn_next_step_submit.on("click", function(e){
			show_next_step($modal, "submit");
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
		$(document).on('click', ".js-trigger-volunteer-confirm", open_modal);	
	});

})();