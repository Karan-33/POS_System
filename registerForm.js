// Check
if(!localStorage.getItem("currentLoggedInUser") || JSON.parse(localStorage.getItem("currentLoggedInUser")).userType != "admin"){
    $("body").html(`Kindly<a href="home.html"> Login Here </a>First`);    
}

// Pattern Validations
var namePattern = /^[A-Za-z]*$/;
var emailPattern = /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;
var phonePattern = /^[6-9]\d{9}$/;
var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Validating user
function validateUser(){

    var flag = true;
    var users = JSON.parse(localStorage.getItem("users"));
    clearErorMessages();

    // Status Valdation
    if($("#userId").val() == ""){
        $("#fidCheck").text("Please enter a valid id");
        flag = false;
        return flag;
    }

    // Name Validation
    if($("#name").val() == "" || namePattern.test($("#name").val()) != true){
        $("#fnameCheck").text("Please enter a valid name");
        flag = false;
        return flag;
    }

    // Email Validation
    if ($("#emailAddress").val() == "" || emailPattern.test($("#emailAddress").val()) != true ) {
        $("#femailCheck").text("Please enter a valid mail");
        flag = false;
        return flag;
    }
   
    // Phone Validation
    if($("#phone").val() == ""  || phonePattern.test($("#phone").val()) != true){
        $("#fphoneCheck").text("Please enter a valid phone number");
        flag = false;
        return flag;
    }

    // Password Validation
    if ($("#password").val() == "" || passwordPattern.test($("#password").val()) != true) {
        $("#fpasswordCheck").text("Please enter a valid password");
        flag = false;
        return flag;
    }

    return flag;
}

// Clear erors
function clearErorMessages() {
    let erors;
    erors = document.getElementsByClassName("formeror");

    for (let item of erors) {
        item.innerHTML = "";
    }
}

// save user
function registerUser(){

    var ordersArray=[];
    var users = JSON.parse(localStorage.getItem("users"));

    if(!validateUser()){
        return;
    }
    if(users.some(em=> $("#emailAddress").val() == em.email) == true){
        $("#femailCheck").text("Email already exist , Enter a different email");
        flag = false;
        return flag;
    }

    var userId = $("#userId").val();
    var name = $('#name').val();
    var email = $('#emailAddress').val();
    var phone = $("#phone").val();
    var password = $('#password').val();

    var userObj = {
        id : userId,
        name : name,
        email : email,
        phone : phone,
        password : password,
        orders : ordersArray,
        userType : "user"
    }
    
    users.push(userObj);
    localStorage.setItem("users",JSON.stringify(users));
    clearFields();
    location.replace( "addUser.html");
}

// Clear Input Fields
function clearFields(){
    $('#name').val("");
    $('#emailAddress').val("");
    $('#password').val("");
    $('#userId').val("");
}