const mongoose =require('mongoose')
MONGO_URI='PUT_YOUR_URI'
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