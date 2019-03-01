function loadPackage(package_id){
    $(".first_page").hide();
    $(".second_page").show();

    let package_index = package_id - 1;

    $(".image1").css("background-image", "url('static/real_images/" + packages_received[package_index].photo.photos[0].photo_name + ".jpeg')");
    $(".image2").css("background-image", "url('static/real_images/" + packages_received[package_index].photo.photos[1].photo_name + ".jpeg')");
    $(".image3").css("background-image", "url('static/real_images/" + packages_received[package_index].photo.photos[2].photo_name + ".jpeg')");



    $(".image1_div").attr("src", 'static/real_images/' + packages_received[package_index].photo.photos[0].photo_name + '.jpeg');
    $(".image2").attr("src", 'static/real_images/' + packages_received[package_index].photo.photos[1].photo_name + '.jpeg');
    $(".image3").attr("src", 'static/real_images/' + packages_received[package_index].photo.photos[2].photo_name + '.jpeg');

    $(".package_title").html(packages_received[package_index].name);
    $(".package_details").html(packages_received[package_index].details);
    $(".package_category").html(packages_received[package_index].category);
    $(".package_price").html(packages_received[package_index].price);
    $(".package_duration").html(packages_received[package_index].duration);
    $(".package_expiry").html(packages_received[package_index].expiry_date);

    let itinerary = packages_received[package_index].itinerary.itinerary;
    let itinerary_rows = '';
    for(let x=0; x<itinerary.length; x++){
        itinerary_rows = itinerary_rows + '<button class="collapsible">' + itinerary[x].itinerary_title + '</button>'
                + '<div class="content">'
                + '<p><div style="width:40%; float:left;"><img class="img-fluid" src="static/real_images/' + itinerary[x].itinerary_photo + '.jpeg"/></div><div style="width:60%; float:left;">' + itinerary[x].itinerary_details + '</div></p>'
                + '</div>';
        //itinerary_rows = itinerary_rows + '<tr><td>' + itinerary[x].itinerary_title + '</td><td>' + '<img class="img-fluid" src="static/real_images/' + itinerary[x].itinerary_photo + '.jpeg"/> </td><td>' + itinerary[x].itinerary_details + '</td></tr>';
    }
    
    $(".package_itinerary").html(itinerary_rows);

//Collapsible
let coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
coll[i].addEventListener("click", function() {
this.classList.toggle("active");
let content = this.nextElementSibling;
if (content.style.display === "block") {
content.style.display = "none";
} else {
content.style.display = "block";
}
});
}


}

//Global packages variable
        let packages_received = '';


        $(document).ready(function () {
            //Hide second page
            $(".second_page").hide();

            //let scroll_width = $(".item").width() + $(".item").css('padding-right') + $(".item").css('padding-left');
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




            let destination_scroll_width = $(".destination_item").innerWidth();
            $(".destination_leftArrow").click(function () {
                let destination_leftPos = $('.destination_articles').scrollLeft();
                $(".destination_articles").animate({
                    scrollLeft: destination_leftPos - $(".destination_item").innerWidth()
                }, 800);
            });

            $(".destination_rightArrow").click(function () {
                let destination_leftPos = $('.destination_articles').scrollLeft();
                $(".destination_articles").animate({
                    scrollLeft: destination_leftPos + $(".destination_item").innerWidth()
                }, 800);
            });



            //Picking the Package JSON data from database
            //Function to send request to the server and get a response
function SendRequest(request_method, data, url, async){
    let the_data = '';

    $.ajax({
        type: request_method,
        data: data,
        contentType: 'application/json',
        url: url,						
        success: function(data) {
            the_data = data
        },
        async: async
    });

    //return the_data[1].photo.photos[0].photo_name
    return the_data;
}

packages_received = SendRequest('GET', {}, '/get_packages', false)
for(let x=0; x<packages_received.length; x++){
    let package_photo = 'T_' + packages_received[x].photo.photos[0].photo_name + '.jpeg';
    let package_name = packages_received[x].name
    let package_category = packages_received[x].category
    let package_details = packages_received[x].details
    console.log(packages_received[x])
    $('.articles').append('<div class="col-xs-6 col-sm-4 col-md-3 item">'
    + '<a href="#"><img class="img-fluid" src="static/thumbnails/' + package_photo + '"></a>'
    + '<h3 class="name">' + package_name + '</h3>'
    + '<p class="category">' + package_category + '</p>'
    + '<p class="description">' + package_details + '</p>'
    + '<a href="#openModal" class="action" onclick="loadPackage(' + packages_received[x].package_id + ')"><i class="fa fa-arrow-circle-right" style="color:rgb(55,126,63);"></i></a>'
    + '</div>');
}



// Create the Destinations card
destinations_received = SendRequest('GET', {}, '/get_destinations', false)
for(let x=0; x<destinations_received.length; x++){
    let destination_photo = 'T_' + destinations_received[x].destination_image + '.jpeg';
    let destination_name = destinations_received[x].destination_name

    console.log(destinations_received[x]);

    $('.destination_articles').append('<div class="col-xs-6 col-sm-4 col-md-3 destination_item">'
    + '<a href="#"><img class="img-fluid" src="static/thumbnails/' + destination_photo + '"></a>'
    + '<h3 class="name">' + destination_name + '</h3>'
    + '</div>');
}
        });