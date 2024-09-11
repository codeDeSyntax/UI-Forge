import mongoose from 'mongoose';
import { Model, models, Schema } from 'mongoose';


export const uiComponent = new Schema({
    componentName: {
        type: String,
        required: true,
    },
    componentCode: {
        type: String,
        required: true,
    },
    componentImages: {
        type: Array,
    },
    tech: {
        type: Array,
    },
 
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },

});

const component =  models.uiComponent || mongoose.model('uiComponent', uiComponent);

export default component;
