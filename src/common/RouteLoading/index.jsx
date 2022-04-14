import React from "react";
import { Spin } from "antd";
import styles from "./index.less"
const RouteLoading = () => {
  return (
    <Spin size="large">
      <div className={styles.mask}></div>
    </Spin>
  );
};
export default RouteLoading;
