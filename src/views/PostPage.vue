<template>
    <div class="page-container">
      <main class="main-content">
        <div class="post-detail-container">
          <h1 class="post-title">{{ postTitle }}</h1>
          <div class="form-row">
            <label>Body</label>
            <input type="text" v-model="postBody" class="post-input" />
          </div>
          <div class="button-row">
            <button @click="updatePost" class="btn update-btn">Update</button>
            <button @click="deletePost" class="btn delete-btn">Delete</button>
          </div>
        </div>
      </main>
    </div>
  </template>
  
<script>
    export default {
        name: "PostPage",
        data() {
            return {
                postBody: '',
                postTitle: '',
                postId: null,
            };
        },
        async mounted() {
            // @note: This method runs when the component is mounted
            const token = localStorage.getItem('token');
            // If no token, redirect (just a double-check, though router guard should handle it)
            if (!token) {
                this.$router.push('/login');
                return;
            }

            this.postId = this.$route.params.id;
            // Fetch the post from the backend
            try {
                const response = await fetch(`http://localhost:3000/posts/${this.postId}`, {
                    headers: { Authorization: token }
                });
                if (!response.ok) throw new Error('Failed to fetch post');
                const postData = await response.json();
                // Assuming the postData has fields like body and maybe a title
                this.postBody = postData.body || '';
                this.postTitle = postData.title || 'A Post';
            } catch (error) {
                console.error('Error fetching post:', error.message);
                // redirect to home if no post found
                this.$router.push('/');
            }
        },
        methods: {
            async updatePost() {
                // @note: Update the post in the database with the current postBody
                const token = localStorage.getItem('token');
                if (!token) return this.$router.push('/login');

                try {
                    const response = await fetch(`http://localhost:3000/posts/${this.postId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: token
                        },
                        body: JSON.stringify({ body: this.postBody })
                    });
                    if (!response.ok) throw new Error('Failed to update post');
                    this.$router.push('/');
                } catch (error) {
                    console.error('Error updating post:', error.message);
                    // redirect to home
                    this.$router.push('/');
                }
            },
            async deletePost() {
            // @note: Delete the post from the database
            const token = localStorage.getItem('token');
            if (!token) return this.$router.push('/login');

            try {
                const response = await fetch(`http://localhost:3000/posts/${this.postId}`, {
                    method: 'DELETE',
                    headers: { Authorization: token }
                });
                if (!response.ok) throw new Error('Failed to delete post');
                this.$router.push('/'); // After deleting, go back to home
            } catch (error) {
                console.error('Error deleting post:', error.message);
                // redirect to home
                this.$router.push('/');
            }
        }
    }
};
</script>
  