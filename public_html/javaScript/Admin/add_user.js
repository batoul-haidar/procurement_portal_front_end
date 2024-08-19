/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
function showMessageBox() {
    document.getElementById("msgPwd").style.display = "block";
}

function hideMessageBox() {
    document.getElementById("msgPwd").style.display = "none";
}

function checkPasswordValidation() {
  var myInput = document.getElementById("password_txt");
  var letter = document.getElementById("letter");
  var capital = document.getElementById("capital");
  var number = document.getElementById("number");
  var length = document.getElementById("length");
  var symbol = document.getElementById("symbol");

  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  var isValid = true;

  if(myInput.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
    isValid = false;
  }
  
  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
    isValid = false;
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
    isValid = false;
  }
  
  // Validate length
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
    isValid = false;
  }
  
  // Validate symbols
  var specialCharacters = /[!@#$%^&*(),.?":{}|<>]/g;
  if(myInput.value.match(specialCharacters)) {  
    symbol.classList.remove("invalid");
    symbol.classList.add("valid");
  } else {
    symbol.classList.remove("valid");
    symbol.classList.add("invalid");
    isValid = false;
  }

  return isValid;
}


function fetchOtherDep() {
    const deptElement = document.getElementById("user_departement");
    const deptName = deptElement.value; // Get the value of the selected option
    const depConElement = document.getElementById("dep_con");

    if (deptName === 'Other') {
        depConElement.value = "";
        depConElement.style.visibility = 'visible'; // Set the visibility to visible
    } else {
        depConElement.style.visibility = 'hidden'; // Set the visibility to hidden
    }
}


function checkPasswordMatch (){
    const pwd = document.getElementById("password_txt").value;
    const pwd_confirm = document.getElementById("password_confirm_txt").value;
    const message = document.getElementById("message");
    
    
    if (pwd === pwd_confirm){
        message.style.color = 'green';
        message.style.marginTop = '20px'; // Add top margin
        message.style.fontSize = '18px'; // Change font size
        message.textContent = "Passwords are matched.";
    }
        
    else{
        message.style.color = 'red';
        message.style.marginTop = '20px'; // Add top margin
        message.style.fontSize = '18px'; // Change font size
        message.textContent = "Passwords aren't match.";
    }
        

}

$(document).ready(function () {
   $("#password_confirm_txt").keyup(checkPasswordMatch);
});

async function addUser() {
    const user_name = document.getElementById("user_name_txt").value;
    const pwd = document.getElementById("password_txt").value;
    const pwd_confirm = document.getElementById("password_confirm_txt").value;
    const full_name = document.getElementById("full_name_txt").value;
    const user_type = document.getElementById("user_type").value;
    const departement = document.getElementById("user_departement").value;
    const other_dep = document.getElementById("other_dep_txt").value;
    
    const resultMessage = document.getElementById("result_message");
    
    
    
    const userData = {
        user_full_name: full_name,
        user_name: user_name,
        password: pwd,
        user_type: user_type,
        user_departement: departement,
        other_departement: other_dep
    };
  /*  
    const queryString = new URLSearchParams({
        user_full_name: full_name,
        user_name: user_name,
        password: pwd,
        user_type: user_type,
        user_departement: departement,
        other_departement: other_dep
    }).toString(); */
    if(checkPasswordValidation()){
        if (pwd === pwd_confirm) {
        try {
            const response = await fetch(`http://localhost:8080/procurement_portal_back_end/api/addUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            if (response.ok) {
                resultMessage.style.color = 'green';
                resultMessage.style.marginTop = '20px'; // Add top margin
                resultMessage.style.fontSize = '18px'; // Change font size
                resultMessage.textContent = "User added successfully.";
                defaultState();
                
                
            } else if (response.status === 405) { // 405 Method Not Allowed
                resultMessage.style.color = 'orange';
                resultMessage.style.marginTop = '20px'; // Add top margin
                resultMessage.style.fontSize = '18px'; // Change font size
                resultMessage.textContent = "This username already exists, try another one.";
            } else {
                resultMessage.style.color = 'red';
                resultMessage.style.marginTop = '20px'; // Add top margin
                resultMessage.style.fontSize = '18px'; // Change font size
                resultMessage.textContent = "Can't add this user, error in response.";
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    } else {
        resultMessage.style.color = 'red';
        resultMessage.style.marginTop = '20px'; // Add top margin
        resultMessage.style.fontSize = '18px'; // Change font size
        resultMessage.textContent = "Passwords do not match.";
    }
    } else {
        resultMessage.style.color = 'red';
        resultMessage.style.marginTop = '20px'; // Add top margin
        resultMessage.style.fontSize = '18px'; // Change font size
        resultMessage.textContent = "Password conditions aren't met";
    }
    
}


function defaultState (){
    document.getElementById("user_name_txt").value = '';
    document.getElementById("password_txt").value = '';
    document.getElementById("password_confirm_txt").value = '';
    document.getElementById("full_name_txt").value = '';
    document.getElementById("user_type").value ='';
    document.getElementById("user_departement").value ='';
    document.getElementById("other_dep_txt").value = '';
}


/*
function addUser (){
    const user_name = document.getElementById("user_name_txt").value;
    const pwd = document.getElementById("password_txt").value;
    const pwd_confirm = document.getElementById("password_confirm_txt").value;
    const full_name = document.getElementById("full_name_txt").value;
    const user_type = document.getElementById("user_type").value;
    const departement = document.getElementById("user_departement").value;
    const other_dep = document.getElementById("other_dep_txt").value;
    
    const resultMessage = document.getElementById("result_message");
    
    const queryString = new URLSearchParams ({
        user_full_name: full_name,
        user_name: user_name,
        password: pwd,
        user_type: user_type,
        user_departement: departement,
        other_departement: other_dep
    }).toString();
    
    if (pwd === pwd_confirm){
        try{
        const response = fetch (`http://localhost:8080/procurement_portal_back_end/api/addUser?${queryString}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok){
            resultMessage.style.color = 'green';
            resultMessage.style.marginTop = '20px'; // Add top margin
            resultMessage.style.fontSize = '18px'; // Change font size
            resultMessage.textContent = "User added successfully .";
        }
        else if (response.METHOD_NOT_ALLOWED){
            resultMessage.style.color = 'green';
            resultMessage.style.marginTop = '20px'; // Add top margin
            resultMessage.style.fontSize = '18px'; // Change font size
            resultMessage.textContent = "This username is exists, try another one";
        }
        else{
            resultMessage.style.color = 'red';
            resultMessage.style.marginTop = '20px'; // Add top margin
            resultMessage.style.fontSize = '18px'; // Change font size
            resultMessage.textContent = "Can't add this user, error in response";
        }
            
    } catch (error){
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again later.');
    }
    }
    
    else{
        resultMessage.style.color = 'red';
        resultMessage.style.marginTop = '20px'; // Add top margin
        resultMessage.style.fontSize = '18px'; // Change font size
        resultMessage.textContent = "Passwords aren't match.";
    }
    
    
  
   
    
    
} */