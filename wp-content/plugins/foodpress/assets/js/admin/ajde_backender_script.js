// ======================================================
// AJDE Backender Section


jQuery(document).ready(function($){

	init();

	function init(){
		// focusing on correct settings tabs
		var hash = window.location.hash;
		//console.log(hash);

		if(hash=='' || hash=='undefined'){
		}else{
			var hashId = hash.split('#');

			$('.nfer').hide();
			$(hash).show();

			var obj = $('a[data-c_id='+hashId[1]+']');
			change_tab_position(obj);
		}
	}

	// time slot settings
		$('.fpr_add_slot').on('click',function(){
			$(this).siblings('.fpr_timeslot_in').append("<span class='fpr_meal_time_slot'></span>");
		});

	// switching between tabs
		$('#acus_left').find('a').click(function(){
			
			var nfer_id = $(this).data('c_id');
			$('.nfer').hide();
			$('#'+nfer_id).show();

			change_tab_position($(this));

			window.location.hash = nfer_id;

			if(nfer_id=='food_003'){
				$('#resetColor').show();
				$('#resetcolornote').show();
			}else{
				$('#resetColor').hide();
				$('#resetcolornote').hide();
			}
			
			return false;
		});

		// position of the arrow
		function change_tab_position(obj){

			// class switch
			$('#acus_left').find('a').removeClass('focused');
			obj.addClass('focused');

			var menu_position = obj.position();
			//console.log(obj);
			$('#acus_arrow').css({'top':(menu_position.top+3)+'px'}).show();
		}
		// RESET colors
		$('#resetColor').on('click',function(){
			$('.colorselector ').each(function(){
				var item = $(this).siblings('input');
				item.attr({'value': item.attr('data-default') });
			});
			
		});


	// hidden section
	$('.evoSET_hidden_open').click(function(){
		$(this).next('.evoSET_hidden_body').slideToggle();
		if( $(this).hasClass('open')){
			$(this).removeClass('open')
		}else{
			$(this).addClass('open');
		}
	});

	
	// color circle guide popup
		$('#food_003 .hastitle').hover(function(){
			var poss = $(this).position();
			var title = $(this).attr('alt');
			//alert(poss.top)
			$('#fp_color_guide').css({'top':(poss.top-33)+'px', 'left':(poss.left+11)}).html(title).show();
			//$('#fp_color_guide').show();

		},function(){
			$('#fp_color_guide').hide();

		});

	// color picker
	$('.colorselector').ColorPicker({
		onBeforeShow: function(){
			$(this).ColorPickerSetColor( $(this).attr('hex'));
		},	
		onChange:function(hsb, hex, rgb,el){
			//console.log(hex);
			//$(el).attr({'backgroundColor': '#' + hex});
			$(el).html( hex);
		},	
		onSubmit: function(hsb, hex, rgb, el) {
			$(el).siblings('input').attr({'value':hex});
			$(el).css('backgroundColor', '#' + hex);

			if($(el).hasClass('rgb')){
				$(el).siblings('input.rgb').attr({'value':rgb.r+','+rgb.g+','+rgb.b});
				//console.log(rgb);
			}

			if(!$(el).hasClass('hastitle')){
				$(el).attr({'title': '#' + hex});
			}
			$(el).ColorPickerHide();
		}
	});


	var fa_icon_selection = '';

	// font awesome icons
	$('.faicon').on('click','i', function(){
		var poss = $(this).position();
		$('.fa_icons_selection').css({'top':(poss.top-220)+'px', 'left':(poss.left-74)}).fadeIn('fast');

		fa_icon_selection = $(this);
	});

		//selection of new font icon
		$('.fa_icons_selection').on('click','li', function(){

			var icon = $(this).find('i').data('name');
			console.log(icon)

			fa_icon_selection.attr({'class':'fa '+icon});
			fa_icon_selection.siblings('input').val(icon);

			$('.fa_icons_selection').fadeOut('fast');
		});
		// close with click outside popup box when pop is shown
		$(document).mouseup(function (e){
			var container=$('.fa_icons_selection');
			
				if (!container.is(e.target) // if the target of the click isn't the container...
				&& container.has(e.target).length === 0) // ... nor a descendant of the container
				{
					$('.fa_icons_selection').fadeOut('fast');
				}
			
		});
	
	// multicolor title/name display
	$('.row_multicolor').on('mouseover','em',function(){
		var name = $(this).data('name');
		$(this).closest('.row_multicolor').find('.multicolor_alt').html(name);

	});
	$('.row_multicolor').on('mouseout','em',function(){
		$(this).closest('.row_multicolor').find('.multicolor_alt').html(' ');

	});


	//yes no buttons in event edit page
	$('.fp_backender_uix').on('click','.fp_yn_btn', function(){
		
		if($(this).hasClass('disable')){
		
		}else{
			// yes
			if($(this).hasClass('NO')){
				$(this).removeClass('NO');
				$(this).siblings('input').val('yes');
				
				$('#'+$(this).attr('afterstatement')).slideDown('fast');
				
			}else{//no
				$(this).addClass('NO');
				$(this).siblings('input').val('no');
				
				$('#'+$(this).attr('afterstatement')).slideUp('fast');
			}
		}		
	});
	
	//legend
	$('.legend_icon').hover(function(){
		$(this).siblings('.legend').show();
	},function(){
		$(this).siblings('.legend').hide();
	});
	
	// image
		var formfield;
		var preview;
		var the_variable;
		
	  
	    $('.custom_upload_image_button').click(function() {  
			formfield = $(this).siblings('.custom_upload_image');
			var parent_id = $(this).attr('parent');
			var parent = $('#'+parent_id);
			preview = parent.find('.custom_preview_image');  
	        tb_show('', 'media-upload.php?type=image&from=t31os&TB_iframe=true');
			
			window.original_send_to_editor = window.send_to_editor;
			
	        window.send_to_editor = function(html) {			
				if( $(html).find('img').length ){// <img is inside <a>
					the_variable = $(html).find('img');
				}else{	the_variable = $(html);	}
				
	            imgurl = $(the_variable).attr('src');  
				
				//alert(imgurl);
	            classes = $(the_variable).attr('class');  
	            id = classes.replace(/(.*?)wp-image-/, '');  
	            formfield.val(id);  
	            preview.attr('src', imgurl);
				preview.show();
	            tb_remove();
				parent.find('.custom_no_preview_img').hide();
				parent.find('.custom_upload_image_button ').hide();
				parent.find('.custom_clear_image_button').show();
	        }  
	        return false;  
	    });  
	  
	    $('.custom_clear_image_button').click(function() {           
	        $(this).parent().siblings('.custom_upload_image').val('');  
	        $(this).parent().siblings('.custom_preview_image').attr('src', '').hide();
			
			$(this).parent().siblings('.custom_no_preview_img').show();
			$(this).parent().siblings('.custom_upload_image_button ').show();
			$(this).hide();
	        return false;  
	    });

	// hidden section
		$('.ajdeSET_hidden_open').click(function(){
			$(this).next('.ajdeSET_hidden_body').slideToggle();
			if( $(this).hasClass('open')){
				$(this).removeClass('open')
			}else{
				$(this).addClass('open');
			}
		});	

	// sortable		
		$('.ajderearrange_box').sortable({		
			update: function(e, ul){
				var sortedID = $(this).sortable('toArray',{attribute:'val'});
				$(this).closest('.ajderearrange_box').siblings('.ajderearrange_order').val(sortedID);
			}
		});
		// hide sortables
			$('.ajderearrange_box').on('click','span',function(){
				$(this).toggleClass('hide');
				update_card_hides( $(this) );
			});

			function update_card_hides(obj){
				hidethese = '';
				$('.ajderearrange_box').find('span').each(function(index){
					if(!$(this).hasClass('hide'))
						hidethese += $(this).parent().attr('val')+',';
				});

				obj.closest('.ajderearrange_box').siblings('.ajderearrange_selected').val(hidethese);
			}
		
	// at first run a check on list items against saved list -
		var items='';
		$('#ajdeEVC_arrange_box').find('p').each(function(){
			if($(this).attr('val')!='' && $(this).attr('val')!='undefined'){
				items += $(this).attr('val')+',';
			}
		});
		$('input.ajderearrange_order').val(items);	
		//if($('input.ajderearrange_selected').val()=='') $('input.ajderearrange_selected').val(items);	
	
// AJDE Backender Section -- END
// ======================================================

});