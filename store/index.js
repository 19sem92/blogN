import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: []
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context){
              return new Promise((resolve, reject) =>{
                  setTimeout(() => {
                      vuexContext.commit('setPosts', [
                          {id: 'id-1', title: 'Hello there!', previewText: 'This is my first post', thumbnail: 'https://cdn.techinasia.com/wp-content/uploads/2017/06/47724337_l.jpg'},
                          {id: 'id-2', title: 'Hello there again!!!!', previewText: 'This is my second post', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYxFi0TeDiL4chNC7r1zqPwKJDRSiEXA2X7nF07VLXi0f1iHps2Q'}
                      ]);
                      resolve()
                  }, 1000)})
            },

            setPosts(vuexContext, posts){
                vuexContext.commit('setPosts', posts)
            }
        },
        getters:{
            loadedPosts(state) {
                return state.loadedPosts
            }
        }

    })
};

export default createStore