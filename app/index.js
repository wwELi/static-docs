const markdown = require("markdown-it")();
const fs = require("fs");
const path = require("path");
const sass = require("node-sass");

const static_path = path.join(__dirname, "../html/docs/");
const output_path = path.join(__dirname, "../dist");
const dirs = fs.readdirSync(static_path);
const slot = "<!-- insert html -->";

function getStaticPathByFilename(filename) {
    return path.join(__dirname, "../html", filename);
}

function getOutputPathByFilename(filename) {
    return path.join(output_path, filename)
}

if (!fs.existsSync(output_path)) {
    fs.mkdirSync(output_path);
    fs.mkdirSync(path.join(output_path, "assets"))
}

let listHtml = "";
const supportFileTypes = ['md', 'html'];
const reg = new RegExp(`\.(${supportFileTypes.join('|')})$`);
const docs = dirs.filter((filename) => filename.match(reg));
docs.forEach((filename) => {
    const filepath = path.join(static_path, filename);
    const stat = fs.statSync(filepath);
    const handle = {
      md: (content) => {
        return markdown.render(content);
      },
      html: (content) => {
        return content;
      }
    }
    if (stat.isFile()) {
        const content = fs.readFileSync(filepath, "utf-8");
        const fileType = filename.match(reg)[1];
        const html = handle[fileType](content);
        const output_file_path = path.join(output_path, filename);
        const displayName = filename.split('.')[0];
        listHtml = listHtml + `<li><a data-filename="${filename}">${displayName}</a></li>`;
        fs.writeFileSync(output_file_path, html, "utf-8");
    }
});

const templateHtmlPath = getStaticPathByFilename("index.html");
const templateHtml = fs.readFileSync(templateHtmlPath, "utf-8");
const formatterHtml = templateHtml.replace(slot, listHtml);
fs.writeFileSync(getOutputPathByFilename("index.html"), formatterHtml, "utf-8");

/**
 * begin parse sass
 * 
 */
const sassFilePath = getStaticPathByFilename("styles.scss");
const result = sass.renderSync({
    // file: sassFilePath,
    data: `$count: ${docs.length + 1}; @import "${sassFilePath}";`,
    // data: 'body{background:blue; a{color:black;}}',
    // outputStyle: 'compressed',
    outFile: getOutputPathByFilename("styles.css"),
});
fs.writeFileSync(getOutputPathByFilename("styles.css"), result.css, "utf-8");



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

copyDirectory(path.join(__dirname, "../html/assets"), path.join(output_path, "assets"))