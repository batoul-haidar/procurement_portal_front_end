/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


document.addEventListener('DOMContentLoaded', function() {
      // Initial data fetch
    fetchData();
});


const apiUrl = 'http://localhost:8080/procurement_portal_back_end/api/requestsByPurchaser'; // Replace with your API URL
let currentPage = 1;
let perPage = 10;
let allUsers = [];

    function fetchData() {
        fetch(apiUrl,{
        method: 'GET', // Assuming you are making a GET request
        credentials: 'include', // Include credentials (cookies)
        headers: {
            'Content-Type': 'application/json'
        }
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
        const reqs = allReqs.slice(start, end);

        const thead = document.getElementById('tableHeader');
        const tbody = document.getElementById('userTableBody');

        // Clear existing table data
        thead.innerHTML = '';
        tbody.innerHTML = '';

        if (reqs.length > 0) {
            // Render table header
            const fields = Object.keys(reqs[0]);
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
            reqs.forEach(req => {
                const row = document.createElement('tr');
                Object.values(req).forEach(value => {
                    const td = document.createElement('td');
                    td.textContent = value;
                    row.appendChild(td);
                });
                // Add action buttons
                const actionsTd = document.createElement('td');
                actionsTd.classList.add('actions');
                
                if (req.requestStatus === 'pending') {
                    actionsTd.textContent = 'Waiting for Proposal';
            } else if (req.requestStatus === 'In Progress') {
                    actionsTd.textContent = 'Waiting for Proposal';
            } 
            
                else if (req.requestStatus === 'Proposal submitted, waiting for approval'){
                actionsTd.innerHTML = `
                    <button class="view_proposal" data-request='${JSON.stringify(req)}'>View Proposal</button>
                `;
            }
        
            else if (req.requestStatus === 'Proposal Approved'){
                actionsTd.innerHTML = `
                    <button class="close_request" onclick="closeRequest(${req.requestId})">Close Request</button>
                `;
            }
            
            else if (req.requestStatus === 'Proposal Rejected'){
                actionsTd.textContent = 'Waiting for another Proposal';
            }
            
                row.appendChild(actionsTd);
                tbody.appendChild(row);
            });
            
             // Add event listeners to Edit info buttons
            document.querySelectorAll('.view_proposal').forEach(button => {
                button.addEventListener('click', function() {
                    const request = JSON.parse(this.getAttribute('data-request'));
                    const queryString = new URLSearchParams(request).toString();
                    window.location.href = `view_proposal.html?${queryString}`;
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


async function closeRequest (request_id){
    
    const userData = {
            request_id :  request_id
        };
        
    try{
        const response = await fetch (`http://localhost:8080/procurement_portal_back_end/api/closeRequest`,{
            method:'POST' ,
            headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
        });
        
        if (response.ok) {
            alert('Request Closed successfully');
            window.location.href='purchaser_homepage.html';
        }
        else
            throw new Error(`HTTP error! status: ${response.status}`);
            
    } catch(error){
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again later.');
    }
}