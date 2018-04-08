import mongoose, { mongo } from 'mongoose'


const Schema = mongoose.Schema;

const leaveSchema = new Schema({
    id: Schema.Types.ObjectId,
    fromDate: {
        type: String,
        required: true
    },
    toDate: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    user_id: Schema.Types.ObjectId
})

const LeaveModel = mongoose.model('Leave', leaveSchema);

export default LeaveModel;