// Opening the package
function buttonLoadPackage(){
    loadPackage(parseInt($(".select_packages").val()))
}

// Function to load the packages in the select part
function addPackageOptions(packages_received){
    console.log(packages_received)
    // First clear the selection
    $('.select_packages').html('')

    for(let package in packages_received){
        if(parseInt($(".select_destinations").val()) == packages_received[package].destination_id){
            // Adding the destination elements to the selection option
            $('.select_packages').append('<option value="' + packages_received[package].destination_id + '">' + packages_received[package].name + '</option>')
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

    // Load the packages of a given chosen destination
    addPackageOptions(packages_received)
});