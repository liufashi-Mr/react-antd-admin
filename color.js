const { generateTheme } = require("antd-theme-generator");
const path = require("path");

const options = {
  antDir: path.join(__dirname, "./node_modules/antd"),
  stylesDir: path.join(__dirname, "./src"), // all files with .less extension will be processed
  varFile: path.join(__dirname, "./src/index.common.less"), // default path is Ant Design default.less file
  themeVariables: [
    "@primary-color",
    "@link-color",
    "@success-color",
    "@warning-color",
    "@error-color",
    "@layout-text",
    "@layout-background",
    "@heading-color",
    "@text-color",
    "@text-color-secondary",
    "@disabled-color",
    "@border-color-base",
  ],
  outputFilePath: path.join(__dirname, "./public/color.less"),
};

generateTheme(options)
  .then(less => {
    console.log("Theme generated successfully");
  })
  .catch(error => {
    console.log("Error", error);
  });
