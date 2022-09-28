
## 使用指南

### 通过git clone

```shell
git clone https://github.com/liufashi-Mr/react-antd-admin.git
```

### 通过脚手架

[npm地址](https://www.npmjs.com/package/react-client-create)

```shell
# global install
npm i react-client-create -g
# and then run
create-cli create [name]

# or
npm i react-client-create
#then run
npx create-cli create [name]
```

选择第二个

![选择](https://blog.liufashi.top/img/typescript-h5-template/cli.png)


## 实现

1. 实现三种后台的常见布局;
2. 路由文件的单独配置;
3. 布局主题的修改
4. 面包屑自动生成
5. 刷新保存刷新前的选中菜单

## 维护人员

- @liufashi<1325178274@qq.com>

## 布局

常见的后台管理的系统无非是三种：

1. 侧边布局：主导航放置于页面的左侧固定位置，辅助菜单放置于工作区顶部。适用于同时存在多级导航菜单，菜单多层嵌套的系统。
2. 上下布局：主导航放置于页面的顶端。由于导航栏水平空间有限，适用于那些一级导航项没有很多的信息结构的系统。
3. 顶部-侧边布局：同样拥有顶部导航及侧边栏，适用于应用型的网站，但是会牺牲部分内容空间。

- 预览：[react-antd-admin](https://admin.template.liufashi.top)
- 使用指南：[https://blog.liufashi.top](https://blog.liufashi.top/2022/06/13/react-antd-admin/)

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

## 使用

1. 下载

```bash
git clone https://github.com/liufashi-Mr/react-antd-admin.git
```

2. 在 routes 中新建页面的路由,需要布局的页面在 insideRoutes 中新建,不需要的则在 outsideRoutes 中新建.

- 重定向路由`redirect:[path]` 例:

```js
  {
    path: '/',
    redirect: 'home',
    hidden: true,
  },
  {
    path: 'home',
    title: '首页',
    meta: { title: '', roles: [] },
    icon: <UserOutlined />,
    component: lazy(() => import('@/pages/Home')),
  },
```

- 子路由需配置一个 path 为''的 index 路由,添加上 hidden 属性,添加 redirect 属性重定向到指定路由(为了是点击面包屑的时候能跳转到页面),其余子路由与正常规则配置即可

```js
{
    path: 'edit',
    title: '编辑页',
    meta: { title: '', roles: [] },
    icon: <VideoCameraOutlined />,
    children: [
      {
        path: '',
        redirect: 'test',
        hidden: true,
      },
      {
        path: 'test',
        title: '测试1',
        meta: { title: '', roles: [] },
        icon: <UserOutlined />,
        component: lazy(() => import('@/pages/List/DashboardGraphs')),
      }
    ]
}
```

- react-router-dom v6 新特性的子路由使用 例:

```js
// 配置
  {
    path: 'list/*',
    title: '列表',
    meta: { title: '', roles: [] },
    icon: <UploadOutlined />,
    component: lazy(() => import('@/pages/List')),
  },
//   list页面
import React, { lazy } from 'react';
import { Outlet, Routes, Route, Link } from 'react-router-dom';
import DashboardGraphs from './DashboardGraphs';
const InvoiceList = lazy(() => import('./InvoiceList'));
export default function List() {
  return (
    <div>
      List Page
      <Link to="dashboardGraphs">qwer</Link>
      <Link to="InvoiceList">asdf</Link>
      <Routes>
        <Route index element={<InvoiceList />}></Route>
        <Route path="dashboardGraphs" element={<DashboardGraphs />}></Route>
      </Routes>
      <div style={{ color: 'red' }}>{/* <Outlet /> */}</div>
    </div>
  );
}
```

3. 修改主题色,项目 index.common.less 引入了 antd 的变量,要修改直接重新定义即可

```less
@import '~antd/dist/antd.less';
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
li {
  list-style: none;
}
@primary-color: rgb(24, 144, 255); // 全局主色
@link-color: rgb(24, 144, 255); // 链接色
@success-color: rgb(82, 196, 26); // 成功色
@warning-color: rgb(250, 173, 20); // 警告色
@error-color: rgb(245, 34, 45); // 错误色
@layout-text: rgb(241, 240, 240); // 布局字体色
@layout-background: rgba(0, 0, 0, 0.85); // 布局背景色
@heading-color: rgba(0, 0, 0, 0.85); // 标题色
@text-color: rgba(0, 0, 0, 0.65); // 主文本色
@text-color-secondary: rgba(0, 0, 0, 0.45); // 次文本色
@disabled-color: rgba(0, 0, 0, 0.25); // 失效色
@border-color-base: #d9d9d9; // 边框色
```

若需要动态修改可以参考[定制主题](https://ant.design/docs/react/customize-theme-variable-cn),也可以使用 antd-theme-generator 插件通过 less.modifyVars 的方式修改主题色

## 规范

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
