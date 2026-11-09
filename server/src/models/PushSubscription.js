import mongoose from "mongoose";

//una subscripcion = una navegador/dispositivo de un usuario.
const PushSubscriptionSchema = new mongoose.Schema(
    {
        user:{type:mongoose.Schema.Types.ObjectId, ref: "user", required: true,
        index: true},
        endpoint: {type: String, required: true, unique:true},
        keys:{
            p256dh: {type: String, required:true},
            auth: {type: String, required: true},
        },
        userAgent: {type:String},
    },
    {timestamps: true}
);

export default mongoose.model("PushSubscription", PushSubscriptionSchema);