/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


document.addEventListener('DOMContentLoaded', function() {
      // Initial data fetch
    fetchData();
});


const apiUrl = 'http://localhost:8080/procurement_portal_back_end/api/listNewRequests'; // Replace with your API URL
let currentPage = 1;
let perPage = 10;
let allUsers = [];

    function fetchData() {
        fetch(apiUrl,{
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(reqs => {
                console.log('Data fetched from API:', reqs); // Log the entire response for debugging
                
                if (reqs && reqs.length > 0) {
                    allReqs = reqs;
                    const totalPages = Math.ceil(allReqs.length / perPage);
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
        const allRes = allReqs.slice(start, end);

        const thead = document.getElementById('tableHeader');
        const tbody = document.getElementById('userTableBody');

        // Clear existing table data
        thead.innerHTML = '';
        tbody.innerHTML = '';

        if (allRes.length > 0) {
            // Render table header
            const fields = Object.keys(allRes[0]);
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
            allRes.forEach(req => {
                const row = document.createElement('tr');
                Object.values(req).forEach(value => {
                    const td = document.createElement('td');
                    td.textContent = value;
                    row.appendChild(td);
                });
                // Add action buttons
                const actionsTd = document.createElement('td');
                actionsTd.classList.add('actions');
                actionsTd.innerHTML = `
                    <button class="approve" onclick ="approve_request(${req.requestId})">Approve</button>
                `;
                row.appendChild(actionsTd);
                tbody.appendChild(row);
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
        const totalPages = Math.ceil(allReqs.length / perPage);
        updatePagination(currentPage, totalPages);
        renderTable();
    });

    document.getElementById('prevPage').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
            const totalPages = Math.ceil(allReqs.length / perPage);
            updatePagination(currentPage, totalPages);
        }
    });

    document.getElementById('nextPage').addEventListener('click', function() {
        const totalPages = Math.ceil(allReqs.length / perPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
            updatePagination(currentPage, totalPages);
        }
    });


function updatePerPage(){
    perpage=document.getElementById("perPage").value;
}


async function approve_request(request_id){
    const userData = {
        request_id : request_id
    };

        try {
            const response = await fetch(`http://localhost:8080/procurement_portal_back_end/api/approveReqByTech`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
                credentials : 'include'
            });
            
            if (response.ok) {
                alert('Request added successfully to your tasks.');
                location.reload();
              //  fetchData();
                
            }  else {
                alert('Cannot add this this request to your tasks');
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
}


