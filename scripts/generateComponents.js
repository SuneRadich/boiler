const fs = require('fs');
const path = require('path');

var workingFolder = path.join(__dirname, '/../', 'app/components/'),
    contents = [],
    wstream;

function generateFile() {

    console.log('Generating angular \'component\' module');

    if (fs.existsSync(workingFolder)) {
        contents = fs.readdirSync(workingFolder);
    }
    else {
        fs.mkdirSync(workingFolder);
    }

    //Open filestream for writing
    wstream = fs.createWriteStream(path.join(workingFolder, 'components.js'));

    wstream.write('//This file is auto-generated on webpack builds, DO NOT EDIT!\n');

    //If we have any contents in the folder, build import statements for every folder
    if (contents.length > 0) {
        buildImports();
    }

    //Write the angular module declaration
    wstream.write('var module = angular.module(\'components\', [])\n');

    //If we have contents in the folder, add each of them as a component on the angular module
    if (contents.length > 0) {
        buildComponents();
    }

    //Prepare to export the module name
    wstream.write('module.name = \'components\';\n');

    //Export the angular module
    wstream.write('export default module.name;\n');

    //Close the stream
    wstream.end();


}

function buildImports() {

    //Loop over the content
    contents.forEach(function(file, index) {

        //Get the absolute path to the file
        let filePath = path.resolve(workingFolder, file);

        //Template to write the import statement
        let template = `import ${file} from './${ file }/${ file }.component';\n`;

        //If the entry is a directory, write an import statement to match
        if (fs.lstatSync(filePath).isDirectory()) {
            wstream.write(template);
        }
    });
}

function buildComponents() {

    //Loop over contents again, this time generating the component configuration
    contents.forEach(function(file, index) {

        var filePath = path.resolve(workingFolder, file);

        var suffix = contents.length === index + 1 ? ';\n' : '\n'

        var template = `.component('${file}', ${file})${suffix}`;

        if (fs.lstatSync(filePath).isDirectory()) {
            wstream.write(template);
        }
    });
}

//Start the script
generateFile();
