/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


document.addEventListener('DOMContentLoaded', function() {
      // Initial data fetch
    fetchData();
});


const apiUrl = 'http://localhost:8080/procurement_portal_back_end/api/requestsByTechnician'; // Replace with your API URL
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
                
                if (req.requestStatus === 'In Progress') {
                actionsTd.innerHTML = `
                    <button id="add_proposal" class="button" data-request='${JSON.stringify(req)}'>Submit Proposal</button>
                `;
            } else if (req.requestStatus === 'Proposal submitted, waiting for approval'){
                actionsTd.textContent = 'Waiting for Proposal Approval';
            }
            
            else if (req.requestStatus === 'Proposal Approved'){
                actionsTd.textContent = 'Waiting for deliviry';
            }
            
            else if (req.requestStatus === 'Proposal Rejected'){
                actionsTd.innerHTML = `
                <button id="view_rejected_proposal" class="text_button" style="font-size: 18px" data-request='${JSON.stringify(req)}'>View Details</button>
                    
                `;
            }
      //      <button class="add_proposal" data-request='${JSON.stringify(req)}' >Submit Proposal</button>
             //   actionsTd.innerHTML = `
               //     <button class="add_proposal" data-request='${JSON.stringify(req)}'>Add Proposal</button>
                //`;
                row.appendChild(actionsTd);
                tbody.appendChild(row);
            });
            
            // Add event listeners to Edit info buttons
            document.querySelectorAll('#add_proposal').forEach(button => {
                button.addEventListener('click', function() {
                    const request = JSON.parse(this.getAttribute('data-request'));
                    const queryString = new URLSearchParams(request).toString();
                    window.location.href = `make_proposal.html?${queryString}`;
                });
            });
            
            
            // Add event listeners to Edit info buttons
            document.querySelectorAll('#view_rejected_proposal').forEach(button => {
                button.addEventListener('click', function() {
                    const request = JSON.parse(this.getAttribute('data-request'));
                    const queryString = new URLSearchParams(request).toString();
                    window.location.href = `view_rejected_proposal.html?${queryString}`;
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
