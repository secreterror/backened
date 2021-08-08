const express =require('express')
const connectDB=require('./config/db')


const cors=require('cors')

connectDB();

const app=express();

app.use(express.json());
app.use(cors());

app.use('/api/auth',require('./routes/auth'))
app.use('/api/private',require('./routes/private'))

app.listen(process.env.PORT || 8000,()=>{
    console.log('listening')
})

