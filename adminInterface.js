// Check
if(!localStorage.getItem("currentLoggedInUser") || JSON.parse(localStorage.getItem("currentLoggedInUser")).userType != "admin"){
    $("body").html(`Kindly<a href="home.html"> Login Here </a>First`);    
}

// Update current logged user on logout
function logOut() {
    localStorage.removeItem("currentLoggedInUser");
}