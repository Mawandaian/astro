//Global packages variable
let packages_received = '';

$(document).ready(function () {
    //Scroll the packages functionality
    packages_scroll();
    
    //Updating Global variable with json data
    packages_received = SendRequest('GET', {}, '/get_packages', false);



    console.log('The size of packages json is ' + memorySizeOf(packages_received));
    for(let x=0; x<packages_received.length; x++){
        let package_photo = ''

        for(let first_photo=0; first_photo<packages_received[x].photo.photos.length; first_photo++){
            if(packages_received[x].photo.photos[first_photo].photo_id=='photo_id1'){
                package_photo = 'T_' + packages_received[x].photo.photos[first_photo].photo_name + '.jpeg';
            }
        }

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
                + '<a href="#section-packages" class="go_to_second_page" onclick="loadPackage(' + packages_received[x].package_id + '), addBottomPackageCategoriesToModal(' + packages_received[x].package_id + ')"><span class="btn btn-success"><b>View Package</b></span></a>'
            + '</div>'
        + '</div>'
    + '</div></div>');
    }
});