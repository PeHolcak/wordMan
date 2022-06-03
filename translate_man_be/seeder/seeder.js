import userSeeder from "./user-seeder.js";
import roleSeeder from "./role-seeder.js";
import connectDB from '../configuration/database.js';
import Users from "../models/users.js";
import Roles from "../models/roles.js";

connectDB();

const importData = async () => {
    await catchError([Users.insertMany(userSeeder.importUsers()),
      Roles.insertMany(roleSeeder.importRoles())]);
};

const deleteData = async () => {
    await catchError([Users.deleteMany(),Roles.deleteMany()]);
};


const catchError = async (promissesArr) => {
    try {
      for(let i = 0; i < promissesArr.length; i++) {
        await promissesArr[i];
      };
        process.exit();
        }catch(error){
        console.error(`${error}`.red.bold);
        process.exit(1);
    }
}

  
  if (process.argv[2] === '-d') {
    deleteData();
  } else if(process.argv[2] === '-i'){
    importData();
  }
  