module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'semi': ['error', 'always'],
    // 检查 Hooks 的使用规则
    'react-hooks/rules-of-hooks': 'error',
    // 检查依赖项的声明
    'react-hooks/exhaustive-deps': 'warn',
    //console
    'no-console': 'warn',
    //debugger
    'no-debugger': 'off',
    //定义未使用
    'no-unused-vars': 'warn',
  },
};
