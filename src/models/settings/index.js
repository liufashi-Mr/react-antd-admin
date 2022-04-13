import styles from "@/index.common.less";

const initState = {
  sideBarCollapsed: false,
  theme: "light",
  themeColor: styles.themeColor,
  fixHeader: false,
  menuMode: "horizontal",
};
const SettingModel = (state = initState, { type, data }) => {
  switch (type) {
    case "setSideBarCollapsed": {
      return { ...state, sideBarCollapsed: !state.sideBarCollapsed };
    }
    case "setTheme": {
      return { ...state, theme: data };
    }
    case "setFixHeader": {
      return { ...state, fixHeader: data };
    }
    case "setShowSettings": {
      return { ...state, showSettings: data };
    }
    case "setMenuMode": {
      return { ...state, menuMode: data };
    }
    case "setThemeColor": {
      return { ...state, themeColor: data };
    }
    default: {
      return state;
    }
  }
};
export default SettingModel;
