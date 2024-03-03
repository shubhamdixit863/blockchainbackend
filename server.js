require('dotenv').config()
const app=require("./app");
const port=process.env.PORT || 8090;
const mongoose=require("mongoose");

mongoose.connect(process.env.MONGOOSE_URL).then(res=>{
    app.listen(port,()=>{
        console.log(`Server running at port ${port}`);
    })
}).catch(err=>{
    console.log(`error connecting with database`,err);
})


