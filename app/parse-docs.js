const markdown = require("markdown-it")();
const fs = require("fs");
const path = require("path");
const { static_path, output_path, file_type_reg } = require('./constant');
const { getStaticPathByFilename, getOutputPathByFilename, getDocumentList } = require('./util');

function parseDocs() {
  const slot = "<!-- insert html -->";
  
  
  if (!fs.existsSync(output_path)) {
      fs.mkdirSync(output_path);
      fs.mkdirSync(path.join(output_path, "assets"))
  }
  
  let listHtml = "";
  const docs = getDocumentList();
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
          const fileType = filename.match(file_type_reg)[1];
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
}


module.exports = { parseDocs };