import mongoose, { mongo } from 'mongoose'


const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    roles: [String],
    avatar: String
})

const UserModel = mongoose.model('User', userSchema);

export default UserModel;