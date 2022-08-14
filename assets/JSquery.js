
$(document).ready(function () {
    $(window).on('scroll', function () {
        if ($(window).scrollTop()) {
            $("header").addClass('anim');
            $(".nav-links").addClass('anim1');
            $(".aenni").addClass('text-dark');
        } else {
            $("header").removeClass('anim');
            $(".nav-links").removeClass('anim1');
            $(".aenni").removeClass('text-dark');
        }
    });
});

$(document).ready(function(){
    $('.option').click(function(){
        $('.option').removeClass('active');
        $(this).addClass('active');
    });
});