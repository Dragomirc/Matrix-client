const { sh } = require('tasksfile')
const fs = require('fs');
const path = require('path');

const APP_FOLDER = path.resolve(__dirname, '../app/');

if ( fs.existsSync(APP_FOLDER + '/src/styles/style.scss') ) {
    if ( !fs.existsSync(APP_FOLDER + '/compiled') ) {
        fs.mkdirSync(APP_FOLDER + '/compiled');
    }
    if ( !fs.existsSync(APP_FOLDER + '/compiled/styles') ) {
        fs.mkdirSync(APP_FOLDER + '/compiled/styles');
    }
    
    sh('node ./node_modules/sass/sass.js app/src/styles/scss/style.scss app/compiled/styles/vendor.css');
} else {
    console.log('No sass file found');
}
