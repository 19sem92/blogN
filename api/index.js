const expless = require('express');
const router = expless.Router();

const app = expless();
router.use((req, res, next) => {
   Object.setPrototypeOf(req, app.request);
   Object.setPrototypeOf(req, app.response);
   req.res = res;
   res.req = req;
   next()
});

router.post('/track-data', (req, res) => {
   console.log('Stored data!', req.body.data);
   res.status(200).json({message: 'Success!!'})
});

module.exports = {
    path: '/api',
    handler: router
}