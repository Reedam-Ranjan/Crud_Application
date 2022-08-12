

$("#add_user").submit(function(event){
    alert("Data inserted successfully!");
})

// Here we will access our update form (using the id #update_user in the update form)

$("#update_user").submit(function(event){
    event.preventDefault(); 
    
    // var unindexed_array = $("#update_user")

    // we can also use this keyword
    var unindexed_array = $(this).serializeArray();
    var data = {}

    // console.log(unindexed_array);
    $.map(unindexed_array,function (n, i){
        data[n['name']] = n['value'];
        
    })
   
    // creating a put request

    var request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : 'PUT',
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

// Deleting data from the application

if(window.location.pathname == '/'){
    $ondelete=$(".table tbody td a.delete");
    $ondelete.click(function(){
        var id=$(this).attr("data-id") // using this statement we can get the data attribute from the index.js data statement


        var request = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method" : 'DELETE',
        }
        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })

        }
    })
}
