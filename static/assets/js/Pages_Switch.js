function controlTheBackFunction(){
    window.onpopstate = function() {
        if(backStatus==0){
            backStatus = 1
        }else{
            // First hide all pages to avoid conflict
            $(".first_page").hide()
            $(".second_page").hide()
            $(".third_page").hide()

            // Then show previous page
            previous_page.show();
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
    }; history.pushState({}, '');
}

let backStatus = 1

let current_page = 1
let previous_page = $(".first_page")

function protectBackFunctionFromFiring(){
    
}
function HandleBackFunctionality()
{
    if(window.event)
   {
        // if(window.event.clientX < 40 && window.event.clientY < 0)
        // {
        //     if(backStatus==0){

        //     }else{
        //         alert("Browser back button is clicked... : Backstatus is "+backStatus);
        //     }
        // }
        // else
        // {
        //     alert("Browser refresh button is clicked...");
        // }

        if(window.event) //Internet Explorer
        {
            alert("Browser back button is clicked on Internet Explorer...");
        }
        else //Other browsers e.g. Chrome
        {
            alert("Browser back button is clicked on other browser...");
        }
    }
    else
    {
        if(event.currentTarget.performance.navigation.type == 1)
        {
             alert("Browser refresh button is clicked...");
        }
        if(event.currentTarget.performance.navigation.type == 2)
        {
             alert("Browser back button is clicked...");
        }
    }
}


$(document).ready(function () {
    //Hide second and third page
    $(".second_page").hide();
    $(".third_page").hide();

    // Hide all packages
    $(".go_to_first_page").click(function () {
        $(".package_heading").html('Holiday Packages');
        previous_page = 1
        // Hide all packages and show them to avoid conflict
        $('.item').hide()
        $('.item').show()

        //Unhide all packages
        $('.owl-stage').children().children().parent().show()


        $(".first_page").show();
        $(".second_page").hide();
        $(".third_page").hide();

        // Updating the history list for the back function
        previous_page = current_page
        current_page = $(".first_page")
    });

    $(".go_to_second_page").click(function () {
        $(".second_page").show();
        $(".first_page").hide();
        $(".third_page").hide();

        // Updating the history list for the back function
        previous_page = current_page
        current_page = $(".second_page")
    });

    $(".go_to_third_page").click(function () {
        $(".third_page").show();
        $(".first_page").hide();
        $(".second_page").hide();

        // Updating the history list for the back function
        previous_page = current_page
        current_page = $(".third_page")
    });

    // Control the back function
    controlTheBackFunction()

    $('a').click(function () {
        backStatus = 0
    });
});