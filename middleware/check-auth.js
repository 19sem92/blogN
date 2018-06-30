export default function (context) {
    console.log('middleware check-auth', context.req);
    context.store.dispatch('initAuth', context.req);

}