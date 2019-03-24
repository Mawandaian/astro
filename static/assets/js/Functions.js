//functio
function bubblesort(array){
    let swapped;
    do{
        swapped=false;
        for(let i=0; i<array.length; i++){
            if(array[i] && array[i+1] && array[i] > array[i+1]){
                swap(array,i,i+1);
                swapped = true;
            }
        }
    }while(swapped);
    return array;
}

//Function to send request to the server and get a response using jquery AJAX
function SendRequest(request_method, data, url, async){
    let the_data = '';

    $.ajax({
        type: request_method,
        data: data,
        contentType: 'application/json',
        processData: false,
        contentType: false,
        url: url,						
        success: function(data) {
            the_data = data
        },
        failure: function (response) {
            alertbox.show("Something went wrong, try sending again please");
        },
        async: async
    });

    return the_data;
}


//Function to send request to the server and get a response using jquery AJAX
function SendEmailAjaxRequest(request_method, form_object, data, url, async){
    let the_data = '';

    $.ajax({
        type: request_method,
        data: data,
        contentType: 'application/json',
        processData: false,
        contentType: false,
        url: url,
        beforeSend: function(){
            // Show image container
            $(".send_email_gif").show();
           },						
        success: function(data) {
            the_data = data
            $("#openModal").hide()
            alertbox.show("Your Email has been successfully sent, we shall get back to you in a few");
        },
        failure: function (response) {
            alertbox.show("Something went wrong, try sending again please");
        },
        complete:function(data){
            // Hide image container
            $(".send_email_gif").hide();

            // Then reset form
            form_object.reset()
           },
        async: async
    });

    return the_data;
}

// Function to send booking email to admin
function send_booking_email(package_id){
    let form = document.getElementById("booking_form");

    let formdata = new FormData(form);

    for(let package in packages_received){
        if(package_id == packages_received[package].package_id){
            formdata.append('id',packages_received[package].package_id)
            formdata.append('name',packages_received[package].name)
            formdata.append('destination',packages_received[package].destination_id)
            formdata.append('details',packages_received[package].details)    
        }
    }

    // Send the email
    SendEmailAjaxRequest('POST', form, formdata, '/send_email', true);
}

function send_message_email(){
    let form = document.getElementById("message_form");
    let formdata = new FormData(form);

    // Send the email
    console.log(SendEmailAjaxRequest('POST', form, formdata, '/send_message_email', true));
}

// Function to scroll Packages horizontally
function packages_scroll(){
    let scroll_width = $(".item").innerWidth() ;

    $(".leftArrow").click(function () {
        let leftPos = $('.articles').scrollLeft();
        $(".articles").animate({
            scrollLeft: leftPos - scroll_width
        }, 800);
    });

    $(".rightArrow").click(function () {
        let leftPos = $('.articles').scrollLeft();
        $(".articles").animate({
            scrollLeft: leftPos + scroll_width
        }, 800);
    });
}

// Function to scroll Packages vertically
function destinations_scroll(){
    let destination_scroll_width = $(".destination_item").innerWidth() ;
    let leftPosl = $('.destination_articles').scrollLeft();

    $(".destination_leftArrow").click(function () {
        $(".destination_articles").animate({
            scrollLeft: leftPosl - destination_scroll_width
        }, 800);
        leftPosl = leftPosl - destination_scroll_width
    });

    $(".destination_rightArrow").click(function () {
        $(".destination_articles").animate({
            scrollLeft: leftPosl + destination_scroll_width
        }, 800);
        leftPosl = leftPosl + destination_scroll_width
    });
}

// Function to get size of javascript objects
function memorySizeOf(obj) {
    var bytes = 0;

    function sizeOf(obj) {
        if(obj !== null && obj !== undefined) {
            switch(typeof obj) {
            case 'number':
                bytes += 8;
                break;
            case 'string':
                bytes += obj.length * 2;
                break;
            case 'boolean':
                bytes += 4;
                break;
            case 'object':
                var objClass = Object.prototype.toString.call(obj).slice(8, -1);
                if(objClass === 'Object' || objClass === 'Array') {
                    for(var key in obj) {
                        if(!obj.hasOwnProperty(key)) continue;
                        sizeOf(obj[key]);
                    }
                } else bytes += obj.toString().length * 2;
                break;
            }
        }
        return bytes;
    };

    function formatByteSize(bytes) {
        if(bytes < 1024) return bytes + " bytes";
        else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KiB";
        else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MiB";
        else return(bytes / 1073741824).toFixed(3) + " GiB";
    };

    return formatByteSize(sizeOf(obj));
};

// Function to hide the other packages that do not belong to that destination
function FunctionsShowDestinationPackagesHideTheRest(destination_id){
    // Hide all packages
    $('.item').hide()

    //Show only packages from that destination
    $('.'+destination_id).show();
}