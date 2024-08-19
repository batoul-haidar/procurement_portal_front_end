/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

document.addEventListener('DOMContentLoaded', function() {
            const params = new URLSearchParams(window.location.search);
            const request = Object.fromEntries(params.entries());
            console.log('Request data:', request); // Debugging line to check user data

            // Populate the form fields with user data
            document.getElementById('request_id_txt').value = request.requestId;
        });





async function submitProposal (){
    // Gather form data
            const requestId = document.getElementById("request_id_txt").value;
            const productName = document.getElementById("product_name_txt").value;
            const manufacturer = document.getElementById("manufacturer_name_txt").value;
            const proposalCode = document.getElementById("product_code_txt").value;
            const price = document.getElementById("product_price_txt").value;
            const proposalURL = document.getElementById("product_url_txt").value;
            const notes = document.getElementById("notes").value;
          //  const proposalImages = document.getElementById("images").files;
            
            const resultMessage = document.getElementById("result_message");
            
            // Create JSON object
            const proposalData = {
                request_id: requestId,
                product_name: productName,
                manufacturer: manufacturer,
                proposal_code: proposalCode,
                price: price,
                proposal_url: proposalURL,
                notes: notes
            };
            
            
            try {
            const response = await fetch(`http://localhost:8080/procurement_portal_back_end/api/makeProposal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(proposalData),
                credentials: 'include' // Ensure cookies are included in the request
            });
            
            /*
            // Create FormData object to handle file upload
            const formData = new FormData();
            formData.append("proposalData", new Blob([JSON.stringify(proposalData)], { type: "application/json" }));
            
            

            // Append images to FormData
        const formData = new FormData();
            for (let i = 0; i < proposalImages.length; i++) {
                formData.append("proposal_images", proposalImages[i]);
            }
            
            console.log("Formed data: ", formData);

  
   
        try {
            const response = await fetch('http://localhost:8080/procurement_portal_back_end/api/makeProposal', {
            method: 'POST',
            body: formData,
            credentials: 'include' // Ensure cookies are included in the request
        });

            console.log('Response received:', response);
                const result = await response.json();
                console.log('Response JSON:', result);
                
              */  
            
            if (response.ok) {
                const result = await response.json();
                resultMessage.style.color = 'green';
                resultMessage.style.marginTop = '20px'; // Add top margin
                resultMessage.style.fontSize = '18px'; // Change font size
                resultMessage.textContent = "Proposal Submitted successfully.";
                alert("Prposal submitted successfully");
                window.location.href="technician_homepage.html";
           //     submitImages(result.proposalId);
             //   reset();
                
                
            } else {
                resultMessage.style.color = 'red';
                resultMessage.style.marginTop = '20px'; // Add top margin
                resultMessage.style.fontSize = '18px'; // Change font size
                resultMessage.textContent = "Can't add this proposal, error in response.";
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
}

async function submitImages (proposalId){
    const proposalImages = document.getElementById("images").files;
    const resultMessage = document.getElementById("result_message");
    const formData = new FormData();

    for (let i = 0; i < proposalImages.length; i++) {
        formData.append("proposal_images", proposalImages[i]);
    }
    formData.append("proposalId", proposalId); // Add proposalId to formData

    try {
        const response = await fetch('http://localhost:8080/procurement_portal_back_end/api/addImages', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        if (response.ok) {
            resultMessage.style.color = 'green';
            resultMessage.style.marginTop = '20px';
            resultMessage.style.fontSize = '18px';
            resultMessage.textContent = "Images uploaded successfully.";
        } else {
            const errorResult = await response.json();
            resultMessage.style.color = 'red';
            resultMessage.style.marginTop = '20px';
            resultMessage.style.fontSize = '18px';
            resultMessage.textContent = "Can't upload images, error in response.";
            console.error("Error:", errorResult.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again later.');
    }
    
}