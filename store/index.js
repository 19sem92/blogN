import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts
            },
            addPost(state, post){
                state.loadedPosts.push(post)
            },
            editPost(state, editedPost){
                const postIndex = state.loadedPosts.findIndex( (post) => {
                    console.log(post.id);
                    return post.id === editedPost.id
                });
                state.loadedPosts[postIndex] = editedPost
            },

            setToken(state, token) {
                state.token = token
            },
            clearToken(state) {
                state.token = null
            }
        },
        actions: {
            // nuxtServerInit(vuexContext, context){
            //   return new Promise((resolve, reject) =>{
            //       setTimeout(() => {
            //           vuexContext.commit('setPosts', [
            //               {id: 'id-1', title: 'Hello there!', previewText: 'This is my first post', thumbnail: 'https://cdn.techinasia.com/wp-content/uploads/2017/06/47724337_l.jpg'},
            //               {id: 'id-2', title: 'Hello there again!!!!', previewText: 'This is my second post', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYxFi0TeDiL4chNC7r1zqPwKJDRSiEXA2X7nF07VLXi0f1iHps2Q'}
            //           ]);
            //           resolve()
            //       }, 1000)})
            // },

            nuxtServerInit(vuexContext, context){
                return axios.get('https://blogn-1dade.firebaseio.com/posts.json')
                    .then(res => {
                        console.log('before:',vuexContext.state.loadedPosts);
                        const postsArr = [];
                        for (const key in res.data ){
                            postsArr.push({ ...res.data[key], id: key})
                        }
                        vuexContext.commit('setPosts', postsArr);
                        console.log('after: ',vuexContext.state.loadedPosts);
                    })
                    .catch(e => context.error(e))

            },
            addPost(vuexContext, postData) {
                const createdPost = {
                    ...postData,
                    updatedDate: new Date()
                };
                console.log(createdPost, 'https://blogn-1dade.firebaseio.com/posts.json?auth='+ vuexContext.state.token );
                return axios
                    .post('https://blogn-1dade.firebaseio.com/posts.json?auth='+ vuexContext.state.token, createdPost)
                        .then(res =>{
                            vuexContext.commit('addPost', {...createdPost, id: res.data.name});

                        })
                        .catch(e => console.log(e))
            },

            editPost(vuexContext, editedPost) {
                return axios
                    .put('https://blogn-1dade.firebaseio.com/posts/' + editedPost.id + '.json?auth=' + vuexContext.state.token, editedPost)
                        .then(res => {
                            console.log(vuexContext.state.loadedPosts, "editPost:", editedPost);
                            console.log("editPostHTTP//!!!!!<<<<<>>>>:", 'https://blogn-1dade.firebaseio.com/posts/' + editedPost.id + '.json', editedPost);
                            vuexContext.commit('editPost', editedPost);

                        })
                        .catch(e => context.error(e))

            },

            setPosts(vuexContext, posts){
                vuexContext.commit('setPosts', posts)
            },

            authUser(vuexContext, authData){
                let authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+ process.env.fbAPIKey;

                if (!authData.isLogin){
                    authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+ process.env.fbAPIKey;
                }

                return axios
                    .post(authUrl,

                    {
                        email: authData.email,
                        password: authData.pass,
                        returnSecureToken: true
                    }
                )
                    .then(res => {
                        console.log(res, 'res.data.expiresIn: ', res.data.expiresIn *1000);
                        vuexContext.commit('setToken', res.data.idToken);
                        localStorage.setItem('token', res.data.idToken);
                        localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(res.data.expiresIn) *1000);
                        Cookie.set('jwt', res.data.idToken);
                        Cookie.set('expDate', new Date().getTime() + Number.parseInt(res.data.expiresIn) *1000);

                        // vuexContext.dispatch('setLogoutTimer', res.data.expiresIn * 1000)
                    })
                    .catch(e => console.log(e))
            },
            // setLogoutTimer(vuexContext, duration) {
            //     setTimeout(()=> {
            //         vuexContext.commit('clearToken')
            //     }, duration)
            // },
            initAuth(vuexContext, req) {
                let token;
                let expDate;

                if(req){
                    if(!req.headers.cookie) {
                        return
                    }
                    const jwtCookie = req.headers.cookie
                        .split(';')
                        .find(c => c.trim().startsWith('jwt='));
                    if (!jwtCookie){
                        return
                    }
                    token = jwtCookie.split('=')[1];
                    expDate = req.headers.cookie
                        .split(';')
                        .find(c => c.trim().startsWith('expDate='))
                        .split('=')[1]
                    ;

                }else{
                    token = localStorage.getItem('token');
                    expDate = localStorage.getItem('tokenExpiration');


                }
                if (new Date().getTime() > +expDate || !token){
                    console.log('No token or invalid token');
                    vuexContext.dispatch('logOut');
                    return
                }

                // vuexContext.dispatch('setLogoutTimer', +expDate - new Date().getTime());
                vuexContext.commit('setToken', token);

            },
            logOut(vuexContext){
                vuexContext.commit('clearToken');
                Cookie.remove('jwt');
                Cookie.remove('expDate');

                if(process.client){
                    localStorage.removeItem('token');
                    localStorage.removeItem('tokenExpiration');
                }

            }
        },
        getters:{
            loadedPosts(state) {
                return state.loadedPosts
            },
            isAuth(state) {
                return state.token != null
            }
        }

    })
};

export default createStore