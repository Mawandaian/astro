// Function to add category selections to modal if bottom package is selected
function addBottomPackageCategoriesToModal(selected_package_id){
    // First clear the selection
    $('#select_categories').html('')

    for(let package in packages_received){
        if(selected_package_id == packages_received[package].package_id){
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

    for(let package in packages_received){

        if(parseInt($(".select_destinations").val()) == packages_received[package].destination_id){
        // Adding the destination elements to the selection option
            $('.select_packages').append('<option value="' + packages_received[package].destination_id + '">' + packages_received[package].name + '</option>')
                    
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
    console.log(packages_received)
    // First clear the selection

    $('#select_categories').html('');

    for(let package in packages_received){
        if(parseInt($(".select_packages").val()) == packages_received[package].package_id){
            for(let x=0; x<packages_received[package].category.length; x++){
                // alert(packages_received[package].category[x])
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

// Getting the categories in that package for the modal form
// $(".select_packages").change(function () {
//     addCategoryOptions(packages_received)
// });


    // Load the packages of a given chosen destination
    addPackageOptions(packages_received)

    // Load the categories in a given package
    // addCategoryOptions(packages_received)
});