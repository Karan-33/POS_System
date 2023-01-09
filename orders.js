// Check
if (!localStorage.getItem("currentLoggedInUser") || JSON.parse(localStorage.getItem("currentLoggedInUser")).userType != "admin") {
    $("body").html(`Kindly<a href="home.html"> Login Here </a>First`);
}



$(document).ready(function () {
    showUsers();
});


// Show Users in Drop Down
function showUsers() {

    var users = JSON.parse(localStorage.getItem('users'));

    var str = `<option value="" class="dropdown-item" selected>None</option>`;
    str += `<option value="All" class="dropdown-item" >All</option>`;

    for (let i of users) {
        if (i.userType != "admin")
            str += `<option value="${i.email}" class="dropdown-item">${i.name}</option>`;
    }

    $("#userDropDown").html(str);
}

// Show Orders
function showOrders() {
    var str = "";
    var users = JSON.parse(localStorage.getItem('users'));

    if ($("#userDropDown").val() == "") {
        str = "";
    }

    else if ($("#userDropDown").val() == "All") {

        str += `<tr><th scope="col">Id</th><th scope="col">Name</th><th scope="col">Email</th><th scope="col">Phone</th><th scope="col">OrderNo</th><th scope="col">Price</th><th scope="col">DateOfInvoice</th></tr>`;

        for (let i of users) {

            if (i.userType != "admin")
                for (let j of i.orders) {
                    console.log(i.orders);
                    str += `<tr><td>${j.id}</td><td>${j.name}</td><td>${j.email}</td><td>${j.phone}</td><td>${j.orderNo}</td><td>${j.price}</td><td>${j.dateOfInvoice}</td></tr>`;
                }
        }
    }

    else {
        // console.log($("#userDropDown").val());
        var currentUser = users.find(em => em.email == $("#userDropDown").val())

        str += `<tr><th scope="col">Id</th><th scope="col">Name</th><th scope="col">Email</th><th scope="col">Phone</th><th scope="col">OrderNo</th><th scope="col">Price</th><th scope="col">DateOfInvoice</th></tr>`;

        for (let j of currentUser.orders) {
            str += `<tr><td>${j.id}</td><td>${j.name}</td><td>${j.email}</td><td>${j.phone}</td><td>${j.orderNo}</td><td>${j.price}</td><td>${j.dateOfInvoice}</td></tr>`;
        }

    }

    $("#transactionTableBody").html(str);
}