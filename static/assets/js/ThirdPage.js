let variable_to_store_destination_id_for_page_one_to_show_all = 0

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
    // Scroll to top of page
    $("html, body").animate({ scrollTop: 0 }, "slow");

    let destination_index = 0;

    // Getting the real destination id from json object such that it is perfect
    for(value in destinations_received){
        if(destination_id == destinations_received[value].destination_id){
            destination_index = value;
        }
    }

    //console.log(destinations_received[destination_index])

    $(".destination_image1").css("background-image", "url('static/real_images/" + destinations_received[destination_index].destination_image + ".jpeg')");

    $(".final_destination_image").attr("src", 'static/real_images/' + destinations_received[destination_index].destination_image + '.jpeg');
    
    $(".hero-title").html(destinations_received[destination_index].destination_name);

    // console.log(destinations_received[destination_index].destination_categories.corporate)

    let tab_counter = 1

    $("#tabs").html('')
    $("#tab-button").html('')
    $("#tab-select").html('')
    for(let i in destinations_received[destination_index].destination_categories){
        let key = i;

        $("#tab-button").append('<li><a href="#tab0' + tab_counter + '">' + i.charAt(0).toUpperCase() + i.slice(1) + '</a></li>');
        $("#tab-select").append('<option value="#tab0' + tab_counter + '">' + i + '</option>');

        let table_elements = '<tr><th>Hotel</th><th>Rating</th></tr>'
        for(let tr in destinations_received[destination_index].destination_categories[i][0]){
            table_elements = table_elements + '<tr><td>' + destinations_received[destination_index].destination_categories[i][0][tr][0] + '</td><td>' + rate(parseInt(destinations_received[destination_index].destination_categories[i][0][tr][2]),5) + '</td></tr>'
        }

        $(".tabs").append('<div id="tab0' + tab_counter + '" class="tab-contents"></div>')
        $("#tab0" + tab_counter).html('<div id="tab0' + tab_counter + 'class="tab-contents">'
        + '<center><h2>Top ' + i.charAt(0).toUpperCase() + i.slice(1) + ' Hotels</h2></center>'
        + '<table class="table table-striped">' + table_elements + '</table>'
      + '</div>')

      tab_counter++

        var val = destinations_received[destination_index].destination_categories[i];
        console.log(destinations_received[destination_index].destination_categories[i+'_name_1'])
    }

    $(".destination_details").html(destinations_received[destination_index].details);
    $(".destination_category").html(destinations_received[destination_index].category);
    // $(".destination_price").html(destinations_received[destination_index].price);
    $(".destination_duration").html(destinations_received[destination_index].duration);
    $(".destination_expiry").html(destinations_received[destination_index].expiry_date);
    $(".package_heading").html('Holiday Packages in ' + destinations_received[destination_index].destination_name);

    // First hide all items and then show those from the chosen destination
    $('.owl-stage').children().children().parent().hide()
    $('.owl-stage').children().children('.package' + destination_id + '_id').parent().show()
    
    variable_to_store_destination_id_for_page_one_to_show_all = destination_id



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