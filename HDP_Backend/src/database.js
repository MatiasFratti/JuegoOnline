const mongoose = require('mongoose');



mongoose.connect('mongodb+srv://********************/Cluster0?retryWrites=true&w=majority',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology: true

})
.then(db=>console.log('data base conected'))
.catch(err=>console.log(err));
