$(document).ready(function () {
    // Check
    if (!localStorage.getItem("currentLoggedInUser") || JSON.parse(localStorage.getItem("currentLoggedInUser")).userType != "user") {
        $("body").html(`Kindly<a href="home.html"> Login Here </a>First`);
    }
    else
        showUserName();
        showItems();
});

function showUserName() {
    var currentUser = JSON.parse(localStorage.getItem('currentLoggedInUser'));
    $("#heading").text(`Welcome ${currentUser.name}`);
}

// Logout function
function logOut(){
    localStorage.removeItem("userCount");
    localStorage.removeItem("currentLoggedInUser");
}

// Show All Items
function showItems() {
    var items = JSON.parse(localStorage.getItem("items"));
    if (items.length > 0) {
        var str = `<tr><th scope="col">Id</th><th scope="col">Item Name</th><th scope="col">Stock</th><th scope="col">Price</th><th></th></tr>`;
    }

    var userCount = {};
    for (let i of items) {
        userCount[`${i.name}`] = "0";
        str += `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.stock}</td><td>${i.price}</td><td><button type="button" class="btn btn-primary" onclick=addItem("${i.name}")>Add Item </button></td></tr>`;
    }

    $("#showItemsTableBody").html(str);
    localStorage.setItem("userCount", JSON.stringify(userCount));
    $("#message").text("");
}

// Add Item
function addItem(event) {

    var items = JSON.parse(localStorage.getItem("items"));
    if (items) {

        var currentItem = items.find(em => em.name == event);
        if (currentItem["stock"] == 0) {
            alert("Item Out of stock");
        }
        else {

            var idx = items.findIndex(em => em.name == event);
            var userCount = JSON.parse(localStorage.getItem("userCount"));
            var qnt = Number(currentItem["stock"]);

            qnt--;
            currentItem["stock"] = qnt;
            items[idx] = currentItem;
            localStorage.setItem("items", JSON.stringify(items));

            showItems();

            var quant = Number(userCount[event]);
            quant++;
            userCount[`${event}`] = quant;

            localStorage.setItem('userCount', JSON.stringify(userCount));
            
        }
    }
}

// User Cart
function showCart() {

    var userCount = JSON.parse(localStorage.getItem("userCount"));
    var items = JSON.parse(localStorage.getItem("items"));
    var bill = 0;

    var str = "";
    for (let i in userCount) {
        if (userCount[i] != 0) {
            var currentItem = items.find(em => em.name == i);
            var subtotal = Number(userCount[i] * currentItem["price"]);
            bill+=subtotal;
            str += `<tr><td>${i}</td><td>${currentItem["price"]}</td><td>${userCount[i]}</td><td><button class="cartQtyMinus btn border border-dark" type="button" value="${i}">-</button></td><td>${subtotal}</td></tr>`
        }
    }
    $("#userCart").html(str);
    $("#grandTotal").html(`${bill}`);
}

// Remove items from Cart
$(document).on("click", ".cartQtyMinus", function (event) {
    var currentUserCart = JSON.parse(localStorage.getItem('userCount'));
    var items = JSON.parse(localStorage.getItem("items"));

    var removeItem = event.target.value;

    var quant = Number(currentUserCart[removeItem]);
    quant--;
    currentUserCart[removeItem] = quant;
    console.log(currentUserCart[removeItem]);
    localStorage.setItem("userCount", JSON.stringify(currentUserCart));

    var currentItem = items.find(em => em.name == removeItem);
    var idx = items.findIndex(em => em.name == removeItem);
    var qnt = Number(currentItem["stock"]);
    qnt++;
    currentItem["stock"] = qnt;
    items[idx] = currentItem;
    localStorage.setItem("items", JSON.stringify(items));
    showCart();

})

// Proceed for payment
function payBill(){

    var currentUser = JSON.parse(localStorage.getItem('currentLoggedInUser'));
    var users = JSON.parse(localStorage.getItem('users'));
    var idx = users.findIndex(em=>em.email == currentUser["email"]);
    var ordersArray = currentUser["orders"];

    var userId = currentUser["id"];
    var name = currentUser["name"];
    var email = currentUser["email"];
    var phone = currentUser["phone"];
    var orderNo = currentUser["orders"].length+1;
    var price = $("#grandTotal").html();
    var date = new Date();

    var invoiceObj = {
        id : userId,
        name : name,
        email : email,
        phone : phone,
        orderNo : orderNo,
        price : price,
        dateOfInvoice : date 
    };

    ordersArray.push(invoiceObj);
    users[idx] = currentUser;
    localStorage.setItem("users",JSON.stringify(users));
    localStorage.setItem("currentLoggedInUser",JSON.stringify(currentUser));
    $("#message").text("Payment Successfull !");
    $("#userCart").html("");
    $("#grandTotal").html("");
}

