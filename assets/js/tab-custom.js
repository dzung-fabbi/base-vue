$("document").ready(function () {
    $(".tab-slider--body").hide();
    $(".tab-slider--body:first").show();
});
$(".tab-slider--nav li").click(function () {
    $(".tab-slider--body").hide();
    let activeTab = $(this).attr("rel");
    $("#" + activeTab).fadeIn();
    if ($(this).attr("rel") === "tab1") {
        $(".tab-slider--body:first").show();
        $('.tab-slider--tabs').removeClass('slide');
    } else if ($(this).attr("rel") === "tab2") {
        $('.tab-slider--tabs').addClass('slide');
        $(".tab-slider--body:nth-child(2)").show();
    } else {
        $('.tab-slider--tabs').addClass('slide');
        $(".tab-slider--body:last-child").show();
    }
    $(".tab-slider--nav li").removeClass("active");
    $(this).addClass("active");
});
