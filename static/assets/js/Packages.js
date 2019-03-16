//Global packages variable
let packages_received = '';

$(document).ready(function () {
    //Scroll the packages functionality
    packages_scroll();
    
    //Updating Global variable with json data
    packages_received = SendRequest('GET', {}, '/get_packages', false);

    console.log('The size of packages json is ' + memorySizeOf(packages_received));
for(let c=0; c<=9; c++){
    for(let x=0; x<packages_received.length; x++){
        let package_photo = 'T_' + packages_received[x].photo.photos[0].photo_name + '.jpeg';
        let package_name = packages_received[x].name
        let package_category = packages_received[x].category
        let package_details = packages_received[x].details

        let category_html = ''
        for(let x=0; x<package_category.length; x++){
            if (package_category[x] == 'Family'){
                _html = '<span class="family_span"><b>Family</b></span>'
                category_html = category_html + _html
            }else if(package_category[x] == 'Corporate'){
                _html = '<span class="corporate_span"><b>Corporate</b></span>'
                category_html = category_html + _html
            }else if(package_category[x] == 'Solo'){
                _html = '<span class="solo_span"><b>Solo</b></span>'
                category_html = category_html + _html
            }else{
                _html = '<span class="friends_span"><b>Friends</b></span>'
                category_html = category_html + _html
            }
        }

        console.log(category_html)

        $('.articles').append('<div style="box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19);" class="package' + packages_received[x].destination_id + '_id"><div class="package' + packages_received[x].destination_id + '"> '
        + '<img class="package_photo" src="static/thumbnails/' + package_photo + '" alt="' + package_name + '"> '
        + '<div class="package_body">'
            + '<center><h4>' + package_name + '</h4></center>'
                + '<p class="category">' + category_html + '</p>'
            + '<div class="">'
                + '<p class="package_details">' + package_details + '</p>'
            + '</div>'
            + '<div class="col-sm-2">'
                + '<a href="#section-packages" class="go_to_second_page" onclick="loadPackage(' + packages_received[x].package_id + '), addBottomPackageCategoriesToModal(' + packages_received[x].package_id + ')"><i class="fa fa-chevron-right fa-2x" style="color:rgb(170, 0, 0);"></i></a>'
            + '</div>'
        + '</div>'
    + '</div></div>');

        // $('.articles').append('<div>'
        //   + '<div class="media probootstrap-media d-block align-items-stretch mb-4 probootstrap-animate">'
          
        //   + '<div class="go_to_third_page module mid destination_item img-fluid" style="width:100%; background-image: url(static/thumbnails/' + package_photo + ')" onclick="loadDestination(' + destinations_received[x].destination_id + ')">'
        //          + '<h2>' + package_name + '</h2>'
        //          + '</div>'

        //     + '<div class="media-body">'
        //       + '<h5 class="mb-3">02. Service Title Here</h5>'
        //       + '<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. </p>'
        //     + '</div>'
        //   + '</div>'
        // + '</div>'
        // + '<!-- END slide item -->');
    } 
}
});