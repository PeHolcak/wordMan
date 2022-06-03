import faker from "faker";

const word_COUNT = 20;

const getRandomArray = (callBack) => {
    const arr = [];
    for (let i = 0; i < getRandomNumber(20); i++) {
        arr.push(callBack(100));
    }
    return arr;
}

const getRandomNumber = (max) => Math.round(Math.random() * max);


const importwords = () => {
const wordList = [];
for (let i = 0; i< word_COUNT; i++){
    wordList.push({
        name: faker.name.title(),
        desc: faker.datatype.string(),
        credits: getRandomNumber(10),
        supervisor: `${faker.name.firstName()} ${faker.name.lastName()}`,
        goal: faker.datatype.string(),
        topicIdList: getRandomArray(()=>getRandomNumber(10)),
        materialIdList: getRandomArray(()=>getRandomNumber(10)),
        language: getRandomArray(()=>faker.datatype.string().toString()),
        degreeOfStudy: getRandomNumber(()=>faker.datatype.string()),
        formOfStudy: getRandomNumber(()=>faker.datatype.string())
    });
}
return wordList;
}

export default {
    importwords
}