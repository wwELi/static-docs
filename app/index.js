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
}

let listHtml = "";
const mds = dirs.filter((filename) => filename.match(/\.md$/));
mds.forEach((filename) => {
    const filepath = path.join(static_path, filename);
    const stat = fs.statSync(filepath);
    if (stat.isFile()) {
        const markdownText = fs.readFileSync(filepath, "utf-8");
        const html = markdown.render(markdownText);
        const output_file_path = path.join(output_path, filename);
        listHtml = listHtml + `<li><a data-filename="${filename}">${filename}</a></li>`;
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
    data: `$count: ${mds.length}; @import "${sassFilePath}";`,
    // data: 'body{background:blue; a{color:black;}}',
    // outputStyle: 'compressed',
    outFile: getOutputPathByFilename("styles.css"),
});
fs.writeFileSync(getOutputPathByFilename("styles.css"), result.css, "utf-8");



