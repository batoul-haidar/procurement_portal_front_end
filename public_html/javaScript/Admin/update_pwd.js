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







document.addEventListener('DOMContentLoaded', function() {
            const params = new URLSearchParams(window.location.search);
            const user = Object.fromEntries(params.entries());
            console.log('User data:', user); // Debugging line to check user data

            // Populate the form fields with user data
            document.getElementById('user_id_txt').value = user.id;
            document.getElementById('user_name_txt').value = user.userName;
        });


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






async function updatePassword() {
    const user_id = document.getElementById("user_id_txt").value;
    const pwd = document.getElementById("password_txt").value;
    const pwd_confirm = document.getElementById("password_confirm_txt").value;
    
    const resultMessage = document.getElementById("result_message");
    
    
    
    const userData = {
        user_id : user_id,
        password: pwd
    };

   if (checkPasswordValidation()){
       if (pwd === pwd_confirm) {
        try {
            const response = await fetch(`http://localhost:8080/procurement_portal_back_end/api/editPassword`, {
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
                resultMessage.textContent = "Password updated successfully.";
                defaultState();
                
                
            }  else {
                resultMessage.style.color = 'red';
                resultMessage.style.marginTop = '20px'; // Add top margin
                resultMessage.style.fontSize = '18px'; // Change font size
                resultMessage.textContent = "Can't edit password, error in response.";
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
    document.getElementById("password_txt").value = '';
    document.getElementById("password_confirm_txt").value = '';
}
