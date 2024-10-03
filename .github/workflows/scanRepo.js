  // scanRepo.js
const fs = require('fs');
const path = require('path');

function getDirectoryStructure(dir) {
    const structure = {};
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            structure[file] = getDirectoryStructure(fullPath);
        } else {
            structure[file] = null;
        }
    });

    return structure;
}

const repoPath = path.resolve(__dirname, '.'); // Set this to the root of your repo
const structure = getDirectoryStructure(repoPath);
fs.writeFileSync('directory_structure.json', JSON.stringify(structure, null, 2));

console.log('Directory structure saved to directory_structure.json');
