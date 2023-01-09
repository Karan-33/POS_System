$(document).ready(function () {
    // Check
    if (!localStorage.getItem("currentLoggedInUser") || JSON.parse(localStorage.getItem("currentLoggedInUser")).userType != "user") {
        $("body").html(`Kindly<a href="home.html"> Login Here </a>First`);
    }
    else
        showUserName();
        userOrders();
});

function showUserName() {
    var currentUser = JSON.parse(localStorage.getItem('currentLoggedInUser'));
    $("#heading").text(`Welcome ${currentUser.name}`);
}

function userOrders() {
    var currentUser = JSON.parse(localStorage.getItem('currentLoggedInUser'));

    var str = `<tr><th scope="col">Id</th><th scope="col">Name</th><th scope="col">Email</th><th scope="col">Phone</th><th scope="col">OrderNo</th><th scope="col">Price</th><th scope="col">DateOfInvoice</th></tr>`;

    for (let j of currentUser.orders) {
        str += `<tr><td>${j.id}</td><td>${j.name}</td><td>${j.email}</td><td>${j.phone}</td><td>${j.orderNo}</td><td>${j.price}</td><td>${j.dateOfInvoice}</td></tr>`;
    }

    $("#showOrdersTableBody").html(str);
}