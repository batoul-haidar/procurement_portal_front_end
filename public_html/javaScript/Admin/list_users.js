/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

document.addEventListener('DOMContentLoaded', function() {
      // Initial data fetch
    fetchData();
});


const apiUrl = 'http://localhost:8080/procurement_portal_back_end/api/listAllUsers'; // Replace with your API URL
let currentPage = 1;
let perPage = 10;
let allUsers = [];

    function fetchData() {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(users => {
                console.log('Data fetched from API:', users); // Log the entire response for debugging
                
                if (users && users.length > 0) {
                    allUsers = users;
                    const totalPages = Math.ceil(allUsers.length / perPage);
                    updatePagination(currentPage, totalPages);
                    renderTable();
                } else {
                    console.error('No users found in the API response');
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function renderTable() {
        const start = (currentPage - 1) * perPage;
        const end = start + perPage;
        const users = allUsers.slice(start, end);

        const thead = document.getElementById('tableHeader');
        const tbody = document.getElementById('userTableBody');

        // Clear existing table data
        thead.innerHTML = '';
        tbody.innerHTML = '';

        if (users.length > 0) {
            // Render table header
            const fields = Object.keys(users[0]);
            fields.forEach(field => {
                const th = document.createElement('th');
                th.textContent = field.charAt(0).toUpperCase() + field.slice(1);
                thead.appendChild(th);
            });
            // Add Actions column
            const th = document.createElement('th');
            th.textContent = 'Actions';
            thead.appendChild(th);

            // Render table rows
            users.forEach(user => {
                const row = document.createElement('tr');
                Object.values(user).forEach(value => {
                    const td = document.createElement('td');
                    td.textContent = value;
                    row.appendChild(td);
                });
                // Add action buttons
                const actionsTd = document.createElement('td');
                actionsTd.classList.add('actions');
                actionsTd.innerHTML = `
                    <button class="delete" onclick="delete_user(${user.id})">Delete</button>
                    <button class="edit_info" data-user='${JSON.stringify(user)}'>Edit Info</button>
                    <button class="edit_pwd" data-user='${JSON.stringify(user)}'>Edit Password</button>
                
                `;
                row.appendChild(actionsTd);
                tbody.appendChild(row);
            });
            
               // Add event listeners to Edit info buttons
            document.querySelectorAll('.edit_info').forEach(button => {
                button.addEventListener('click', function() {
                    const user = JSON.parse(this.getAttribute('data-user'));
                    const queryString = new URLSearchParams(user).toString();
                    window.location.href = `edit_user_info.html?${queryString}`;
                });
            });
            
            
            // Add event listeners to Edit password buttons
            document.querySelectorAll('.edit_pwd').forEach(button => {
                button.addEventListener('click', function() {
                    const user = JSON.parse(this.getAttribute('data-user'));
                    const queryString = new URLSearchParams(user).toString();
                    window.location.href = `edit_password.html?${queryString}`;
                });
            });
            
            
            
        }
    }

    function updatePagination(page, totalPages) {
        document.getElementById('pageInfo').textContent = `Page ${page} of ${totalPages}`;
    }

    document.getElementById('searchButton').addEventListener('click', function() {
        // Implement search functionality
    });

    document.getElementById('resetButton').addEventListener('click', function() {
        // Implement reset functionality
    });

    document.getElementById('perPage').addEventListener('change', function() {
        perPage = parseInt(this.value);
        const totalPages = Math.ceil(allUsers.length / perPage);
        updatePagination(currentPage, totalPages);
        renderTable();
    });

    document.getElementById('prevPage').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
            const totalPages = Math.ceil(allUsers.length / perPage);
            updatePagination(currentPage, totalPages);
        }
    });

    document.getElementById('nextPage').addEventListener('click', function() {
        const totalPages = Math.ceil(allUsers.length / perPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
            updatePagination(currentPage, totalPages);
        }
    });


function updatePerPage(){
    perpage=document.getElementById("perPage").value;
}


async function delete_user (id){
  //  const user_id = document.getElementById("user_id_txt").value;
    
  //  const resultMessage = document.getElementById("result_message");
    
    
    
    const userData = {
        user_id : id
    };

        try {
            const response = await fetch(`http://localhost:8080/procurement_portal_back_end/api/deleteUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            if (response.ok) {
                alert('User deleted successfully.');
                fetchData();
                
            }  else {
                alert('Cannot delete this user');
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
}

/*
function list_all_users(){
   try{
       const api_url = "http://localhost:8080/procurement_portal_back_end/api/listAllUsers";
       
       const response = fetch(api_url, {
           method : 'GET',
           Headers : {
               content_type: "application/json"
           }
       });
       
       if (response.ok){
           
       }
       else
           
       
   } catch (error){
       
   }
}*/


