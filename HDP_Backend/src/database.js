const mongoose = require('mongoose');



mongoose.connect('mongodb+srv://Matias:ojDXYziPcxCGsNSc@cluster0-pb36h.mongodb.net/Cluster0?retryWrites=true&w=majority',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology: true

})
.then(db=>console.log('data base conected'))
.catch(err=>console.log(err));