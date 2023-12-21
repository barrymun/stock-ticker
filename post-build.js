import fs from "fs";
import path from "path";

const directoryPath = './dist'; // Replace with your directory path
const searchPattern = /from\s+['"]([^'"]+)['"]/g;

function getRelativePath(filePath, importPath) {
  const fileDir = path.dirname(filePath);
  const importDir = path.dirname(importPath);
  let relativePath = path.relative(fileDir, importDir);
  if (relativePath.startsWith('../')) {
    relativePath = relativePath.slice(3);
  }
  console.log(fileDir, importDir, relativePath);
  return relativePath.startsWith('.') ? `${relativePath.replace(importDir, '')}` : `./`;
}

function replaceImportsInFile(filePath) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const updatedContents = fileContents.replace(searchPattern, (match, importPath) => {
    if (importPath.startsWith('./') || importPath.startsWith('../')) {
      return match; // Import path already contains relative prefix
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

processDirectory(directoryPath);
