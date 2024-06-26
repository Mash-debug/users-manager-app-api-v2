const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    name: String,
    firstname: String,
    email: String,
    password: String
});

const UserModel = model("User", UserSchema);
module.exports = UserModel;