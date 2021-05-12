$('.sub-menu ul').hide();
$(".sub-menu a").click(function () {
    $(this).parent(".sub-menu").children("ul").slideToggle("100");
    $(this).find(".right").toggleClass("fa-chevron-up fa-chevron-down");
    $(this).parent(".sub-menu").addClass('active');
});
$(function () {
    // $('#datepicker').datepicker({
    //     format: 'mm/dd/yyyy',
    //     startDate: '-3d'
    // });
});
