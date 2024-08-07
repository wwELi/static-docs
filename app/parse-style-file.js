const sass = require("sass");
const fs = require("fs");
const { getStaticPathByFilename, getOutputPathByFilename, getDocumentList } = require("./util");

function parseStyle() {
  const docs = getDocumentList();
  const sassFilePath = getStaticPathByFilename("styles.scss");
  const result = sass.renderSync({
    data: `$count: ${docs.length + 1}; @import "${sassFilePath}";`,
    outFile: getOutputPathByFilename("styles.css"),
  });
  fs.writeFileSync(getOutputPathByFilename("styles.css"), result.css, "utf-8");
  
  const docSassFilePath = getStaticPathByFilename("doc.scss");
  const docResult = sass.renderSync({
    data: `@import "${docSassFilePath}";`,
    outFile: getOutputPathByFilename("doc.css"),
  });
  fs.writeFileSync(getOutputPathByFilename("doc.css"), docResult.css, "utf-8");
}

module.exports = { parseStyle };
