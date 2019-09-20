import 'main';
import 'statistics/visitorAddExt';
import FootnoteLoader from 'footnotes/footnote';
import 'tooltipster';
import 'jquery-touchswipe';
import 'subscribe';
import 'ask-form';
import 'jquery.disqusloader';
import 'disqus';

$(document).ready(function () {
    let Footnotes = new FootnoteLoader({
        querySelector: '.js-footnotes',
        includeCamouflaged: false
    });
    $('.js-tooltip').each(function() {
        var tooltipContent = $(this).attr('data-tooltipster-content');
        $(this).tooltipster({
            contentAsHTML: true,
            position: 'top',
            theme: 'tooltipster-noir',
            content: tooltipContent,
            multiple: true,
            interactive: true,
            minWidth: 290,
            maxWidth:460,
            trigger: 'click',
            zIndex: 900,
            functionReady: function () {
                $('.js-tooltip-close').on('click', function() {
                    $('.tooltipster-base').detach();
                });
            }
        });
    });
    /*сокращение слов в табах*/

    $('.tabs li').each(function() {
        if (screen.width < 961) {
            $(this).children().children('b').text($(this).attr('data-tabs-title-mobile'));
        }
        else{
            $(this).children().children('b').text($(this).attr('data-tabs-title'));
        }
    });
    /*end*/
    $('.span_name_opt').click(function(){
        $(this).siblings(".label-option").click();
    });

    var sort=$('.sort_offers').attr('data-display-tab0');
    if(sort==0){
        $('.sort_offers').hide();
        $('.sort_offers').removeClass('act');
        $('.filters').hide();
    }
    else if(sort==1){
        $('.sort_offers').show();
    }
    var filters=$('.compare_all_offers').attr('data-display-tab0');
    if(filters==0){
        $('.compare_all_offers').hide();
        $('.compare_all_offers').removeClass('act');
        $('.filters_history').hide();
    }
    else if(filters==1){
        $('.compare_all_offers').show();
    }
    var compare=$('.all_compare_block').attr('data-display-tab0');
    if(compare==0){
        $('.all_compare_block').hide();
        $('.compare_all_offers').removeClass('act');
    }
    else if(compare==1){
        $('.all_compare_block').show();
    }

    var index=$('.tabs .active').index();
    $('.tabs li').each(function(i,elem) {
        if(($(this).index()-index)==-1 || ($(this).index()-index)==1){
            $(this).addClass('index_tabs_1');
        }
        else if(($(this).index()-index)==-2 || ($(this).index()-index)==2){
            $(this).addClass('index_tabs_2');
        }
        else if(($(this).index()-index)==-3 || ($(this).index()-index)==3){
            $(this).addClass('index_tabs_3');
        }
        else if(($(this).index()-index)==0 ){
            $(this).addClass('index_tabs_0');
        }

    });
    $('.table_'+$('.tabs .active').data('table')).show();


  /*  var show_compare_start= $('.tabs .active').data('compare-show');
    if(show_compare_start==1){
        $('.compare_all_offers').show();
    }
    else {
        $('.compare_all_offers').hide();
    }*/
    $('.tabs li').click(function () {
        if($(this).hasClass('active')==false){
            $('.tabs li').removeClass('active');
            $('.tabs li').removeClass('index_tabs_1');
            $('.tabs li').removeClass('index_tabs_2');
            $('.tabs li').removeClass('index_tabs_3');
            $('.tabs li').removeClass('index_tabs_0');
            $('.table_cards').hide();
            $(this).addClass('active');
            var index=$(this).index();
            var sort=$('.sort_offers').attr('data-display-tab'+index);
            var sort_act=$('.sort_offers').attr('data-sort-tab'+$(this).attr('data-table'));
            var filter=$('.compare_all_offers').attr('data-display-tab'+index);
            var filter_act=$('.compare_all_offers').attr('data-sort-tab'+$(this).attr('data-table'));
            var compare=$('.all_compare_block').attr('data-display-tab'+index);
            if(compare==0){
                $('.all_compare_block').hide();
            }
            else if(compare==1){
                $('.all_compare_block').show();
            }

            if(sort==0){
                $('.sort_offers').hide();
                $('.sort_offers').removeClass('act');
                $('.filters').hide();
            }
            else if(sort==1 && sort_act==1){
                $('.sort_offers').show();
                $('.sort_offers').addClass('act');
                $('.filters').show();
            }
            else if(sort==1 && (sort_act==0 || !sort_act)){
                $('.sort_offers').removeClass('act');
                $('.filters').hide();
                $('.sort_offers').show();
            }

            if(filter==0){
                $('.compare_all_offers').hide();
                $('.compare_all_offers').removeClass('act');
                $('.filters_history').hide();
            }
            else if(filter==1 && filter_act==1){
                $('.compare_all_offers').show();
                $('.compare_all_offers').addClass('act');
                $('.filters_history').show();
            }
            else if(filter==1 && (filter_act==0 || !filter_act)){
                $('.compare_all_offers').removeClass('act');
                $('.filters_history').hide();
                $('.compare_all_offers').show();
            }

            $('.tabs li').each(function(i,elem) {
                if(($(this).index()-index)==-1 || ($(this).index()-index)==1){
                    $(this).addClass('index_tabs_1');
                }
                else if(($(this).index()-index)==-2 || ($(this).index()-index)==2){
                    $(this).addClass('index_tabs_2');
                }
                else if(($(this).index()-index)==-3 || ($(this).index()-index)==3){
                    $(this).addClass('index_tabs_3');
                }
                else if(($(this).index()-index)==0 ){
                    $(this).addClass('index_tabs_0');
                }

            });
            $('.table_'+$(this).data('table')).show();
           /* var show_compare=$(this).data('compare-show');
            if(show_compare==1){
                $('.compare_all_offers').show();
            }
            else {
                $('.compare_all_offers').hide();
            }*/
            Footnotes.reInit();
        }

    });

    $('.icons_attr_head div').click(function () {
        if($(this).hasClass('act')==false){
            $(this).siblings(".act").removeClass('act');
            $(this).addClass('act');
            var attr=$(this).attr('data-icons-descriptions');
            var block=$(this).parent().parent();
            block.children(".description_attr").each(function(i,elem) {
                $(this).hide();
                if($(this).hasClass('icons'+attr)==true){
                    $(this).show();
                }
            });
            // $('.description_attr').hide();
            //  $('.icons'+attr).show();
        }
        Footnotes.reInit();
    });
    $('.sort_offers').click(function (e) {
        e.preventDefault();
        if($(this).hasClass('act')==false){

            $(this).addClass('act');
            var sort = $(this);
            var table=$('.tabs li');
            table.each(function(i,sort) {
                if ($(this).hasClass('active')) {
                    var index=$(this).attr('data-table');
                    $('.sort_offers').attr("data-sort-tab"+index, "1");
                }
            });

            $('.filters').show();
        }
        else{
            $(this).removeClass('act');
            $('.filters').hide();
            var sort = $(this);
            var table=$('.tabs li');
            table.each(function(i,sort) {
                if ($(this).hasClass('active')) {
                    var index=$(this).attr('data-table');
                    $('.sort_offers').attr("data-sort-tab"+index, "0");
                }
            });
        }
    });


    $('.hide_options').click(function () {
        $('.sort_offers').removeClass('act');
        $('.filters').hide();
        var sort = $('.sort_offers');
        var table=$('.tabs li');
        table.each(function(i,sort) {
            if ($(this).hasClass('active')) {
                var index=$(this).attr('data-table');
                $('.sort_offers').attr("data-sort-tab"+index, "0");
            }
        });
    });

    /*check history fillter*/
    $('.compare_all_offers').click(function (e) {
        e.preventDefault();
        if($(this).hasClass('act')==false){

            $(this).addClass('act');
            var sort = $(this);
            var table=$('.tabs li');
            table.each(function(i,sort) {
                if ($(this).hasClass('active')) {
                    var index=$(this).attr('data-table');
                    $('.compare_all_offers').attr("data-sort-tab"+index, "1");
                }
            });

            $('.filters_history').show();
            Footnotes.reInit();
        }
        else{
            $(this).removeClass('act');
            $('.filters_history').hide();
            var sort = $(this);
            var table=$('.tabs li');
            table.each(function(i,sort) {
                if ($(this).hasClass('active')) {
                    var index=$(this).attr('data-table');
                    $('.compare_all_offers').attr("data-sort-tab"+index, "0");
                }
            });
            Footnotes.reInit();
        }
    });
    $('.hide_options_history').click(function () {
        $('.compare_all_offers').removeClass('act');
        $('.filters_history').hide();
        var sort = $('.compare_all_offers');
        var table=$('.tabs li');
        table.each(function(i,sort) {
            if ($(this).hasClass('active')) {
                var index=$(this).attr('data-table');
                $('.compare_all_offers').attr("data-sort-tab"+index, "0");
            }
        });
    });
    /*end*/
    $('.hide_show').click(function () {
        if($(this).siblings('.block_show_hide').hasClass('act')==false){
            $(this).siblings('.block_show_hide').addClass("act");
            $(this).addClass('act_hide_show');
            $(this).text('Hide');
        }
        else{
            $(this).siblings('.block_show_hide').removeClass("act");
            $(this).removeClass('act_hide_show');
            $(this).text('Show more');
        }
    });
    $(window).on('load', function () {

        Footnotes.reInit();
        if($(window).width()<751) {
            $('.table .tr').click(function () {
                if ($(this).hasClass('open') == false) {
                    $(this).addClass("open");
                    $(this).children('.value_attr_card').show();
                    Footnotes.reInit();
                }
                else {
                    $(this).removeClass("open");
                    $(this).children('.value_attr_card').hide();
                    Footnotes.reInit();
                }
            });
            tabsConstruction();
        }
    });
    $(window).resize(function() {
        if($(window).width()<751) {
            $(".tabs>li").removeAttr("style");
            $('.tabs').removeAttr("style");
            tabsConstruction();
            Footnotes.reInit();
        }
        else{
            $(".tabs>li").removeAttr("style");
            $('.tabs').removeAttr("style");
            Footnotes.reInit();
        }
    });
    $('.radio-option').change(function(){
        var tab = $(this).data('tab');
        var pos = $(this).data('position');

        if($(this).prop('checked')==true){

            var items = $('.products_table_'+tab+' .product_table');
            var arItems = $.makeArray(items);

            arItems.sort(function( a, b ) {return $(a).data("sort"+pos) - $(b).data("sort"+pos)});

            $(arItems).appendTo(".products_table_"+tab);

            /*$('.products_table_'+tab+' .best_card .bg_name_card').removeClass('wine');
            $('.products_table_'+tab+' .best_card .bg_name_card').addClass('yellow');
            items.removeClass('best_card');
            $('.products_table_'+tab+' .product_table:first').addClass('best_card');
            $('.products_table_'+tab+' .product_table:first .bg_name_card').removeClass('yellow').addClass('wine');*/
            $(this).parent().parent().removeClass('checked');
            $(this).parent().parent().addClass('checked');
            var hide=$('.products_table_'+tab+' .product_table:not(.filter_on)');
            hide.each(function(i,elem) {
                if (i<7) {
                    $(this).removeClass('hide_product');
                    i++;
                }
                else{
                    $(this).addClass('hide_product');
                }
            });
            if( $('.show_more_cards').attr('data-action-table')=='1'){

                if($(".products_table_"+$('.show_more_cards').attr('data-table-show')).children(".hide_product").length=='0'){
                    $('.show_more_cards').attr('data-action-table',0);
                    $('.show_more_cards').text('SHOW LESS CARDS');
                    $('.show_more_cards').addClass('less');
                }
                else{
                    $('.show_more_cards').attr('data-action-table',1);
                    $('.show_more_cards').text('SHOW MORE CARDS');
                    $('.show_more_cards').removeClass('less');

                }
            }
            else if( $('.show_more_cards').attr('data-action-table')=='0'){

                $('.show_more_cards').attr('data-action-table',1);
                $('.show_more_cards').text('SHOW MORE CARDS');
                $('.show_more_cards').removeClass('less');

            }
            Footnotes.reInit();
        }


    });

    /*фильтрация*/
    $('.check-option').change(function(){
        var tab = $(this).data('tab');
        var pos = $(this).data('position');

        if($(this).prop('checked')==true){

            var items = $('.products_table_'+tab+' .product_table');
            var filter_option = $('.table_fil'+tab);
            items.each(function(){

                if($(this).attr("data-filter"+pos)=='1'){
                    $(this).removeClass('filter_on');
                }
            });
            filter_option.each(function(){
                if ($(this).prop('checked')==true){
                    var pos_checked_fill = $(this).data('position');
                    items.each(function(){

                        if($(this).attr("data-filter"+pos_checked_fill)=='1'){
                            $(this).removeClass('filter_on');
                        }
                    });
                }
            });
            var itemhide = $('.products_table_'+tab+' .product_table:not(.filter_on)');
            var itemCount = $('.products_table_'+tab+' .product_table:not(.filter_on)').length;
            $('.tabs .active .col_tab').text(itemCount);
            if (itemCount>7){
                $('.table_'+tab+' .show_more_cards').show();
            }
            else{
                $('.table_'+tab+' .show_more_cards').hide();
            }
            itemhide.each(function(i,elem) {
                if (i<7) {
                    $(this).removeClass('hide_product');
                }
                else{
                    $(this).addClass('hide_product');
                }
            });
            if( $('.show_more_cards').attr('data-action-table')=='1'){

                if($(".products_table_"+$('.show_more_cards').attr('data-table-show')).children(".hide_product").length=='0'){
                    $('.show_more_cards').attr('data-action-table',0);
                    $('.show_more_cards').text('SHOW LESS CARDS');
                    $('.show_more_cards').addClass('less');
                }
                else{
                    $('.show_more_cards').attr('data-action-table',1);
                    $('.show_more_cards').text('SHOW MORE CARDS');
                    $('.show_more_cards').removeClass('less');

                }
            }
            else if( $('.show_more_cards').attr('data-action-table')=='0'){

                $('.show_more_cards').attr('data-action-table',1);
                $('.show_more_cards').text('SHOW MORE CARDS');
                $('.show_more_cards').removeClass('less');

            }
            Footnotes.reInit();
        }
        else {
            var chk = $('.table_' + tab + ' .filters_history_options').find('input[type=checkbox]:checked').length;
                if (chk >= 1) {

                var items = $('.products_table_' + tab + ' .product_table');
                var filter_option = $('.table_fil' + tab);
                items.each(function () {

                    if ($(this).attr("data-filter" + pos) == '1') {
                        $(this).addClass('filter_on');
                    }
                });
                filter_option.each(function () {
                    if ($(this).prop('checked') == true) {
                        var pos_checked_fill = $(this).data('position');
                        items.each(function () {

                            if ($(this).attr("data-filter" + pos_checked_fill) == '1') {
                                $(this).removeClass('filter_on');
                            }
                        });
                    }
                });
                var itemhide = $('.products_table_' + tab + ' .product_table:not(.filter_on)');
                var itemCount = $('.products_table_' + tab + ' .product_table:not(.filter_on)').length;
                    $('.tabs .active .col_tab').text(itemCount);
                if (itemCount > 7) {
                    $('.table_' + tab + ' .show_more_cards').show();
                }
                else {
                    $('.table_' + tab + ' .show_more_cards').hide();
                }
                itemhide.each(function (i, elem) {
                    if (i < 7) {
                        $(this).removeClass('hide_product');
                    }
                    else {
                        $(this).addClass('hide_product');
                    }
                });
            }
            else{
                    $(this).prop('checked',true);
                }
            if( $('.show_more_cards').attr('data-action-table')=='1'){

                if($(".products_table_"+$('.show_more_cards').attr('data-table-show')).children(".hide_product").length=='0'){
                    $('.show_more_cards').attr('data-action-table',0);
                    $('.show_more_cards').text('SHOW LESS CARDS');
                    $('.show_more_cards').addClass('less');
                }
                else{
                    $('.show_more_cards').attr('data-action-table',1);
                    $('.show_more_cards').text('SHOW MORE CARDS');
                    $('.show_more_cards').removeClass('less');

                }
            }
            else if( $('.show_more_cards').attr('data-action-table')=='0'){

                $('.show_more_cards').attr('data-action-table',1);
                $('.show_more_cards').text('SHOW MORE CARDS');
                $('.show_more_cards').removeClass('less');

            }
            Footnotes.reInit();
        }


    });
    /*конец фильтрации*/

    /*hide and show card tabs >7*/
    $('.show_more_cards').click(function(e){
        e.preventDefault();

        if( $(this).attr('data-action-table')=='1'){
            var hide=$(".products_table_"+$(this).attr('data-table-show')).children(".hide_product");
            var i=1;
            hide.each(function(i,elem) {
                if (i<7) {
                    $(this).removeClass('hide_product');
                    i++;
                }
                else{
                    return false;
                }
            });
            if($(".products_table_"+$(this).attr('data-table-show')).children(".hide_product").length=='0'){
                $(this).attr('data-action-table',0);
                $(this).text('SHOW LESS CARDS');
                $(this).addClass('less');
            }
            else{
                $(this).attr('data-action-table',1);
                $(this).text('SHOW MORE CARDS');
                $(this).removeClass('less');

            }
            Footnotes.reInit();
        }
        else if( $(this).attr('data-action-table')=='0'){
            var hide=$(".products_table_"+$(this).attr('data-table-show')).children(".product_table");
            var i=1;
            hide.each(function(i,elem) {
                if (i<7) {
                    i++;
                }
                else{
                    $(this).addClass('hide_product');
                }
            });
            $(this).attr('data-action-table',1);
            $(this).text('SHOW MORE CARDS');
            $(this).removeClass('less');
            $('html, body').animate({ scrollTop: $(this).offset().top-300 }, 600);
            Footnotes.reInit();
        }

    });
    /*hide and show card tabs >7*/

    /*hide and show icons attributes*/


    /**/

    $('.blocks_list_about .title').click(function(){
        if($(this).parent().hasClass('open')==false){
            $(this).parent().addClass('open');
            Footnotes.reInit();
        }
        else{
            $(this).parent().removeClass('open');
            Footnotes.reInit();
        }
    });
});
    $(window).resize(function() {
        $('.tabs li').each(function() {
            if (screen.width < 961) {
                $(this).children().children('b').text($(this).attr('data-tabs-title-mobile'));
            }
            else{
                $(this).children().children('b').text($(this).attr('data-tabs-title'));
            }
        });
    });
function tabsConstruction(){
    var itemCount = $('.tabs>li').length;
    var max_height=0;
    var conteiner_width=$('.tabs').width();

    $(".tabs>li").each(function () {
        if ($(this).is(':visible')) {
            var h_block = parseInt($(this).height());
            if (h_block > max_height) {
                max_height = h_block;
            }
        }
    });
    $(".tabs>li").height(max_height);
    $('.tabs').height(max_height+28);


}
