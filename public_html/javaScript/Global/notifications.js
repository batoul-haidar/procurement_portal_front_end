document.addEventListener('DOMContentLoaded', () => {
    const notificationBtn = document.getElementById('notification_btn');
    const notificationCountElement = document.getElementById('notification_count');
    let notificationsFetched = [];  // Track fetched notifications

    // Function to fetch notifications and update the count
    async function fetchNotifications() {
        try {
            const response = await fetch('http://localhost:8080/procurement_portal_back_end/api/notificationServlet',{
                method: 'GET',
                credentials: 'include'
            }); // Adjust the URL based on your servlet mapping
            if (response.ok) {
                const notifications = await response.json();
                notificationsFetched = notifications; // Store fetched notifications

                updateNotificationCount();
                createDropdownContent(notifications);
            } else {
                console.error('Failed to fetch notifications');
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    }

    // Function to update the notification count
    function updateNotificationCount() {
        const unreadCount = notificationsFetched.length;
        notificationCountElement.textContent = unreadCount;
    }

    // Function to create dropdown content
    function createDropdownContent(notifications) {
        let dropdownContent = document.getElementById('notification_dropdown_content');
        if (!dropdownContent) {
            dropdownContent = document.createElement('div');
            dropdownContent.id = 'notification_dropdown_content';
            dropdownContent.className = 'dropdown-content';
            document.body.appendChild(dropdownContent);
        }
        dropdownContent.innerHTML = ''; // Clear existing content

        notifications.forEach(notification => {
            const notificationLink = document.createElement('a');
            notificationLink.href = notification.link;
            notificationLink.textContent = notification.message;
            notificationLink.addEventListener('click', () => {
                notificationsFetched = [];  // Clear fetched notifications on click
                notificationCountElement.textContent = 0; // Reset count
            });
            dropdownContent.appendChild(notificationLink);
        });
    }

    // Fetch notifications when the page loads
    fetchNotifications();

    // Open the notification dropdown and reset the count
    notificationBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click event from propagating to the window

        let dropdownContent = document.getElementById('notification_dropdown_content');
        if (!dropdownContent) {
            dropdownContent = document.createElement('div');
            dropdownContent.id = 'notification_dropdown_content';
            dropdownContent.className = 'dropdown-content';
            document.body.appendChild(dropdownContent);
        }
        
        // Position the dropdown menu near the button
        const rect = notificationBtn.getBoundingClientRect();
        dropdownContent.style.top = `${rect.bottom + window.scrollY}px`;
        dropdownContent.style.left = `${rect.left + window.scrollX}px`;

        // Toggle the dropdown menu visibility
        dropdownContent.classList.toggle('show');

        // Reset the notification count if the dropdown is shown
        if (dropdownContent.classList.contains('show')) {
            notificationsFetched = [];  // Clear fetched notifications on view
            notificationCountElement.textContent = 0; // Reset count
        }
    });

    // Close the dropdown menu if clicked outside
    window.addEventListener('click', (event) => {
        const dropdownContent = document.getElementById('notification_dropdown_content');
        if (dropdownContent && !dropdownContent.contains(event.target) && event.target !== notificationBtn) {
            dropdownContent.classList.remove('show');
        }
    });

    // Function to handle new notifications
    async function handleNewNotifications() {
        await fetchNotifications(); // Fetch notifications and update the count
    }

    // Simulate receiving new notifications (for demo purposes)
    setInterval(handleNewNotifications, 60000); // Fetch new notifications every minute
});

/*
document.addEventListener('DOMContentLoaded', () => {
    const notificationBtn = document.getElementById('notification_btn');
    const notificationCountElement = document.getElementById('notification_count');
    let notificationCount = 0;

    // Function to fetch notifications and update the count
    async function fetchNotifications() {
        try {
            const response = await fetch('http://localhost:8080/procurement_portal_back_end/api/notificationServlet'); // Adjust the URL based on your servlet mapping
            if (response.ok) {
                const notifications = await response.json();
                notificationCount = notifications.length;
                notificationCountElement.textContent = notificationCount;

                // Create the dropdown menu content
                let dropdownContent = document.getElementById('notification_dropdown_content');
                if (!dropdownContent) {
                    dropdownContent = document.createElement('div');
                    dropdownContent.id = 'notification_dropdown_content';
                    dropdownContent.className = 'dropdown-content';
                    document.body.appendChild(dropdownContent);
                }
                dropdownContent.innerHTML = ''; // Clear existing content

                notifications.forEach(notification => {
                    const notificationLink = document.createElement('a');
                    notificationLink.href = notification.link;
                    notificationLink.textContent = notification.message;
                    notificationLink.addEventListener('click', () => {
                        notificationCount = 0;
                        notificationCountElement.textContent = notificationCount;
                    });
                    dropdownContent.appendChild(notificationLink);
                });
            } else {
                console.error('Failed to fetch notifications');
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    }

    // Fetch notifications when the page loads
    fetchNotifications();

    // Open the notification dropdown and reset the count
    notificationBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click event from propagating to the window

        let dropdownContent = document.getElementById('notification_dropdown_content');
        if (!dropdownContent) {
            dropdownContent = document.createElement('div');
            dropdownContent.id = 'notification_dropdown_content';
            dropdownContent.className = 'dropdown-content';
            document.body.appendChild(dropdownContent);
        }
        
        // Position the dropdown menu near the button
        const rect = notificationBtn.getBoundingClientRect();
        dropdownContent.style.top = `${rect.bottom + window.scrollY}px`;
        dropdownContent.style.left = `${rect.left + window.scrollX}px`;

        // Toggle the dropdown menu visibility
        dropdownContent.classList.toggle('show');

        // Reset the notification count if the dropdown is shown
        if (dropdownContent.classList.contains('show')) {
            notificationCount = 0;
            notificationCountElement.textContent = 0;
        }
    });

    // Close the dropdown menu if clicked outside
    window.addEventListener('click', (event) => {
        const dropdownContent = document.getElementById('notification_dropdown_content');
        if (dropdownContent && !dropdownContent.contains(event.target) && event.target !== notificationBtn) {
            dropdownContent.classList.remove('show');
        }
    });

    // Function to handle new notifications
    async function handleNewNotifications() {
        await fetchNotifications(); // Fetch notifications and update the count
    }

    // Simulate receiving new notifications (for demo purposes)
    setInterval(handleNewNotifications, 60000); // Fetch new notifications every minute
});


*/