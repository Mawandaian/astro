function setParametersId(){
    return document.getElementById('destination_holder').value
}

function get_destinations(){
    // Get Destinations
    destinations = SendRequest('GET', '', '/get_destinations', false);
    
    let destination_holder = document.getElementById('destinations')
    let options = ''

    for(let x=0; x<destinations.length; x++){
        options = options + '<option value="'+destinations[x].destination_id+'">'+destinations[x].destination_name+'</option>'
        console.log('Dest: ',destinations[x].destination_id, destinations[x].destination_name)
    }

    destination_holder.innerHTML = options
}


function setPackagesId(){
    return document.getElementById('package_holder').value
}

function get_packages(){
    // Get Destinations
    packages = SendRequest('GET', '', '/get_packages', false);
    
    let package_holder = document.getElementById('packages')
    let options = ''

    for(let x=0; x<packages.length; x++){
        options = options + '<option value="'+packages[x].package_id+'">'+packages[x].name+'</option>'
        console.log('Dest: ',packages[x].package_id, packages[x].name)
    }

    package_holder.innerHTML = options
}


//get image dataurl
function getBase64FromImageUrl(url, textarea_holder) {
    var img = new Image();
    
    img.setAttribute('crossOrigin', 'anonymous');
    
    img.onload = function () {
    var canvas = document.createElement("canvas");
    canvas.width =this.width;
    canvas.height =this.height;
    
    var ctx = canvas.getContext("2d");
    ctx.drawImage(this, 0, 0);
    
    var dataURL = canvas.toDataURL("image/jpeg");
    textarea_holder.value = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    };
    
    img.src = url;
    } 

function edit_destination(destination_id){
    let formdata = new FormData();
    formdata.append('destination_id', destination_id)

    destination_details = SendRequest('POST', formdata, '/get_single_destination', false);

    document.getElementById('new_destination').value = destination_details[0].destination_name
    document.getElementById('preview_destination_increment_1').src = 'static/thumbnails/T_' + destination_details[0].destination_image + '.jpeg';

    getBase64FromImageUrl('static/real_images/' + destination_details[0].destination_image + '.jpeg', document.getElementById('photo_data_uri_destination_increment_1'));
    
    for(category in destination_details[0].destination_categories){

        document.getElementById('destination_id').setAttribute('value', destination_details[0].destination_id);

        for(single_category in destination_details[0].destination_categories[category]){
            let number = 1
            for(category_name in destination_details[0].destination_categories[category][single_category]){
                document.getElementById(category_name).value = destination_details[0].destination_categories[category][single_category][category_name][0]
                document.getElementById(category + '_rating_'+number).value = destination_details[0].destination_categories[category][single_category][category_name][1]
                

                number++
            }
        }
    }

    // change id
    document.getElementById('edit_destination_variable').setAttribute('value', '1');

    console.log('Here: ',destination_details)
}

function delete_destination(destination_id){
    let formdata = new FormData();
    formdata.append('destination_id', destination_id)

    package_details = SendRequest('POST', formdata, '/delete_single_destination', false);
    
}


function edit_package(package_id){
    let formdata = new FormData();
    formdata.append('package_id', package_id)

    package_details = SendRequest('POST', formdata, '/get_single_package', false);

    document.getElementById('package_name').value = package_details[0].package_name;
    document.getElementById('duration').value = package_details[0].duration;
    document.getElementById('price').value = package_details[0].price;
    document.getElementById('destination').value = package_details[0].destination_id;
    document.getElementById('details').value = package_details[0].details;
    document.getElementById('expiry_date').value = package_details[0].expiry_date;

    document.getElementById('package_id').setAttribute('value', package_details[0].package_id);

    for(category in package_details[0].category){
        document.getElementById(package_details[0].category[category]).checked = true;
    }
    
//////////////////////////////////////////////////////////
    let package_photos = Array();
    for(photo in package_details[0].photo.photos){
        package_photos[package_details[0].photo.photos[photo].photo_id.substring(8)] = {'id':package_details[0].photo.photos[photo].photo_id, 'name':package_details[0].photo.photos[photo].photo_name}  
    }
    package_photos.shift()

    let pt = 0
    for(let x=0; x<package_photos.length; x++){
        pt = x+1
        addImageTagsFunction(increment(), 'photo_holder')
        // Update image textareas
        getBase64FromImageUrl('static/real_images/' + package_photos[x].name + '.jpeg', document.getElementById('photo_data_uri_'+pt));
        document.getElementById('preview_'+pt).src = 'static/thumbnails/T_' + package_photos[x].name + '.jpeg';
    }
//////////////////////////////////////////////////////

    let sorted_itinerary = Array();
    for(itinerary in package_details[0].itinerary.itinerary){
        sorted_itinerary[package_details[0].itinerary.itinerary[itinerary].itinerary_id] = {'id':package_details[0].itinerary.itinerary[itinerary].itinerary_id, 'title':package_details[0].itinerary.itinerary[itinerary].itinerary_title,'photo':package_details[0].itinerary.itinerary[itinerary].itinerary_photo,'details':package_details[0].itinerary.itinerary[itinerary].itinerary_details}        
    }
    sorted_itinerary.shift()

    let ct = 0
    for(let x=0; x<sorted_itinerary.length; x++){
        ct = x+1
        addItineraryTagsFunction(itinerary_increment())
        getBase64FromImageUrl('static/real_images/' + sorted_itinerary[x].photo + '.jpeg', document.getElementById('itinerary_photo_data_uri_'+ct));

        document.getElementById('itinerary_preview_'+ct).src = 'static/thumbnails/T_' + sorted_itinerary[x].photo + '.jpeg';
        document.getElementById('itinerary_title_'+ct).value = sorted_itinerary[x].title;
        document.getElementById('itinerary_details_'+ct).value = sorted_itinerary[x].details;
    }

    document.getElementById('edit_package_variable').setAttribute('value', '1');
}

function delete_package(package_id){
    let formdata = new FormData();
    formdata.append('package_id', package_id)

    package_details = SendRequest('POST', formdata, '/delete_single_package', false);

}