// Check
if (!localStorage.getItem("currentLoggedInUser") || JSON.parse(localStorage.getItem("currentLoggedInUser")).userType != "admin") {
    $("body").html(`Kindly<a href="home.html"> Login Here </a>First`);
}

$(document).ready(function () {
    showUsers();
});


// Show All Users
function showUsers() {
    var users = JSON.parse(localStorage.getItem("users"));
    if (users.length > 1) {
        var str = `<tr><th scope="col">Id</th><th scope="col">Name</th><th scope="col">Email</th><th scope="col">Phone</th><th scope="col">Password</th></tr>`;
    }

    for (let i of users) {
        if (i.userType == 'user') {
            str += `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.email}</td><td>${i.phone}</td><td>${i.password}</td></tr>`;
        }
    }

    $("#usersTableBody").html(str);
}