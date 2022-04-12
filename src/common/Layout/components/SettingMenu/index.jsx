import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer } from "antd";
import {
  SettingOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import cls from "classnames";
import styles from "./index.less";
const SettingMenu = () => {
  const [settingVisible, setSettingVisible] = useState(true);
  const dispatch = useDispatch();
  const { theme, menuMode } = useSelector((state) => state.SettingModel);
  useEffect(() => {
    setSettingVisible(false);
  }, []);
  return (
    <Drawer
      closable={false}
      visible={settingVisible}
      width={300}
      className={styles.container}
    >
      <div
        className={styles.setting}
        onClick={() => setSettingVisible((val) => !val)}
      >
        {settingVisible ? <CloseOutlined /> : <SettingOutlined />}
      </div>
      <div className={cls(styles.item, styles.vertical)}>
        <p>主题风格</p>
        <div style={{ display: "flex" }}>
          <div
            className={styles.dark}
            onClick={() => dispatch({ type: "setTheme", data: "dark" })}
          >
            {theme === "dark" && <CheckOutlined />}
          </div>
          <div
            className={styles.light}
            onClick={() => dispatch({ type: "setTheme", data: "light" })}
          >
            {theme === "light" && <CheckOutlined />}
          </div>
        </div>
      </div>
      <div className={cls(styles.item, styles.vertical)}>
        <p>页面布局</p>
        <div style={{ display: "flex" }}>
          <div
            className={styles.dark}
            onClick={() => dispatch({ type: "setTheme", data: "dark" })}
          >
            {theme === "dark" && <CheckOutlined />}
          </div>
          <div
            className={styles.light}
            onClick={() => dispatch({ type: "setTheme", data: "light" })}
          >
            {theme === "light" && <CheckOutlined />}
          </div>
        </div>
      </div>
      <div className={cls(styles.item, styles.flex)}></div>
    </Drawer>
  );
};
export default SettingMenu;
