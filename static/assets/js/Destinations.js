//Global packages variable
let destinations_received = '';

$(document).ready(function () {
    
    
    // Updating Global variable with json data
    destinations_received = SendRequest('GET', {}, '/get_destinations', false);

    console.log('The size of destination json is ' + memorySizeOf(destinations_received));

    for(let x=0; x<destinations_received.length; x++){
        let destination_photo = 'T_' + destinations_received[x].destination_image + '.jpeg';
        let destination_name = destinations_received[x].destination_name
        
        $('.destination_articles').append('<div>'
            + '<div class="media probootstrap-media d-block align-items-stretch mb-4 probootstrap-animate">'
                + '<div class="go_to_third_page module mid destination_item img-fluid" style="width:100%; background-image: url(static/thumbnails/' + destination_photo + ')" onclick="loadDestination(' + destinations_received[x].destination_id + ')">'
                        + '<h2>' + destination_name + '</h2>'
                        + '</div>'
                + '</div>'
            + '</div>'
            + '<!-- END slide item -->'
        );
    }

});