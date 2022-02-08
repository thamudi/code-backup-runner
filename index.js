
const codeFellows = '/home/papa_skele/Code/code-fellows';
const fs = require('fs');
const path = require('path');
const { exec, execSync } = require('child_process');

let folderCount = 0;

async function folderDriller(dir) {
  fs.readdir(dir, (err, folders) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    // check if the folder directory does not include any .git folder
    if (!folders.includes('.git')) {
      // recursive function to drill into the next folder
      folders.forEach(folder => folderDriller(path.join(dir, folder)));
    } else {
      // log if founded
      execSync(`sh ./scripts/sync.sh ${dir}`,
        (error, stdout, stderr) => {
          console.log(stdout);
          console.log(stderr);
          if (error !== null) {
            console.log(`exec error: ${error}`);
          }
          folderCount += 1;
        });
    }
  });
}

// call drilling function
folderDriller(codeFellows).then(() => {
  console.log('Done 🍕 👌');
  console.log(`Total Folders 📁 count = ${folderCount}`);
}).catch(error => console.error(error));