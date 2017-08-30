#!/usr/bin/env node

const chokidar = require('chokidar');
const generator = require('./generator/generator');

console.log('\nWatching for new components, filters and services\n');

let watcher = chokidar.watch([
    './app/components/',
    './app/filters/',
    './app/services'
], {
    ignoreInitial: true
})
    //When ever a folder is added to the paths we are watching
    .on('addDir', function(path) {

        let regExp = /components|filters|services/i;
        //Did the folder match the above regexp?
        let found = path.match(regExp);
        if (found) {
            //Generate updated angular module for the given path
            generator(found[0]);
        }
    });

//https://nodejs.org/api/process.html#process_signal_events
process.stdin.resume();

/**
* Clean up logic
* To prevent a node process of running in the background if the script is stopped/crashes
*/
function cleanUp() {
    //Stop all watchers
    watcher.close();
    //Exit process gracefully
    process.exit();
}

//Listen for exit via ctrl-c
process.on('SIGINT', function() {
    console.log('SIGINT: Closing 1508 watch');
    cleanUp();
});
process.on('uncaughtException', function(err) {
    console.log('Uncaught exception: Closing 1508 watch', err);
    cleanUp();
});
process.on('SIGTERM', function() {
    console.log('SIGTERM: Closing 1508 watch');
    cleanUp();
});
