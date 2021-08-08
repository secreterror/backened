const mongoose =require('mongoose')
MONGO_URI='mongodb+srv://admin:heyadmin@cluster0.sdbhy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const connectDB= async() =>{
    console.log('heee')
    await mongoose.connect(MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:true,
        useCreateIndex:true
    });
    console.log('mongo db connecrted')
}
module.exports=connectDB