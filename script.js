// fetch('https://api.jsonbin.io/v3/qs/671e5d04acd3cb34a89dee34') 
//     .then(response => response.json())
//     .then(posts => {
//         const postsContainer = document.querySelector('.posts-container');
//         posts.forEach(post => {
//             const postElement = document.createElement('div');
//             postElement.classList.add('post');
//             postElement.innerHTML = `
//                 <div class="post-avatar">
//                     <img src="pictures/profileIcon.jpg" alt="User Avatar">
//                 </div>
//                 <div class="post-header">
//                     <span>${new Date(post.createTime).toLocaleDateString()}</span>
//                 </div>
//                 <div class="post-image">
//                     <img src="${post.image}" alt="${post.title}">
//                 </div>
//                 <div class="post-content">
//                     <p>${post.content}</p>
//                 </div>
//                 <div class="post-footer">
//                     <span>🩷</span>
//                 </div>
//             `;
//             postsContainer.appendChild(postElement);
//         });
//     })
//     .catch(error => console.error('Error fetching posts:', error));



function loadPosts() {
    const postsContainer = document.querySelector('.posts-container');
    if (!postsContainer) return; // if container not found -> end the function

    fetch('posts.json') // Downloading local JSON file
        .then(response => response.json())
        .then(posts => {
            postsContainer.innerHTML = ''; // Clearing the container before adding posts
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <div class="post-avatar">
                        <img src="pictures/profileIcon.jpg" alt="User Avatar">
                    </div>
                    <div class="post-header">
                        <span>${new Date(post.createTime).toLocaleDateString()}</span>
                    </div>
                    ${post.image ? `<div class="post-image"><img src="${post.image}" alt="${post.title}"></div>` : ''}
                    <div class="post-content">
                        <p>${post.content}</p>
                    </div>
                    <div class="post-footer">
                        <span>🩷</span>
                    </div>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching local posts:', error));
}

// Calling a function when the page loads
window.onload = loadPosts;

// Toggles the visibility of the dropdown menu by switching between 'block' and 'none'.
function toggleDropdown() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// Close the dropdown menu when clicking outside of it
/*window.onclick = function(event) {
    if (!event.target.matches('.profile-icon, .profile-icon *')) {
        const dropdownMenu = document.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.style.display = 'none';
        }
    }
};*/

function redirectToLogin() {
    window.location.href = "Login.html";
}


