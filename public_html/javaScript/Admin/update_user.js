/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


document.addEventListener('DOMContentLoaded', function() {
            const params = new URLSearchParams(window.location.search);
            const user = Object.fromEntries(params.entries());
            console.log('User data:', user); // Debugging line to check user data

            // Populate the form fields with user data
            document.getElementById('user_id_txt').value = user.id;
            document.getElementById('full_name_txt').value = user.fullName;
            document.getElementById('user_type').value = user.type;
            document.getElementById('user_name_txt').value = user.userName;
            document.getElementById('user_departement').value = user.userDepartment;
        });







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



async function updateUser() {
    const user_id = document.getElementById("user_id_txt").value;
    const full_name = document.getElementById("full_name_txt").value;
    const user_type = document.getElementById("user_type").value;
    const departement = document.getElementById("user_departement").value;
    const other_dep = document.getElementById("other_dep_txt").value;
    
    const resultMessage = document.getElementById("result_message");
    
    
    
    const userData = {
        user_id : user_id,
        user_full_name: full_name,
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
    

        try {
            const response = await fetch(`http://localhost:8080/procurement_portal_back_end/api/updateUser`, {
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
                resultMessage.textContent = "User updated successfully.";
                
                
            }  else {
                resultMessage.style.color = 'red';
                resultMessage.style.marginTop = '20px'; // Add top margin
                resultMessage.style.fontSize = '18px'; // Change font size
                resultMessage.textContent = "Can't update this user, error in response.";
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    
}