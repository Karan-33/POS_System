// Check
if(!localStorage.getItem("currentLoggedInUser") || JSON.parse(localStorage.getItem("currentLoggedInUser")).userType != "admin"){
    $("body").html(`Kindly<a href="home.html"> Login Here </a>First`);    
}

$( document ).ready(function() {
    showItems()
});


var items=[];
if(!localStorage.getItem("items")){
    localStorage.setItem("items",JSON.stringify(items));
}

// Show All Items
function showItems(){
    var items = JSON.parse(localStorage.getItem("items"));
    if(items.length>0){
        var str=`<tr><th scope="col">Id</th><th scope="col">Item Name</th><th scope="col">Stock</th><th scope="col">Price</th></tr>`;
    }
        
    for(let i of items){
        str+=`<tr><td>${i.id}</td><td>${i.name}</td><td>${i.stock}</td><td>${i.price}</td></tr>`;
    }

    $("#showItemsTableBody").html(str);
}

// Validate item
function validateItem(){
    
    var flag = true;
    clearErorMessages();

    // Id Validation
    if($("#itemId").val() == ""){
        $("#fidCheck").text("Please enter a valid id");
        flag = false;
        return flag;
    }

    // Name Validation
    if($("#itemName").val() == ""){
        $("#fnameCheck").text("Please enter a valid item name");
        flag = false;
        return flag;
    }
    
    // Quantity Validation
    if ($("#quantity").val() == "" || $("#quantity").val()<0) {
        $("#fquantityCheck").text("Please enter a valid quantity");
        flag = false;
        return flag;
    }

    // Status Valdation
    if($("#itemPrice").val() == "" || $("#itemPrice").val()<0 ){
        $("#fpriceCheck").text("Please enter a valid price");
        flag = false;
        return flag;
    }

    return flag;
}

// ADD Items
function addItem(){

    var items = JSON.parse(localStorage.getItem("items"));

    if(!validateItem()){
        return;
    }
    
    if(items.length>0 && items.find(em=>em.name == $("#itemName").val())){
        $("#fnameCheck").text("Name already exist , Please enter a different name");
        flag = false;
        return flag;
    }

    var itemId = $("#itemId").val();
    var itemName = $("#itemName").val();
    var stock = $("#quantity").val();
    var itemPrice = $("#itemPrice").val();

    var itemObj ={
        id : itemId,
        name : itemName,
        stock : stock,
        price : itemPrice
    };

    items.push(itemObj);
    localStorage.setItem("items",JSON.stringify(items));
    $("#message").text("Data Saved Successfully.");
    clearFields();
    showItems();
}

// Clear erors
function clearErorMessages() {
    let erors;
    erors = document.getElementsByClassName("formeror");
    for (let item of erors) {
        item.innerHTML = "";
    }
}

// Clear Input Fields
function clearFields(){
    $("#itemId").val("");
    $("#itemName").val("");
    $("#quantity").val("");
    $("#itemPrice").val("");
    $("#message").text("");
}



