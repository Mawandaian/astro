$(document).ready(function () {
    //Hide second and third page
    $(".second_page").hide();
    $(".third_page").hide();

    // Hide all packages
    $(".go_to_first_page").click(function () {
        // Hide all packages and show them to avoid conflict
        $('.item').hide()
        $('.item').show()

        $(".first_page").show();
        $(".second_page").hide();
        $(".third_page").hide();
    });

    $(".go_to_second_page").click(function () {
        $(".second_page").show();
        $(".first_page").hide();
        $(".third_page").hide();
    });

    $(".go_to_third_page").click(function () {
        $(".third_page").show();
        $(".first_page").hide();
        $(".second_page").hide();
    });
});