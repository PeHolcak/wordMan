import asyncHandler from 'express-async-handler';
import Word from '../models/word.js';
import wordCreateDtoInScheme from "../dtoIn/word-create.js";
import wordDeleteDtoInScheme from "../dtoIn/word-delete.js";
import wordUpdateDtoInScheme from "../dtoIn/word-update.js";
import wordListDtoInScheme from "../dtoIn/word-list.js";
import { isDtoInValid, checkUnsupportedKeyes } from '../helpers/validation-helper.js';
import getError from '../utils/get-error.js';


const wordCreate = asyncHandler(async (req, res) => {
  let error = {};
  if (await isDtoInValid(wordCreateDtoInScheme, req.body, res)) {
    error.unsupportedKeyes = checkUnsupportedKeyes(req.body, wordCreateDtoInScheme);
    const { firstSideWord, secondSideWord, firstSideWordDescription, secondSideWordDescription } = req.body;
    let word;
    try {
      word = await Word.create({ firstSideWord, secondSideWord, firstSideWordDescription, secondSideWordDescription });
    } catch (err) {
      console.log("err",err)
      await getError("word-error", "DbDoesNotRespond", res);
      return;
    }

    res.status(201).json({})
    return;

  } else {
    await getError("general-errors", "invalidDtoIn", res);
    return;
  }
});

const wordDelete = asyncHandler(async (req, res) => {
  let error = {};
  if (await isDtoInValid(wordDeleteDtoInScheme, req.body, res)) {
    error.unsupportedKeyes = checkUnsupportedKeyes(req.body, wordDeleteDtoInScheme);
    const { id } = req.body;

    let wordObj = {};
    try {
      wordObj = await Word.findOne({ "_id": id });
    } catch (err) {
      await getError("word-error", "DbDoesNotRespond", res);
      return;
    }

    let word;
    try {
      word = await Word.deleteOne( { "_id" : id });
    } catch (err) {
      console.error(err);
      await getError("word-error", "DbDoesNotRespond", res);
      return;
    }
    res.status(201).json({
      name: wordObj.name, desc: wordObj.desc, credits: wordObj.credits, supervisor: wordObj.supervisor, goal: wordObj.goal, topicIdList: wordObj.topicIdList, materialIdList: wordObj.materialIdList, language: wordObj.language, degreeOfStudy: wordObj.degreeOfStudy, formOfStudy: wordObj.formOfStudy
     })
    return;

  } else {
    await getError("general-errors", "invalidDtoIn", res);
  }
});

const wordUpdate = asyncHandler(async (req, res) => {
  let error = {};
  if (await isDtoInValid(wordUpdateDtoInScheme, req.body, res)) {
    error.unsupportedKeyes = checkUnsupportedKeyes(req.body, wordUpdateDtoInScheme);
    const { name, desc, credits, supervisor, goal, topicIdList, materialIdList, language, degreeOfStudy, formOfStudy, id } = req.body;
    let word;
    let wordObj = {};
    try {
      wordObj = await word.findOne({ "_id": id });
    } catch (err) {
      await getError("word-error", "DbDoesNotRespond", res);
      return;
    }

    if(!wordObj){
      await getError("word-error", "wordDoesNotExist", res);
    }


    try {
      word = await Word.updateOne( { "_id": id },
      {
        $set: {name, desc, credits, supervisor, goal, topicIdList, materialIdList, language, degreeOfStudy, formOfStudy},
         $currentDate: { lastUpdated: true } 
      });

    } catch (err) {
      await getError("word-error", "DbDoesNotRespond", res);
      return;
    }

    res.status(201).json({
      name: wordObj.name, desc: wordObj.desc, credits: wordObj.credits, supervisor: wordObj.supervisor, goal: wordObj.goal, topicIdList: wordObj.topicIdList, materialIdList: wordObj.materialIdList, language: wordObj.language, degreeOfStudy: wordObj.degreeOfStudy, formOfStudy: wordObj.formOfStudy
    })
    return;

  } else {
    await getError("general-errors", "invalidDtoIn", res);
    return;
  }
});

const wordList = asyncHandler(async (req, res) => {
  let error = {};
  if (await isDtoInValid(wordListDtoInScheme, req.body, res)) {
    error.unsupportedKeyes = checkUnsupportedKeyes(req.body, wordListDtoInScheme);
    let wordList;
    try {
      wordList = await Word.find({ });
    } catch (err) {
      await getError("word-error", "DbDoesNotRespond", res);
      return;
    }

    res.status(201).json({
      wordList });
    return;

  } else {
    await getError("general-errors", "invalidDtoIn", res);
    return;
  }
});

export {
  wordCreate,
  wordDelete,
  wordUpdate,
  wordList
}