<template>
    <div class="admin-page">
        <section class="new-post">
            <AppButton @click="$router.push('/admin/new-post')">Create Post</AppButton>
        </section>
        <section class="existing-posts">
            <h1>existing posts</h1>
            <PostList :posts="loadedPostsComp" isAdmin/>
        </section>
    </div>

</template>

<script>
    import PostList from '@/components/Posts/PostList.vue'
    import AppButton from '@/components/UI/AppButton.vue'

    export default {
        layout: 'admin',
        components: {
            PostList,
            AppButton
        },
        computed: {
            loadedPostsComp(){
                return this.$store.getters.loadedPosts
            }
        }
    }

</script>

<style scoped>
    .admin-page{
        padding: 20px;
    }

    .new-post {
        text-align: center;
        border-bottom: 2px solid #ccc;
        padding-bottom: 10px;
    }

    .existing-posts {
        text-align: center;
    }

</style>
