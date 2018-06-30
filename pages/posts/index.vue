<!--
<template>
    <div class="post-page">
        <h1>post page main</h1>
        <PostList :posts="loadedPosts"/>
    </div>

</template>

<script>

    import PostList from '~/components/Posts/PostList.vue'

    export default {
        components: {
            PostList
        },
        asyncData(context) {
            return new Promise((resolve, reject)=> {
                setTimeout(()=> {
                    resolve({
                        loadedPosts: [
                            {id: 'id-1', title: 'Hello there!', previewText: 'This is my first post', thumbnail: 'https://cdn.techinasia.com/wp-content/uploads/2017/06/47724337_l.jpg'},
                            {id: 'id-2', title: 'Hello there again!!!!', previewText: 'This is my second post', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYxFi0TeDiL4chNC7r1zqPwKJDRSiEXA2X7nF07VLXi0f1iHps2Q'}
                        ]
                    })
                }, 1000)
//                reject(new Error())
            })
                .then( (data) => {
                    return data
                })
                .catch(e => {
                    context.error(e)
                })
        },
        created() {
            this.$store.dispatch('setPosts', this.loadedPosts)
        }

    }
</script>
-->


<!--
<template>
    <div class="post-page">
        <h1>post page main</h1>
        <PostList :posts="loadedPostsComp"/>
    </div>

</template>

<script>

    import PostList from '~/components/Posts/PostList.vue'

    export default {
        components: {
            PostList
        },
        fetch(context) {
            if(context.store.state.loadedPosts.length > 0){
                return null;
            }

            return new Promise((resolve, reject)=> {
                setTimeout(()=> {
                    resolve({
                        loadedPosts: [
                            {id: 'id-1', title: 'Hello there!', previewText: 'This is my first post', thumbnail: 'https://cdn.techinasia.com/wp-content/uploads/2017/06/47724337_l.jpg'},
                            {id: 'id-2', title: 'Hello there again!!!!', previewText: 'This is my second post', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYxFi0TeDiL4chNC7r1zqPwKJDRSiEXA2X7nF07VLXi0f1iHps2Q'}
                        ]
                    })
                }, 1000)
//                reject(new Error())
            })
                .then( (data) => {
                    context.store.commit('setPosts', data.loadedPosts)
                })
                .catch(e => {
                    context.error(e)
                })
        },
        computed: {
            loadedPostsComp(){
                return this.$store.getters.loadedPosts
            }
        }

    }
</script>

-->








<!--
nuxtServerInit


-->
<template>
    <div class="post-page">
        <h1>post page main</h1>
        <PostList :posts="loadedPostsComp"/>
    </div>

</template>

<script>


    export default {
        computed: {
            loadedPostsComp(){
                return this.$store.getters.loadedPosts
            }
        }

    }
</script>
<style scoped>

    .post-page{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    .post-page h1{
        width: 100%;
        text-align: center;
    }

</style>
