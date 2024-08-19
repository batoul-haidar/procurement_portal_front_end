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
        const response = await fetch(`http://localhost:8080/procurement_portal_back_end/api/getProposal?request_id=${requestId}`, {
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
        
        const td = createCell(key, value);
        row.appendChild(td);

        tbody.appendChild(row);
/*
        const td = document.createElement('td');
        td.textContent = value;
        if (key === 'proposalId') {
            td.id = 'proposalIdCell'; // Add an ID to the proposalId cell
        }
        row.appendChild(td);

        tbody.appendChild(row);*/
    }

    table.appendChild(tbody);

    // Clear any existing content in the container and append the new table
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}


function createCell(key, value) {
    const td = document.createElement('td');

    if (key === 'proposalURL') {
        const a = document.createElement('a');
        a.href = value;
        a.textContent = 'View Proposal';
        a.target = '_blank';
        td.appendChild(a);
    } else {
        td.textContent = value;
        if (key === 'proposalId') {
            td.id = 'proposalIdCell';
        }
    }

    return td;
}


async function approveProposal (){
    const proposalIdCell = document.getElementById('proposalIdCell');
    const proposalIdValue = proposalIdCell.textContent;
    console.log('Approving proposal with ID:', proposalIdValue);

    const userData = {
            proposal_id :  proposalIdValue
        };
        
    try {
        const response = await fetch(`http://localhost:8080/procurement_portal_back_end/api/approveProposal`, {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
        });
        
        console.log ('response:' , response);


        if (response.ok) {
            alert('Approved to the proposal submitted successfully');
            window.location.href='purchaser_homepage.html';
        }
        else
            throw new Error(`HTTP error! status: ${response.status}`);

        
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again later.');
    }
    
    
}






async function rejectProposal (){
    const reason = document.getElementById("reason").value;
    const proposalIdCell = document.getElementById('proposalIdCell');
    const proposalIdValue = proposalIdCell.textContent;
    console.log('Approving proposal with ID:', proposalIdValue);
    const resultMessage = document.getElementById("result_message");
    /*
    const queryString = new URLSearchParams ({
            proposal_id :  proposalIdValue,
            reason : reason
        }).toString();*/
    
    const userData = {
            proposal_id :  proposalIdValue,
            reason : reason
        };
        
        if (!reason){
            resultMessage.style.color = 'red';
            resultMessage.style.marginTop = '20px'; // Add top margin
            resultMessage.style.fontSize = '18px'; // Change font size
            resultMessage.textContent = "You should write reason of rejection.";
        }
        
        else{
            try {
            const response = await fetch(`http://localhost:8080/procurement_portal_back_end/api/rejectProposal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            if (response.ok) {
                alert('Rejection to the proposal submitted successfully');
                window.location.href='purchaser_homepage.html';
                
                
            }  else {
                resultMessage.style.color = 'red';
                resultMessage.style.marginTop = '20px'; // Add top margin
                resultMessage.style.fontSize = '18px'; // Change font size
                resultMessage.textContent = "Can't reject this proposal, error in response.";
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
        }
    
    
    
}
