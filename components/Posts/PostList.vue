<template>
    <section class="post-list">

        <PostPreview
            v-for="post in posts"
            :key="post.id"
            :is-admin="isAdmin"
            :id="post.id"
            :thumbnail="post.thumbnail"
            :title="post.title"
            :previewText="post.previewText"
        />

        <!--/>-->

        <!--<PostPreview-->
                <!--:is-admin="isAdmin"-->
                <!--id="id-1"-->
                <!--thumbnail="https://cdn.techinasia.com/wp-content/uploads/2017/06/47724337_l.jpg"-->
                <!--title="Hello there!"-->
                <!--previewText="This is my first post"-->

        <!--/>-->
        <!--<PostPreview-->
                <!--:is-admin="isAdmin"-->
                <!--id="id-2"-->
                <!--thumbnail="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYxFi0TeDiL4chNC7r1zqPwKJDRSiEXA2X7nF07VLXi0f1iHps2Q"-->
                <!--title="Hello there again!!!!"-->
                <!--previewText="This is my second post"-->

        <!--/>-->
    </section>

</template>

<script>
    import PostPreview from '~/components/Posts/PostPreview.vue'

    export default {
        components: {
            PostPreview
        },
        props: {
            isAdmin:{
                type: Boolean,
                default: false
            },

            posts: {
                type: Array,
                required: true
            }

        }
    }

</script>

<style>

    .post-list {
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

</style>
