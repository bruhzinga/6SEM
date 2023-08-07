import fs from 'fs';
import path from 'path';
import glob from 'glob';


//Extract all .doc and .docx files from the given directory and subdirectories
// Use the glob library
export function extractWord(dir) {
    const wordFiles = glob.sync('**/*.docx', {cwd: dir});
    return wordFiles.map(file => {
        return path.join(dir, file);
    });


}

//Copy the .docx files to the given directory
export function copyWordFiles(wordFiles, dir) {
    wordFiles.forEach(file => {
        const fileName = path.basename(file);
        const dest = path.join(dir, fileName);
        fs.copyFileSync(file, dest);
    });


}

const InDirectory = `C:\\Users\\Dima\\Desktop\\ПСКП\\PSKP-6-sem-master`;
const OutDirectory = `C:\\Users\\Dima\\Desktop\\ПСКП\\ОТВЕТЫ`;

const wordFiles = extractWord(InDirectory);
console.log(wordFiles);
copyWordFiles(wordFiles, OutDirectory);
