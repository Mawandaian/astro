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
    let package_index = package_id - 1;

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

    let itinerary = packages_received[package_index].itinerary.itinerary;
    let itinerary_rows = '';
    for(let x=0; x<itinerary.length; x++){
        itinerary_rows = itinerary_rows + '<button class="collapsible active_collapsible">' + itinerary[x].itinerary_title + '</button>'
                + '<div class="content">'
                + '<p><div style="width:40%; float:left;"><img class="img-fluid" src="static/real_images/' + itinerary[x].itinerary_photo + '.jpeg"/></div><div style="width:60%; float:left; padding: 10px;">' + itinerary[x].itinerary_details + '</div></p>'
                + '</div>';
    }
    
    $(".package_itinerary").html(itinerary_rows);

    // Making itinerary collapsible
    make_items_collapsible();
}