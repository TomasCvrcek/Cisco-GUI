import mongoose from "mongoose";

const generalDeviceSchema = mongoose.Schema(
    {
        deviceType: {
            type: String,
            required: true,
        },
        models: {
            type: Array,
            required: true,
        },
        default_configuration: {
            type: String,
            required: true,
        }
    }
);

export default generalDeviceSchema;





