$(document).ready(function () {
    $('#show-password').on('click', function () {
        $(this).addClass('hidden');
        $('#hide-password').removeClass('hidden');
        $('#password').attr("type", "text");
    });
    $('#hide-password').on('click', function () {
        $(this).addClass('hidden');
        $('#show-password').removeClass('hidden');
        $('#password').attr("type", "password");
    });
})
