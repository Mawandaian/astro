// Function to rate
function rate(rate,limit){
    let rate_html = ""
    for(let x=1; x<=rate; x++){
        rate_html = rate_html + '<span class="fa fa-star checked"></span>';
    }
    for(let y=rate; y<limit; y++){
        rate_html = rate_html + '<span class="fa fa-star"></span>';
    }
    return rate_html
}

// Function to load second page
function loadDestination(destination_id){

    let destination_index = destination_id - 1;

    //console.log(destinations_received[destination_index])

    $(".destination_image1").css("background-image", "url('static/real_images/" + destinations_received[destination_index].destination_image + ".jpeg')");

    $(".final_destination_image").attr("src", 'static/real_images/' + destinations_received[destination_index].destination_image + '.jpeg');
    
    $(".hero-title").html(destinations_received[destination_index].destination_name);

    // console.log(destinations_received[destination_index].destination_categories.corporate)

    let tab_counter = 1

    $("#tabs").html('')
    for(let i in destinations_received[destination_index].destination_categories){
        let key = i;

        $("#tab-button").append('<li><a href="#tab0' + tab_counter + '">' + i + '</a></li>');
        $("#tab-select").append('<option value="#tab0' + tab_counter + '">' + i + '</option>');

        let table_elements = '<tr><th>Hotel</th><th>Price</th><th>Rating</th></tr>'
        for(let tr in destinations_received[destination_index].destination_categories[i][0]){
            table_elements = table_elements + '<tr><td>' + destinations_received[destination_index].destination_categories[i][0][tr][0] + '</td><td>' + destinations_received[destination_index].destination_categories[i][0][tr][1] + '</td><td>' + rate(parseInt(destinations_received[destination_index].destination_categories[i][0][tr][2]),5) + '</td></tr>'
        }

        $(".tabs").append('<div id="tab0' + tab_counter + '" class="tab-contents"></div>')
        $("#tab0" + tab_counter).html('<div id="tab0' + tab_counter + 'class="tab-contents">'
        + '<h2>' + i + '</h2>'
        + '<table class="table table-striped">' + table_elements + '</table>'
      + '</div>')

      tab_counter++

        var val = destinations_received[destination_index].destination_categories[i];
        console.log(destinations_received[destination_index].destination_categories[i+'_name_1'])
    }

    $(".destination_details").html(destinations_received[destination_index].details);
    $(".destination_category").html(destinations_received[destination_index].category);
    $(".destination_price").html(destinations_received[destination_index].price);
    $(".destination_duration").html(destinations_received[destination_index].duration);
    $(".destination_expiry").html(destinations_received[destination_index].expiry_date);


    // Function to hide packages that do not belong to that destination
    FunctionsShowDestinationPackagesHideTheRest(destination_id)

    // let itinerary = destinations_received[destination_index].itinerary.itinerary;
    // let itinerary_rows = '';
    // for(let x=0; x<itinerary.length; x++){
    //     itinerary_rows = itinerary_rows + '<button class="collapsible">' + itinerary[x].itinerary_title + '</button>'
    //             + '<div class="content">'
    //             + '<p><div style="width:40%; float:left;"><img class="img-fluid" src="static/real_images/' + itinerary[x].itinerary_photo + '.jpeg"/></div><div style="width:60%; float:left;">' + itinerary[x].itinerary_details + '</div></p>'
    //             + '</div>';
    // }
    
    // $(".destination_itinerary").html(itinerary_rows);

    // Getting packages in that destination

    //Updating Global variable with json data
    //packages_received = SendRequest('GET', {}, '/get_packages, false);

    // for(let x=0; x<packages_received.length; x++){
    //     if(packages_received[x].destination_id == destination_id){
    //         let package_photo = 'T_' + packages_received[x].photo.photos[0].photo_name + '.jpeg';
    //         let package_name = packages_received[x].name
    //         let package_category = packages_received[x].category
    //         let package_details = packages_received[x].details

    //         $('.articles').html('')
            
    //         $('.articles').append('<div class="col-xs-6 col-sm-4 col-md-3 item">'
    //         + '<a href="#"><img class="img-fluid" src="static/thumbnails/' + package_photo + '"></a>'
    //         + '<h3 class="name">' + package_name + '</h3>'
    //         + '<p class="category">' + package_category + '</p>'
    //         + '<p class="description">' + package_details + '</p>'
    //         + '<p class="go_to_second_page" onclick="loadPackage(' + packages_received[x].package_id + ')"><i class="fa fa-arrow-circle-right" style="color:rgb(55,126,63);"></i></p>'
    //         + '</div>');
    //     }
    // }
    

    $(function() {
        var $tabButtonItem = $('#tab-button li'),
            $tabSelect = $('#tab-select'),
            $tabContents = $('.tab-contents'),
            activeClass = 'is-active';
      
        $tabButtonItem.first().addClass(activeClass);
        $tabContents.not(':first').hide();
      
        $tabButtonItem.find('a').on('click', function(e) {
          var target = $(this).attr('href');
      
          $tabButtonItem.removeClass(activeClass);
          $(this).parent().addClass(activeClass);
          $tabSelect.val(target);
          $tabContents.hide();
          $(target).show();
          e.preventDefault();
        });
      
        $tabSelect.on('change', function() {
          var target = $(this).val(),
              targetSelectNum = $(this).prop('selectedIndex');
      
          $tabButtonItem.removeClass(activeClass);
          $tabButtonItem.eq(targetSelectNum).addClass(activeClass);
          $tabContents.hide();
          $(target).show();
        });
      });
}