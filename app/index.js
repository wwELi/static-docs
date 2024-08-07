
const path = require("path");
const { output_path } = require('./constant');
const { parseStyle } = require('./parse-style-file');
const { copyDirectory } = require('./util');
const { parseDocs } = require('./parse-docs');

parseDocs();
parseStyle();
copyDirectory(path.join(__dirname, "../html/assets"), path.join(output_path, "assets"))