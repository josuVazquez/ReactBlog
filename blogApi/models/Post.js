const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El campo title es obligatorio']
    },
    category: {
        type: String,
        required: [true, 'El campo category es obligatorio']
    },
    text: {
        type: String,
        required: [true, 'El campo text es obligatorio']
    },
    // image: {
    //     type: 
    // }
});

module.exports = mongoose.model('post', postSchema);
