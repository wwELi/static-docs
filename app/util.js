const path = require("path");
const fs = require('fs');
const { output_path, file_type_reg, static_path } = require('./constant')

function getStaticPathByFilename(filename) {
    return path.join(__dirname, "../html", filename);
}

function getOutputPathByFilename(filename) {
    return path.join(output_path, filename)
}

/**
 * copy assets
 */
const fspromises = require('fs').promises;
async function copyDirectory(sourceDir, targetDir) {
  try {
    // 获取源目录中的所有文件和子目录
    const files = await fspromises.readdir(sourceDir);

    // 逐个处理文件和子目录
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);

      const stat = await fspromises.stat(sourcePath);

      if (stat.isFile()) {
        // 如果是文件，则复制文件
        await fspromises.copyFile(sourcePath, targetPath);
        // console.log(`Copied file: ${sourcePath} to ${targetPath}`);
      } else if (stat.isDirectory()) {
        // 如果是目录，则递归调用复制目录函数
        await fspromises.mkdir(targetPath, { recursive: true });
        await copyDirectory(sourcePath, targetPath);
      }
    }
  } catch (error) {
    console.error(`Error copying directory: ${error}`);
  }
}

function getDocumentList() {
    const dirs = fs.readdirSync(static_path);
    return dirs.filter((filename) => filename.match(file_type_reg));
}

module.exports = {
    copyDirectory,
    getDocumentList,
    getStaticPathByFilename,
    getOutputPathByFilename,
}