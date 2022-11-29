import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';
const RouteLoading = () => {
  return (
    <Spin size="large">
      <div className={styles.mask} />
    </Spin>
  );
};
export default RouteLoading;
