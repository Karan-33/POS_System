var admin ={
    userName : "admin7",
    password : "Admin@123",
    userType : "admin",
    email : "admin47@gmail.com"
};

// Users array
var users=[];


$( document ).ready(function() {
    if(!localStorage.getItem("users")){
        users.push(admin);
        localStorage.setItem("users",JSON.stringify(users));
        console.log(users);
    }
});

// Validating user
function validateUser(){

    var flag = true;
    var mail = $("#loginEmailAddress").val();
    var password = $("#loginPassword").val();
    
    clearErorMessages();

    // Name Validation
    if(mail == "" && password == ""){
        flag = false;
        $("#femailCheck").text("Please enter field values");
        return flag;
    }

    return flag;
}

// Clear erors
function clearErorMessages() {
    let erors;
    erors = document.getElementsByClassName("formeror");
    // console.log(erors);

    for (let item of erors) {
        item.innerHTML = "";
    }
}


// Checking whether user is admin or a normal user
function checkUser(){

    if(!validateUser()){
        return;
    }

    var users = JSON.parse(localStorage.getItem('users'));
    var mail = $("#loginEmailAddress").val();
    var password = $("#loginPassword").val();
    var currentUser = users.find(em=>em.email == mail);

    if(!currentUser) {
        $("#femailCheck").text("Email don't exist");
        return;
    }    

    if(currentUser["password"] != password){
        $("#floginPasswordCheck").text("Password not correct");
        return;
    }

    if(currentUser.userType == 'admin'){
        localStorage.setItem("currentLoggedInUser",JSON.stringify(admin));
        location.href = "adminInterface.html";
        return;
    }

    localStorage.setItem("currentLoggedInUser",JSON.stringify(currentUser));
    location.href = "userInterface.html";
    
}