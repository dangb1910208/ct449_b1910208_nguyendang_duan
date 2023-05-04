const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
async function connect() {
    try{
        await mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
         });
         console.log('connect Success');
    }catch(e){
        console.log(e);
    }
    
}
module.exports = { connect };