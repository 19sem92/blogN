<template>
    <div class="admin-post-page">
        <p>Admin Post id: {{$route.params.postId}}</p>
        <section class="update-form">
            <AdminPostForm :post="loadedPost"  @submit="onSubmit"/>
        </section>
    </div>
</template>

<script>
    import axios from 'axios'
    import AdminPostForm from '@/components/Admin/AdminPostForm.vue'

    export default {
        layout: 'admin',
        middleware: ['check-auth', 'auth'],
        components: {
            AdminPostForm
        },

        asyncData(context){
            return axios
                .get('https://blogn-1dade.firebaseio.com/posts/' + context.params.postId + '.json')
                .then(res => {
                    console.log('https://blogn-1dade.firebaseio.com/posts/' + context.params.postId + '.json');
                    return {
                        loadedPost: res.data
                    }
                })
                .catch(e => context.error())
        },
//        data(){
//            return {
//                loadedPost: {
//                    author: 'Sergey',
//                    title: 'My post',
//                    content: 'Some content!!!',
//                    thumbnailLink: 'https://www.housingwire.com/ext/resources/images/editorial/A-New-Big-Images/technology/tech_two.jpg?1470759677'
//                }
//            }
//        },

        methods: {

            onSubmit(editedPost){

                this.$store.dispatch('editPost', {...editedPost, id: this.$route.params.postId}).then(() => {
                    this.$router.push('/admin')
                })
//                axios.put('https://blogn-1dade.firebaseio.com/posts/' + this.$route.params.postId + '.json', editedPost)
//                    .then(res => {
//                        console.log(res.data);
//                        this.$router.push('/admin')
//
//                    })
//                    .catch(e => context.error(e))

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
