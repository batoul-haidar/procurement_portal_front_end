/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


async function login() {
    // Get the username and password values
    const userName = document.getElementById('user_name').value;
    const password = document.getElementById('password').value;

    // Prepare the data to be sent in the request
    const data = {
        user_name: userName,
        password: password
    };
    
    const queryString = new URLSearchParams({
        user_name: userName,
        password: password
    }).toString();

    try {
        // Make the POST request to the API
    const response = await fetch(`http://localhost:8080/procurement_portal_back_end/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });
        
         // Debugging log statement
        console.log('Fetch response status:', response.status);
        console.log('Fetch response headers:', response.headers);

        // Check if the response is OK
        if (response.ok) {
            const result = await response.json();
            console.log('Fetch response result:', result);

        // Handle successful login by checking user type
        switch (result.user_type) {
            case 'admin':
                window.location.href = '../Admin/admin_homepage.html';
                break;
            case 'Purchaser':
                window.location.href = '../Purchaser/purchaser_homepage.html';
                break;
            case 'Technician':
                window.location.href = '../Technician/technician_homepage.html';
                break;
            default:
                alert('Unknown user type');
                break;
        }

        } else {
            // Handle errors (e.g., show an error message)
            const error = await response.json();
            alert('Login failed: ' + error.message);
        }
    } catch (error) {
        // Handle network errors or other unexpected errors
        console.error('Error:', error);
        alert('Login failed. Please try again with correct username and password.');
    }
}
