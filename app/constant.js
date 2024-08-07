const path = require("path");

const static_path = path.join(__dirname, "../html/docs/");
const output_path = path.join(__dirname, "../dist");
const supportFileTypes = ['md', 'html'];
const file_type_reg = new RegExp(`\.(${supportFileTypes.join('|')})$`);

module.exports = {
    static_path,
    output_path,
    supportFileTypes,
    file_type_reg,
}