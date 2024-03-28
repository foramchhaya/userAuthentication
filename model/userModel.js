import mongoose from "mongoose";
import {} from "dotenv/config";
// const uri =
//     "mongodb+srv://foramchhaya95:ebJnNbx3WoKsKGq3@cluster0.pmnjtxa.mongodb.net/costcoUsers?retryWrites=true&w=majority";

const uri = process.env.MONGO_URI;

mongoose
    .connect(uri)
    .then(() =>
        console.log("*********Connected to  MongoDb Successfully!***********")
    )
    .catch((err) =>
        console.log(` ######## Connection failed due to error below\n ${err}`)
    );

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    pwd: { type: String, required: true },
});

const userModel = mongoose.model("generalUsers", userSchema);

export default userModel;
