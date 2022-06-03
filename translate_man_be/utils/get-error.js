import readJsonFile from "./read-json-file.js";

export default async (fileName, errorName, res) => {
    const error = ((await readJsonFile(`./errors/${fileName}`)||{}).errorList)[errorName];
    if(error){
        return res.status(error.status).json({ error: error});
    } else{
        return res.status(500).json({ error: {message: "Nastala nenámá chyba!", status: 500 }});
    }    
};