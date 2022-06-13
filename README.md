# 使用指南

## 维护人员

- @liufashi<1325178274@qq.com>

## 布局

常见的后台管理的系统无非是三种：

1. 侧边布局：主导航放置于页面的左侧固定位置，辅助菜单放置于工作区顶部。适用于同时存在多级导航菜单，菜单多层嵌套的系统。
2. 上下布局：主导航放置于页面的顶端。由于导航栏水平空间有限，适用于那些一级导航项没有很多的信息结构的系统。
3. 顶部-侧边布局：同样拥有顶部导航及侧边栏，适用于应用型的网站，但是会牺牲部分内容空间。

- 预览：[react-antd-admin](https://admin.template.liufashi.top)
- 使用指南：[https://blog.liufashi.top](https://blog.liufashi.top)

## 项目目录

```bash

 react-antd-admin
    ├── config
    │     ├── webpack.config.js
    │     └── ...
    ├── script
    │     ├── start.js
    │     ├── build.js
    │     └── test.ks
    ├── .commitlintrc.js
    ├── .eslintrc.js
    ├── .prettierrc.js
    ├── jsconfig.json
    ├── package.json
    ├── .gitignore
    ├── .eslintignore
    ├── public
    │   ├── favicon.ico
    │   └── index.html
    ├── src
    │    ├── apis
    │    ├── assets #资源文件
    │    ├── common #模板实现用到的组件,无特殊情况不需更改
    │    ├── components #实际项目组件
    │    ├── hooks #hooks
    │    │      ├── index.js #统一导出
    │    │      ├── common.js #系统用到的自定义hooks
    │    │      ├── custom.js #项目中用到的自定义hooks
    │    ├── models #redux
    │    │      ├── index.js #统一导出
    │    │      ├── settings #系统设置
    │    ├── pages #页面
    │    │      ├──<Name> #页面名称 驼峰命名
    │    │          ├── index.(jsx|js)
    │    │          ├── index[.common].(less)
    │    ├── router #路由配置
    │    │      ├── index.js #统一导出
    │    │      ├── insideRoutes.js #在布局内的页面路由
    │    │      ├── outsideRoutes.js #不需要布局的页面 如登录页
    │    └── utils #工具函数
    ├── README.md
    ├── package-lock.json
    └── yarn.lock
```

## 项目规范

commit 规范

- "feat", // 新功能（feature）
- "fix", // 修补 bug
- "bugfix", // 修补 bug
- "docs", // 文档（documentation）
- "style", // 格式（不影响代码运行的变动）
- "message", //注释&文案更改
- "refactor", // 重构（即不是新增功能，也不是修改 bug 的代码变动）
- "test", // 增加测试
- "revert", // 回滚
- "config", // 构建过程或辅助工具的变动
- "chore", // 其他改动

分支规范

- master 最新代码维护在这个分支,除了 release 其余分支不能合进来
- feature/<需求> 需求分支从 master 切出,一次需求一个分支, 使用流水线需求发布到线上后会自动生成 release 分支,测试通过后将生成的 release 分支合进 master,需求结束后及时删除 feature 分支
- hotfix /＜问题＞：紧急修复分支，从 master 分支切出，一次问题一个分支，修复完测试通过发布上线,将生成的 release 分支合进 master,删除该分支
- release: 流水线自动生成,在测试环境通过测试后将生成的 release 分支合进 master 并且勾选删除源分支,减少多余的分支

提交合并请求时需选择非自己的评审人查阅代码。
