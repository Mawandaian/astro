let global_package_id = ''

function package_id_setter(value){
    global_package_id = value
}

function package_id_getter(){
    return global_package_id
}

// Function to add category selections to modal if bottom package is selected
function addBottomPackageCategoriesToModal(selected_package_id){
    // First clear the selection
    $('#select_categories').html('')

    for(let package in packages_received){
        if(selected_package_id == packages_received[package].package_id){
            $('#select_categories').append('<option value="" disabled="" selected="">Choose</option>')
            for(let x=0; x<packages_received[package].category.length; x++){
                // Adding the destination elements to the selection option
                $('#select_categories').append('<option value="' + packages_received[package].category[x] + '">' + packages_received[package].category[x] + '</option>')
            }
            $('#book_now_button').attr('onclick','send_booking_email(' + packages_received[package].package_id + ')')
        }
    }
}


// Function to load the packages in the select part
function addPackageOptions(packages_received){
    // First clear the selection
    $('.select_packages').html('')

    $('#select_categories').html('')

    let first_package_id_getter_counter = 0
    for(let package in packages_received){

        if(parseInt($(".select_destinations").val()) == packages_received[package].destination_id){
            if(first_package_id_getter_counter == 0){
                package_id_setter(packages_received[package].destination_id)
                first_package_id_getter_counter++
            }
        // Adding the destination elements to the selection option
            $('.select_packages').append('<option value="' + packages_received[package].package_id + '">' + packages_received[package].name + '</option>')
                    
                if(parseInt($(".select_packages").val()) == packages_received[package].package_id){
                    for(let x=0; x<packages_received[package].category.length; x++){
                        // Adding the destination elements to the selection option
                        $('#select_categories').append('<option value="' + packages_received[package].category[x] + '">' + packages_received[package].category[x] + '</option>')
                    }
                    $('#book_now_button').attr('onclick','send_booking_email(' + packages_received[package].package_id + ')')
                }
        }
    }
}


// Function to load the categories in the select part
function addCategoryOptions(){
    // First clear the selection

    $('#select_categories').html('');

    for(let package in packages_received){
        if(parseInt($(".select_packages").val()) == packages_received[package].package_id){
            
            for(let x=0; x<packages_received[package].category.length; x++){
                console.log('<option value="' + packages_received[package].category[x] + '">' + packages_received[package].category[x] + '</option>')
                // Adding the destination elements to the selection option
                $('#select_categories').append('<option value="' + packages_received[package].category[x] + '">' + packages_received[package].category[x] + '</option>')
            }
        }
    }
}
////////////////////////////////////////////////////////////////////////
$(document).ready(function (){
// Picking the destinations
let destinations = SendRequest('GET', '', '/get_destinations', false);

for(let destination in destinations){
    // Adding the destination elements to the selection option
    $('.select_destinations').append('<option value="' + destinations[destination].destination_id + '">' + destinations[destination].destination_name + '</option>')
}


// Getting the packages in that destination
$(".select_destinations").change(function () {
    addPackageOptions(packages_received)
});

// Getting the packages in that destination
$(".select_packages").change(function () {
    package_id_setter($(".select_packages").val())
});

    // Load the packages of a given chosen destination
    addPackageOptions(packages_received)
});