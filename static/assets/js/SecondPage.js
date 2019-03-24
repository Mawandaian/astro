// Function to hide loading gif
$('.send_email_gif').hide();

// This is a variable that is going to hold the package value such that we avoid modal page conflicts
let package_id_holder = 0

function setGlobalIdHolder(new_value){
    package_id_holder = new_value;
};

// Variable to check if it is upper section package selected or not
let top_section_package = 0

function setTopSectionPackage(new_value){
    top_section_package = new_value;
};

// Variable to check if it is destination selected or not
let package_destination_id = 0

function setPackageDestinationId(new_value){
    package_destination_id = new_value;
};

function make_items_collapsible(){
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

// Function to load second page
function loadPackage(package_id){
    let package_index = 0;

    // Getting the real destination id from json object such that it is perfect
    for(value in packages_received){
        if(package_id == packages_received[value].package_id){
            package_index = value;
        }
    }

    // Updating the package id holder variable with the package id
    setGlobalIdHolder(packages_received[package_index].package_id)
    //setPackageDestinationId(packages_received[package_index].destination_id)

    let category_html = ''
        for(let x=0; x<packages_received[package_index].category.length; x++){
            if (packages_received[package_index].category[x] == 'Family'){
                _html = '<span class="family_span"><b>Family</b></span>'
                category_html = category_html + _html
            }else if(packages_received[package_index].category[x] == 'Corporate'){
                _html = '<span class="corporate_span"><b>Corporate</b></span>'
                category_html = category_html + _html
            }else if(packages_received[package_index].category[x] == 'Solo'){
                _html = '<span class="solo_span"><b>Solo</b></span>'
                category_html = category_html + _html
            }else{
                _html = '<span class="friends_span"><b>Friends</b></span>'
                category_html = category_html + _html
            }
        }

    $(".image1").css("background-image", "url('static/real_images/" + packages_received[package_index].photo.photos[0].photo_name + ".jpeg')");
    $(".image2").css("background-image", "url('static/real_images/" + packages_received[package_index].photo.photos[1].photo_name + ".jpeg')");
    $(".image3").css("background-image", "url('static/real_images/" + packages_received[package_index].photo.photos[2].photo_name + ".jpeg')");

    $(".image1_div").attr("src", 'static/real_images/' + packages_received[package_index].photo.photos[0].photo_name + '.jpeg');
    
    $(".hero-title").html(packages_received[package_index].name);
    $(".second_page_package_details").html(packages_received[package_index].details);
    $(".package_category").html(category_html);
    $(".package_price").html(packages_received[package_index].price);
    $(".package_duration").html(packages_received[package_index].duration);
    $(".package_expiry").html(packages_received[package_index].expiry_date);
    $(".package_heading").html('Holiday Packages');
    

    let itinerary = packages_received[package_index].itinerary.itinerary;
    
    let sorted_itinerary = Array();

    for(let x=0; x<itinerary.length; x++){

        sorted_itinerary[itinerary[x].itinerary_id] = {'id':itinerary[x].itinerary_id, 'title':itinerary[x].itinerary_title,'photo':itinerary[x].itinerary_photo,'details':itinerary[x].itinerary_details}
    }

    // Remove first element
    sorted_itinerary.shift()
    
    $("#accordion").children().remove()
    $("#accordion").accordion("refresh");
    
    for(let x=0; x<sorted_itinerary.length; x++){
        $("#accordion").append('<h3>' + sorted_itinerary[x].title + '</h3><div class="content"><p><div style="width:40%; float:left;"><img class="img-fluid" src="static/real_images/' + sorted_itinerary[x].photo + '.jpeg"/></div><div style="width:60%; float:left; padding: 10px;">' + sorted_itinerary[x].details + '</div></p></div>')
        $("#accordion").accordion("refresh")

        // Automatically adjust the panel heights
        $("#accordion").accordion({heightStyle: 'panel'});
    }
}