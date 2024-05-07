const { Schema, model } = require("mongoose");

const LinkSchema = new Schema({
    linkId: Number,
    source: String,
    target: String,
    type: String
});

const LinkModel = model("Link", LinkSchema);
module.exports = LinkModel;