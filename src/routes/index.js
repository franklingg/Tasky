const router = require('express').Router();

router.get('/', (req,res)=>{
    res.status(200).send("<h2>o pé faz assim, mãozinha pro lado,balanço o pescoço</h2>");
});

module.exports = router;