const fabric = require('@umijs/fabric');
module.exports = {
  ...fabric.prettier,
  //每行宽度
  printWidth: 100,
  //制表符宽度
  tabWidth: 2,
  //使用分号
  semi: true,
  //单引号
  singleQuote: true,
  //jsx单引号
  jsxSingleQuote: false,
  //行末尾标识
  endOfLine: 'auto',
  //对象中的空格
  bracketSpacing: true,
  //箭头函数中的括号, avoid->需要时使用  always->永远使用
  arrowParens: 'avoid',
  //es5有效的地方保留逗号
  trailingComma: 'es5',
  //对象属性有一个存在引号,全部加上引号
  quoteProps: 'consistent',
};
