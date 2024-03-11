import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import validator from "validator";


const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,  
        },
        permissions: {
            type: String,
            required: true, 
        }
    }
);


//static register method
userSchema.statics.register = async function(email, password){

    if(!email || !password){
            throw Error('Please enter all required parameters (email, password)')
        };
      

    if(!validator.isEmail(email)){
        throw Error('Email not valid')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password is too weak')
    }


    const emailExists = await this.findOne({email})
    if (emailExists){
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password, salt)


    const user = await this.create({email, password: hash, permissions: 'common'})
    return user
}


//static login method
userSchema.statics.login = async function(email, password){

    if(!email || !password){
            throw Error('Please enter all required parameters (email, password)')
        };
      
    const savedUser = await this.findOne({email})
    if (!savedUser){
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, savedUser.password )

    if (!match){
        throw Error('Incorrect password')
    }
    return savedUser
}


export default userSchema;