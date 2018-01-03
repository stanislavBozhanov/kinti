const fs = require('fs');


const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);


function copyFileSync(oldFilePath, newFilePath) {
    try {
        const fileContent = fs.readFileSync(oldFilePath);
        fs.writeFileSync(newFilePath, fileContent);
        return true;
    } catch(error) {
        console.error(error);
        return false;
    }
}

// Same as sync ones but have callbacks which are executed when they are complete
function copyFile(oldFilePath, newFilePath, callback) {
    fs.readFile(oldFilePath, (error, fileContent) => {
        if (error) {
            console.log(error);
            callback(error);
        }

        fs.writeFile(newFilePath, fileContent, (error) => {
            if (error) {
                console.error(error);
                callback(error);
                return;
            }

            callback(null);
        })
    })
}

function copyFile2(oldFilePath, newFilePath) {
    return readFileAsync(oldFilePath)
        .then((fileContent) => writeFileAsync(newFilePath, fileContent))
        .catch((error) => {
            console.log(error);
            throw error;
        });
}

// if (copyFileSync('./package.json', './copiedPackage.json')) {
//     console.log('OK');
// } else {
//     console.log('NOT OK!');
// }

copyFile('./package.json', './copiedPackage.json', (error) => {
   if (!error){
       console.log('OK');
   } else {
       console.log('NOT OK!');
   }
});
