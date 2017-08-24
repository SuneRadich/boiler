const fs = require('fs');
const path = require('path');

var workingFolder, wstream, contents, config;

function generateFile(type, options) {

    contents = [];
    workingFolder = path.join(__dirname, '/../', `app/${type}s/`);
    config = options || {};

    console.log(`Generating angular \'${type}\' module`);

    if (fs.existsSync(workingFolder)) {
        contents = fs.readdirSync(workingFolder);
    } else {
        fs.mkdirSync(workingFolder);
    }

    //Open filestream for writing
    wstream = fs.createWriteStream(path.join(workingFolder, `${type}s.js`));

    wstream.write('//This file is auto-generated on webpack builds, DO NOT EDIT!\n');

    //If we have any contents in the folder, build import statements for every folder
    if (contents.length > 0) {
        buildImports(type);
    }

    //Write the angular module declaration
    wstream.write(`var module = angular.module(\'${type}s\', [])\n`);

    //If we have contents in the folder, add each of them as a component on the angular module
    if (contents.length > 0) {
        buildComponents(type);
    }

    //Prepare to export the module name
    wstream.write(`module.name = \'${type}s\';\n`);

    //Export the angular module
    wstream.write('export default module.name;\n');

    //Close the stream
    wstream.end();


}

function buildImports(type) {

    //Loop over the content
    contents.forEach(function(file, index) {

        //Get the absolute path to the file
        let filePath = path.resolve(workingFolder, file);

        //Template to write the import statement
        let template = `import ${file} from './${file}/${file}.${type}';\n`;

        //If the entry is a directory, write an import statement to match
        if (fs.lstatSync(filePath).isDirectory()) {
            wstream.write(template);
        }
    });
}

function buildComponents(type, options) {

    //Loop over contents again, this time generating the component configuration
    contents.forEach(function(file, index) {

        var filePath = path.resolve(workingFolder, file);

        if (fs.lstatSync(filePath).isDirectory()) {

            var suffix = contents.length === index + 1 ? ';\n' : '\n'
            var nameTemplate = (config.appendType === false) ? `${file}` : `${file}${type}`;
            var template = `.${type}('${nameTemplate}', ${file})${suffix}`;

            wstream.write(template);
        }
    });
}


module.exports = generateFile;
