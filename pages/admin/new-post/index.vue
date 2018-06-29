<template>
    <div class="admin-new-post-page">
        <section class="new-post-form">
            <AdminPostForm @submit="onSubmit"/>

        </section>
    </div>

</template>

<script>
    import axios from 'axios'
    import AdminPostForm from '@/components/Admin/AdminPostForm.vue'


    export default {
        layout: 'admin',
        components: {
            AdminPostForm
        },
        methods: {
            onSubmit(postData){
                axios.post('https://blogn-1dade.firebaseio.com/posts.json', {...postData, updatedDate: new Date()})
                    .then(res => console.log(res))
                    .catch(e => console.log(e))
            }

        }

    }

</script>

<style>
    .new-post-form{
        width: 90%;
        margin: 20px auto;
    }

    @media (min-width: 768px){
        .new-post-form{
            width: 500px
        }
    }
</style>
