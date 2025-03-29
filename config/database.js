// *-------------Connecting to the Data Base-------------*

const mongoose = require("mongoose");

require("dotenv").config(); // used to fill all the enviroment variable into process object

const connectDb = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
    })
    .then(console.log("DB Connected Successfully"))
    .catch((error)=>{
        console.log("Db Facing Connection Issue");
        console.log(error);
        process.exit(1);
    })
};

module.exports = connectDb;


// const mongoose = require("mongoose");
// require("dotenv").config();

// const connectDb = async () => {
//     try {
//         await mongoose.connect(process.env.DATABASE_URL, {
//             dbName: "VtubeDatabase", // Replace with your actual database name
//         });
//         console.log("DB Connected Successfully");
//     } catch (error) {
//         console.error("Db Facing Connection Issue", error);
//         process.exit(1);
//     }
// };

// module.exports = connectDb;
