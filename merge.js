const fs = require('fs');
const path = require('path');

// New Obj that is going to store the merged JSON
let newObj = {};

// Command Line arguments validation and Error handling
const argc = process.argv.length;

if(argc != 6)
{
    console.error('This Service expects the following list of 4 arguments to be given in the following order');
    console.error('1. FolderPath \n2. InputFileBaseName \n3. OutputFileBaseName \n4. MaxOutputFileSize (in bytes Eg: 125kb is 128000)');
    console.log(`Kindly check the arguments provided, ${6-argc} arguments missing\n`);
    console.log("Be sure to read the README.md file attached");
    process.exit(1);
}

// Storing the Command Line Argument values
const folderPath = process.argv[2];
const ipFilePrefix = process.argv[3];
const opFilePrefix = process.argv[4];
const opFileSize = parseInt(process.argv[5]);

// The function for merging differnet JSON files
// Two arguments passed 1. Object on which merged writes should take place 2. Current obj retrived from filesystem
function mergeJson(writeObj, currentObj) {
    // for every key in currentobj
    for(let keys in currentObj)
    {
        // if key is unknown initialize a empty array
        if(!writeObj[keys])
        {
            writeObj[keys] = [];
        }
        // for all values in the key of current obj
        currentObj[keys].forEach(val => {
            // write the values to the key in newobj
            writeObj[keys].push(val);
        }); 
    }
    //return the newkey
    return writeObj;
}

// For reading all JSON objects in files of filesystem with input prefix
//initialize counter to 1;
let counter = 1,filename,status;
do {
    // construct the pathname for inputfiles
    filename = path.join(`${folderPath}`,`${ipFilePrefix}${counter++}.json`);
    // check if such files exist
    if(fs.existsSync(filename))
    {
        // if exists read the file and pass the obj to merge function above
        status = 1;
        // reading and parsing JSON from input file
        let rawData = fs.readFileSync(filename);
        let obj = JSON.parse(rawData);
        // merging read obj and newobj
        newObj = mergeJson(newObj,obj);
    }
    // when any such file doesnt exist stops!
    else status = 0;
} while (status);

// formatting Merged JSON obj
let mergedObj = JSON.stringify(newObj, null, " ");
let fileLen = mergedObj.length;

// Checking outputfilesize
if(fileLen <= opFileSize) fs.writeFileSync(path.join(`${folderPath}`,`${opFilePrefix}.json`),mergedObj);

else console.log('File Storage size exceeds the limit the user provided');
