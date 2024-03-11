import mongoose from "mongoose";

const deviceSchema = mongoose.Schema(
    {
        device: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        position: {
            type: Object,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
        configuration: {
            type: String,
            required: true,
        }
    }
);

export default deviceSchema;