import mongoose from 'mongoose';

const roles = {
    values: ["Admin", "User"],
    message: '{VALUE} invalid role'
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    role: {
        type: String,
        default: 'User',
        required: [true, 'role is required'],
        enum: roles
    },
    refreshToken: {
        type: String,
        default: null,
    },
});

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

const User = mongoose.model('User', userSchema);
export default User;