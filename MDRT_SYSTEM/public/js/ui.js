// Document Ready
$(function() {
    
    // header menu operate
    $('.header .tp .menu-d1 > ul > li > a').mouseenter(function(){
        $('.header .tp .menu-d1 > ul > li').removeClass('active');
        $(this).parent().addClass('active');
    });
    
    // lnb moving
    $('.lnb-bx-btn').click(function(){
        $('.lnb').toggleClass('active');
        $('.cont-box').toggleClass('active');
        $('.lnb-bx-btn').toggleClass('active');
    });
   
    // right hidden menu moving
    $('.rh-bx-btn').click(function(){
        $('.right-hidden').toggleClass('active');
        $('.rh-bx-btn').toggleClass('active');
    });
    
    // datetimepicker
    $('.datepicker').datepicker({
        todayHighlight: true,
        autoclose: true,
        format: "yyyy/mm/dd",
        language: "kr"
    });
});