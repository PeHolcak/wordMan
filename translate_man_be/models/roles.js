import mongoose from 'mongoose';

const roleSchema = mongoose.Schema(
  {
    roleId: {
      type: Number,
      required: false,
    },
    roleName: {
      type: String,
      required: false,
    },
    roleDesc: {
        type: String,
        required: false,
    },
  },
  {
    timestamps: true,
  }
);

roleSchema.methods.isAdmin = async function() {
  return this.roleName === "Administrator";
}


const Roles = mongoose.model('roles', roleSchema);

export default Roles;
