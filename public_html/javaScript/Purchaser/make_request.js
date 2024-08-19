/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


async function updateProductType() {
    const categorySelect = document.getElementById("category");
    const categoryId = categorySelect.value;
    const productTypeSelect = document.getElementById("productType");
    productTypeSelect.innerHTML = '<option>Select Type</option>'; // Clear existing options

    if (!categoryId ) return; // Stop if no category is selected
    
    if (categoryId === 'select'){
        reset();
        fetchCategories();
    }
    
    else {


    try {
        const response = await fetch(`http://localhost:8080/procurement_portal_back_end/api/productTypes?category_id=${categoryId}`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        data.forEach(item => {
            const option = new Option(item.name, item.id);
            productTypeSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again later.');
    }
    }
 
}



async function updateProduct() {
    const productTypeSelect = document.getElementById("productType");
    const productTypeId = productTypeSelect.value;
    const productSelect = document.getElementById("product");
    productSelect.innerHTML = '<option>Select Product</option>'; // Clear existing options

    if (!productTypeId) return; // Stop if no category is selected


    if (productTypeId === 'Select Type'){
        reset();
        fetchCategories();
    } else {
    try {
        const response = await fetch(`http://localhost:8080/procurement_portal_back_end/api/products?product_type_id=${productTypeId}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        data.forEach(item => {
            const option = new Option(item.name, item.id);
            productSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again later.');
    }}
  


}





async function showFeatures() {
  const productSelect = document.getElementById("product");
    const productId = productSelect.value;
    const featuresContainer = document.getElementById("featuresContainer");
    featuresContainer.innerHTML = ''; // Clear previous features

    if (!productId) return; // Stop if no product is selected
    
    if (productId==='Select Product'){
        reset();
        fetchCategories();
    } else {
    try {
        const response = await fetch(`http://localhost:8080/procurement_portal_back_end/api/features?product_id=${productId}`, {
            method: 'GET'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        data.forEach(feature => {
                var fieldset = document.createElement('fieldset');
                legend = document.createElement('legend');
                legend.textContent = feature.name;
                fieldset.appendChild(legend);

                feature.options.split(',').forEach(option => {
                    var label = document.createElement('label');
                    var input = document.createElement('input');
                    input.type = 'radio';
                    input.name = feature.name;
                    input.value = option.trim();
                    label.appendChild(input);
                    label.appendChild(document.createTextNode(option.trim()));
                    fieldset.appendChild(label);
                });

                featuresContainer.appendChild(fieldset);
            });
            featuresContainer.classList.remove('hidden');
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again later.');
    }}

}


async function fetchCategories() {
    
    
    try {
        const response = await fetch(`http://localhost:8080/procurement_portal_back_end/api/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('data are' ,data);
        updateDropdown('category', data);

    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again later.');
    }
    
   
}

function updateDropdown(elementId, items) { 
    const select = document.getElementById(elementId);
    select.innerHTML = `<option value="select">Select Category</option>`; // Explicit default option
    items.forEach(item => {
        select.innerHTML += `<option value="${item.id}">${item.name}</option>`;
    });
}

function reset() {
    const categorySelect = document.getElementById("category");
    const productTypeSelect = document.getElementById("productType");
    const productSelect = document.getElementById("product");
    const featuresContainer = document.getElementById("featuresContainer");
    const details = document.getElementById("details");
    const quantity = document.getElementById("quantity");


    categorySelect.innerHTML = '<option>Select Category</option>'; // Reset Category dropdown
    productTypeSelect.innerHTML = '<option>Select Type</option>'; // Reset product type dropdown
    productSelect.innerHTML = '<option>Select Product</option>'; // Reset product dropdown
    featuresContainer.innerHTML = ''; // Clear features
    featuresContainer.classList.add('hidden'); // Hide features container
    // Set the placeholder for the 'details' element
    details.value='';
    details.placeholder = "Specify other details, if any";
    // Clear the value for the 'quantity' element
    quantity.value = '';
}


async function submitRequest(){
    const category = document.getElementById("category").value;
    const productType = document.getElementById("productType").value;
    const product = document.getElementById("product").value;
    const features = Array.from(document.querySelectorAll('#featuresContainer input:checked'))
        .map(input => `${input.name}:${input.value}`)
        .join(', ');
    const addReq = document.getElementById("details").value;
    const quantity = document.getElementById("quantity").value;
    
    const resultMessage = document.getElementById("result_message");
    
    
    
    const userData = {
        category_id: category,
        product_type_id: productType,
        product_id: product,
        features: features,
        additional_req: addReq,
        quantity: quantity
    };

  
   
        try {
            const response = await fetch(`http://localhost:8080/procurement_portal_back_end/api/makeRequest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
                credentials: 'include' // Ensure cookies are included in the request
            });
            
            
            if (response.ok) {
                resultMessage.style.color = 'green';
                resultMessage.style.marginTop = '20px'; // Add top margin
                resultMessage.style.fontSize = '18px'; // Change font size
                resultMessage.textContent = "Request Submitted successfully.";
                reset();
                fetchCategories();
                
            } else {
                resultMessage.style.color = 'red';
                resultMessage.style.marginTop = '20px'; // Add top margin
                resultMessage.style.fontSize = '18px'; // Change font size
                resultMessage.textContent = "Can't add this user, error in response.";
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    }
   


document.addEventListener('DOMContentLoaded', function() {
    fetchCategories();  // This will load categories as soon as the page is ready
});

