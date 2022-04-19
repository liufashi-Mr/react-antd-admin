import styles from "@/index.common.less";

const initState = {
  mixinMenuActivePath: "",
  sideBarCollapsed: false,
  theme: "light",
  themeColor: styles.themeColor,
  fixHeader: false,
  menuMode: "horizontal",
  sideBarHidden: false,
};
const SettingModel = (state = initState, { type, data }) => {
  switch (type) {
    case "setSideBarCollapsed": {
      return { ...state, sideBarCollapsed: !state.sideBarCollapsed };
    }
    case "serSideBarHidden": {
      return { ...state, sideBarHidden: data };
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
    case "setMixinMenuActivePath": {
      return { ...state, mixinMenuActivePath: data };
    }
    default: {
      return state;
    }
  }
};
export default SettingModel;
