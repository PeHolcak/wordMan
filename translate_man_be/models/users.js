import mongoose from 'mongoose';
import bcrypt from "bcryptjs"

const usersSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
        type: String,
        required: false,
      },
      login: {
        type: String,
        required: false,
        unique: false
      },
      password: {
        type: String,
        required: false,
      },
      phoneContact: {
      type: String,
      required: false,
    },
    emailContact: {
        type: String,
        required: false
      },
      profilePhoto: {
        type: String,
        required: false,
      },
      roleId: {
        type: Number,
        required: false,
      },
      year: {
        type: Number,
        required: false,
      }
  },
  {
    timestamps: true,
  }
)

usersSchema.methods.matchPassword = async function(formPassword) {
  return await bcrypt.compare(formPassword, this.password);
}


const Users = mongoose.model('users', usersSchema)

export default Users
