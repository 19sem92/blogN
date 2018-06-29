<template>
    <div class="admin-post-page">
        <p>Admin Post id: {{$route.params.postId}}</p>
        <section class="update-form">
            <AdminPostForm :post="loadedPost" />
        </section>
    </div>
</template>

<script>
    import AdminPostForm from '@/components/Admin/AdminPostForm.vue'


    export default {
        layout: 'admin',
        components: {
            AdminPostForm
        },

        data(){
            return {
                loadedPost: {
                    author: 'Sergey',
                    title: 'My post',
                    content: 'Some content!!!',
                    thumbnailLink: 'https://www.housingwire.com/ext/resources/images/editorial/A-New-Big-Images/technology/tech_two.jpg?1470759677'
                }
            }
        }

    }

</script>

<style scoped>
    .update-form{
        width: 90%;
        margin: 20px auto;
    }

    @media (min-width: 768px){
        .update-form{
            width: 5000px;
        }
    }
</style>
