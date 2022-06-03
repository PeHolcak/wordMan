import faker from "faker";
import bcrypt from 'bcryptjs';

const USER_COUNT = 20;

const importUsers = () => {
const getRandomNumber = (max) => Math.round(Math.random() * max);
const userList = [];
for (let i = 0; i< USER_COUNT; i++){
    userList.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        login: _getuniqueValue(userList,"login",() => faker.internet.userName()),
        password: bcrypt.hashSync(faker.internet.password(),10),
        phoneContact: faker.phone.phoneNumber(),
        emailContact: faker.internet.email(),
        profilePhoto: faker.image.avatar(),
        roleId: getRandomNumber(5),
        year: getRandomNumber(6)
    });
}

userList.push({
    firstName: "admin",
    lastName: "admin",
    login:"admin",
    password: bcrypt.hashSync("admin123Admin",10),
    phoneContact: faker.phone.phoneNumber(),
        emailContact: faker.internet.email(),
        profilePhoto: faker.image.avatar(),
    roleId: 1,
    year: getRandomNumber(6)
});
console.log(userList);
return userList;
}

const _getuniqueValue = (list, atribut,generateNewFunc) => {
    const value = generateNewFunc();
    const isValueUsed = list.reduce((result, item) => {
        if(item[atribut] === value){
            return true;
        }
        return result;
    }, false);

    return isValueUsed ? _getuniqueValue(list, atribut,generateNewFunc) : value;
}

export default {
    importUsers
}