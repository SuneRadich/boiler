var fs = require('fs');
var path = require('path');

var workingFolder = path.join(__dirname, '/../', 'app/components/');

function buildComponents() {

    //Open filestream for writing
    var wstream = fs.createWriteStream(path.join(workingFolder, 'components.js'));

    //Get array of contents in the workingfolder
    var contents = fs.readdirSync(workingFolder);

    wstream.write('//This file is auto-generated on webpack builds, DO NOT EDIT!\n');

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

    //Write the angular module declaration
    wstream.write('angular.module(\'components\', [])');

    //Loop over contents again, this time generating the component configuration
    contents.forEach(function(file, index) {

        var filePath = path.resolve(workingFolder, file);

        var suffix = contents.length === index + 1 ? ';\n' : '\n'

        var template = `.component('${file}', ${file})${suffix}`;

        if (fs.lstatSync(filePath).isDirectory()) {
            wstream.write(template);
        }
    });

    wstream.end();

}

//Test if we have a components folder at all
if (fs.existsSync(workingFolder)) {
    console.log('Generating component module');
    buildComponents();
}
//Otherwise output that we have no components to build
else {
    console.log('Generating component module: No components found!');
}
