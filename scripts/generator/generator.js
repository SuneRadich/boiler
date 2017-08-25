/**
* Generate angular modules based on a folder and subfolders
*
* For instance, if given the type 'service', it will look for the folder /app/services, and build a module file,
* importing all subfolders as services on that angular modules
*
*/

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

/**
* Load the template matching the type given and continue writing the contents
*/
function generateModule(type) {

    fs.readFile(path.join(__dirname, `/${type}s.hbs`), 'utf8', function(err, templateString) {
        if (err) {
            return console.log('err', err);
        }
        writeFile(type, templateString);
    });
}

/**
* Given a type and a template string, will parse the folder matching the type, and use the template
* to generate the correct angular.module markup in a file
*/
function writeFile(type, rawTemplate) {


    var workingFolder = path.join(__dirname, '../../', `app/${type}s/`);
    var contents = [];

    var data = {
        type: type,
        items: []
    };

    var template = Handlebars.compile(rawTemplate);

    if (fs.existsSync(workingFolder)) {
        contents = fs.readdirSync(workingFolder);
    } else {
        fs.mkdirSync(workingFolder);
    }

    contents.forEach(function(file, index) {

        //Get the absolute path to the file
        let filePath = path.resolve(workingFolder, file);

        //If the entry is a directory, write an import statement to match
        if (fs.lstatSync(filePath).isDirectory()) {
            data.items.push({name: file});
        }
    });

    fs.writeFile(path.join(workingFolder, `${type}s.js`), template(data), function(err) {
        if (err) {
            return console.log('err', err);
        }
        console.log(`Generated angular \'${type}\' module`);
    });
}

module.exports = generateModule;
