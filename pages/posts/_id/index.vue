<template>
    <div class="single-post-page">
        <section class="post">
            <h1 class="post-title">{{ loadedPost.title }}</h1>
            <div class="post-details">
                <div class="post-detail">last updated on {{loadedPost.updatedDate}}</div>
                <div class="post-detail">written by {{loadedPost.author}}</div>
            </div>
            <p class="post-content">
                {{loadedPost.content}}
            </p>
        </section>
        <section class="post-feedback">
            <p>
                Let me know what you think  <a href="">let me know</a>
            </p>
        </section>

    </div>

</template>

<script>
    export default {
        asyncData(context, cb){
            console.log(context);
            setTimeout(()=> {
                cb(null, {loadedPost:
                    {
                        id: 'id-1',
                        title: 'Hello there! Post Id: '+ context.route.params.id, // this.$route.params.id (In asyncData we do not have access to this like vue ex)
                        previewText: 'This is my first post',
                        author: 'Sergey',
                        updatedDate: new Date(),
                        content: 'My awesome content',
                        thumbnail: 'https://cdn.techinasia.com/wp-content/uploads/2017/06/47724337_l.jpg'},
                })

            } ,1550)
        }
    }

</script>

<style>
    .single-post-page {
        padding: 30px;
        text-align: center;
        box-sizing: border-box;
    }

    .post {
        width: 100%;
    }

    @media (min-width: 768px) {
        .post {
            width: 600px;
            margin: auto;
        }
    }

    .post-title {
        margin: 0;
    }

    .post-details {
        padding: 10px;
        box-sizing: border-box;
        border-bottom: 3px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    @media (min-width: 768px) {
        .post-details {
            flex-direction: row;
        }
    }

    .post-detail {
        color: rgb(88, 88, 88);
        margin: 0 10px;
    }

    .post-feedback a {
        color: red;
        text-decoration: none;
    }

    .post-feedback a:hover,
    .post-feedback a:active {
        color: salmon;
    }

</style>
