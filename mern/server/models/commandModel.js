import mongoose from "mongoose";

const commandSchema = mongoose.Schema(
    {
        device: {
            type: String,
            required: true,
        },
        models: {
            type: Array,
            required: true,
        },
        typeOfAction: {
            type: String,
            required: true,
        },
        commandBody: {
            type: String,
            required: true,  
        },
    }
);

export default commandSchema;