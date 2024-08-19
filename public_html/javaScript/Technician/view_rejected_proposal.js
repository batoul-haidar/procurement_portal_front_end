/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const request = Object.fromEntries(params.entries());
    const requestId = parseInt(request.requestId, 10); // Convert to integer
    console.log('Request data:', request.requestId); // Debugging line to check user data
    fetchData(requestId);
});

async function fetchData(requestId) {
    let allReqs = []; 
    try {
        const response = await fetch(`http://localhost:8080/procurement_portal_back_end/api/getRejectedProposal?request_id=${requestId}`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data fetched from API:', data);

        if (data) {
            allReqs = data;
            renderTable(allReqs);
        } else {
            console.error('No data found in the API response');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again later.');
    }
}

function renderTable(data) {
    const tableContainer = document.getElementById('table-container'); // Ensure you have a container with this ID in your HTML
    if (!tableContainer) {
        console.error('Table container not found!');
        return;
    }

    // Create table
    const table = document.createElement('table');
    table.classList.add('data-table'); // Add any required classes for styling

    // Create table body
    const tbody = document.createElement('tbody');

    // Assuming data is an object with key-value pairs
    for (const [key, value] of Object.entries(data)) {
        const row = document.createElement('tr');

        const th = document.createElement('th');
        th.textContent = key;
        row.appendChild(th);

        const td = document.createElement('td');
        td.textContent = value;
        if (key === 'requestId') {
            td.id = 'requestIdCell';
        }
        row.appendChild(td);

        tbody.appendChild(row);
    }

    table.appendChild(tbody);

    // Clear any existing content in the container and append the new table
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}

function submitOtherProposal (){
    const requestIdIdCell = document.getElementById('requestIdCell');
    const requestIdValue = requestIdIdCell.textContent;
    console.log('Approving proposal with ID:', requestIdValue);
    
    
    const queryString = new URLSearchParams({
        requestId : requestIdValue
    }).toString();
    
    window.location.href = `make_proposal.html?${queryString}`;




}




