import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const directoryPath = './dist'; // Replace with your directory path
const searchPattern = /from\s+['"]([^'"]+)['"]/g;

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = path.join(__dirname, 'dist', 'index.js');

function getRelativePath(filePath, importPath) {
  const fileDir = path.dirname(filePath);
  const importDir = path.dirname(importPath);
  let relativePath = path.relative(fileDir, importDir);
  if (relativePath.startsWith('../')) {
    relativePath = relativePath.slice(3);
  }
  return relativePath.startsWith('.') ? `${relativePath.replace(importDir, '')}` : `./`;
}

function replaceImportsInFile(filePath) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const updatedContents = fileContents.replace(searchPattern, (match, importPath) => {
    if (importPath.startsWith('./') || importPath.startsWith('../')) {
      return match; // import path already contains relative prefix
    } else if (importPath.includes('/')) {
      const relativePath = getRelativePath(filePath, importPath);
      return `from "${relativePath}${importPath}.js"`;
    }
    return match;
  });
  fs.writeFileSync(filePath, updatedContents);
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      processDirectory(filePath);
    } else if (filePath.endsWith('.js')) {
      replaceImportsInFile(filePath);
    }
  }
}

function addShebang() {
  fs.readFile(indexPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  
    // add the shebang line at the beginning of the file
    const updatedContents = `#!/usr/bin/env node\n${data}`;
  
    // write the updated contents back to the file
    fs.writeFile(indexPath, updatedContents, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Shebang line added to index.js');
    });
  });
}

processDirectory(directoryPath);
addShebang();
