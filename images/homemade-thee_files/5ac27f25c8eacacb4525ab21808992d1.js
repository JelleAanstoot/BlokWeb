jQuery(function($){"use strict";function eventer_append_url(key,value){var baseUrl=[location.protocol,'//',location.host,location.pathname].join(''),urlQueryString=document.location.search,newParam=key+'='+value,params='?'+newParam;if(urlQueryString){var updateRegex=new RegExp('([\?&])'+key+'[^&]*');var removeRegex=new RegExp('([\?&])'+key+'=[^&;]+[&;]?');if(typeof value=='undefined'||value==null||value==''){params=urlQueryString.replace(removeRegex,"$1");params=params.replace(/[&;]$/,"")}else if(urlQueryString.match(updateRegex)!==null){params=urlQueryString.replace(updateRegex,"$1"+newParam)}else{params=urlQueryString+'&'+newParam}}
return baseUrl+params}
function eventer_load_events_shortcode(shortcode,specific_element){if(typeof specific_element==='undefined'){specific_element=''}
$.ajax({method:"POST",url:filters.root+'eventer/dynamic',data:JSON.stringify(shortcode),crossDomain:!0,contentType:'application/json',beforeSend:function(xhr){$('#'+specific_element).find('.eventer-loader-wrap').show();xhr.setRequestHeader('X-WP-Nonce',filters.nonce)},success:function(response){$('#'+specific_element).empty();$('#'+specific_element).append(response.shortcode);$('.eventer-filter-datewise-wrap').hide();$('.eventer-filter-datewise').datepicker({dateFormat:'dd-mm-yy',onSelect:function(dateText,inst){eventer_filter_by_calendar($(this).closest('.eventer-dynamic-list-set').attr('id'))}});setTimeout(function(){$('.equah').each(function(){$(this).find('.equah-item').matchHeight()})},3000)},error:function(response){}})}
function eventer_filter_by_calendar(element){var date_from=$('#eventer_from').val();var date_to=$('#eventer_to').val();if(date_to!==''){var shortcode=JSON.parse($('#'+element).find('.eventer-dynamic-listings-main').attr('data-shortcode'));shortcode.path=document.location.href;shortcode.ajax="1";shortcode.series=date_from+','+date_to;eventer_load_events_shortcode(shortcode,element)}}
$(document).ready(function(){$(document).on('click','.eventer-dynamic-call',function(){var data_jump=$(this).attr('data-arrow');var data_calview=$(this).attr('data-calview');history.pushState('','',eventer_append_url('jump_date',data_jump));history.pushState('','',eventer_append_url('calview',data_calview));var shortcode=JSON.parse($(this).closest('.eventer-dynamic-listings-main').attr('data-shortcode'));shortcode.path=document.location.href;shortcode.ajax="1";var specific_element=$(this).closest('.eventer-dynamic-list-set').attr('id');eventer_load_events_shortcode(shortcode,specific_element)});$(document).on('click','.eventer-dynamic-pagination',function(e){e.preventDefault();var data_pagin=$(this).attr('data-page');history.pushState('','',eventer_append_url('pagin',data_pagin));var shortcode=JSON.parse($(this).closest('.eventer-dynamic-listings-main').attr('data-shortcode'));shortcode.pagin=data_pagin;shortcode.path=document.location.href;shortcode.ajax="1";var specific_element=$(this).closest('.eventer-dynamic-list-set').attr('id');eventer_load_events_shortcode(shortcode,specific_element)});$('.eventer-filter-datewise-wrap').hide();$(document).on('click','.eventer-datewise-filter-trigger',function(){$('.eventer-filter-datewise-wrap').slideToggle();$(this).toggleClass('trigger-active')});$('.eventer-filter-datewise-wrap').hide();$('.eventer-filter-datewise').datepicker({dateFormat:'yy-mm-dd',onSelect:function(dateText,inst){eventer_filter_by_calendar($(this).closest('.eventer-dynamic-list-set').attr('id'))}});$(document).on('change keyup paste mouseup','.eventer-filter-datewises',function(){eventer_filter_by_calendar($(this).closest('.eventer-dynamic-list-set').attr('id'))});$(document).on('change','.eventer-term-filters',function(){var term=$(this).closest('ul').attr('data-taxonomy');var terms=[];$(this).closest('ul').find('.eventers-filter-check').each(function(){if($(this).is(':checked')){terms.push($(this).attr('data-term'))}});var term_id=terms.toString();history.pushState('','',eventer_append_url(term,term_id));var shortcode=JSON.parse($(this).closest('.eventer-dynamic-listings-main').attr('data-shortcode'));shortcode.path=document.location.href;shortcode.ajax="1";shortcode[term]=term_id;var specific_element=$(this).closest('.eventer-dynamic-list-set').attr('id');eventer_load_events_shortcode(shortcode,specific_element)});$('.eventers-filter-check').click(function(){$(".eventer-filter-select").slideUp()});$(document).on('click','.eventer-filter-trigger',function(e){if($(this).parents('.eventer-filter-col').find('.eventer-filter-select').is(":visible")){$(".eventer-filter-select").hide()}else{$(".eventer-filter-select").hide();$(this).parents('.eventer-filter-col').find('.eventer-filter-select').toggle()}
e.preventDefault()})})})
;