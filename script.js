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
    fetch('posts.json') // Загружаем локальный JSON файл
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.querySelector('.posts-container');
            postsContainer.innerHTML = ''; // Очищаем контейнер перед добавлением постов
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

// Вызов функции при загрузке страницы
window.onload = loadPosts;
