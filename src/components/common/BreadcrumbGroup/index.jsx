import { insideRoutes } from '@/router';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
const BreadcrumbGroup = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const getBreadcrumbTitle = (routes, path) => {
    return routes.reduce((pre, val) => {
      let temp = pre;
      if (val.path === path || (/\/\/*|:/.test(val.path) && val.path.includes(path))) {
        return (temp += val.title);
      }
      return (temp += getBreadcrumbTitle(val?.children || [], path));
    }, '');
  };
  const breadcrumbTitleList = pathSnippets
    .map(path => {
      return getBreadcrumbTitle(
        insideRoutes.filter(item => item.path !== 'home'),
        path
      );
    })
    .filter(Boolean);
  let documentTitle = '智能导引管理后台';
  const extraBreadcrumbItems = pathSnippets
    .map((path, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const breadcrumbTitle = getBreadcrumbTitle(
        insideRoutes.filter(item => item.path !== 'home'),
        path
      );
      documentTitle += breadcrumbTitle ? '-' + breadcrumbTitle : '';
      return (
        breadcrumbTitle && (
          <Breadcrumb.Item key={url}>
            {index === breadcrumbTitleList.length - 1 ? (
              <span>{breadcrumbTitle}</span>
            ) : (
              <Link to={url}>{breadcrumbTitle}</Link>
            )}
          </Breadcrumb.Item>
        )
      );
    })
    .filter(Boolean);
  document.title = documentTitle;
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">首页</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
};
export default BreadcrumbGroup;
