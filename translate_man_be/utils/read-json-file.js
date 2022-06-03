// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

import { readFile } from 'fs/promises';

export default async (absolutePath) => {
    try{
    // return JSON.parse(require(`.${absolutePath}`)||"{}");
    return JSON.parse((await readFile(
        new URL(`.${absolutePath}.json`, import.meta.url)
                )||"{}"));
    }catch(e){
        console.error(e);
        return {}
    }
};