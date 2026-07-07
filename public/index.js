const myform = document.getElementById('myform');
const username = document.getElementById('username')
const password = document.getElementById("password");
const confrim_password = document.getElementById("confrimpassword");

//error spans
const firstError = document.getElementById('first_name');
const lastError = document.getElementById('last_name');
const user_Error = document.getElementById('user_name')
const passwordError = document.getElementById('pass_word');
const confrimpassword = document.getElementById('confrim_password');

///regex values
const regex = /^[a-zA-Z]+$/;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/;


function validateForm(event){
    event.preventDefault();
 
    if(!regex.test(username .value) || !(username.value)){
        username.style.border = "2px solid red";
        user_Error.style.display = "block"
        user_Error.textContent = "Please type alphabbetic letters only";
        user_Error.style.color = '#EA0063';
        user_Error.style.fontStyle = "italic";
      
    }
   
    else if(!regexPassword.test(password.value) || !(password.value)){
        username.style.border = "2px solid #54ACDb";
        user_Error.style.display = "none";
        password.style.border = "2px solid red";
        passwordError.style.display = "block";
        passwordError.textContent = "Please Type A password b/n 6 and 12 containing atleast 1 uppercase, 1 lowwercase, 1character"
        passwordError.style.color = '#EA0063';
        passwordError.style.fontStyle = "italic";
    }
    else if(password.value != confrim_password.value || !(confrim_password.value)){
        password.style.border = "2px solid #54ACDb";
        passwordError.style.display = "none";
        confrimpassword.style.display = "block";
        confrimpassword.textContent = "please make sure password and confrim password is the same";
        confrimpassword.style.color = '#EA0063';
        confrimpassword.style.fontStyle = "italic";
        confrim_password.style.border = "2px solid red";
    }
    else{
        passwordError.style.display = "none";
        confrimpassword.style.display = "none";
        confrim_password.style.border = '2px solid #54ACDB';
        alert("Thank You Your Account Will be Created Shortly")
        myform.submit();
    }
    }
myform.addEventListener('submit', validateForm);

    