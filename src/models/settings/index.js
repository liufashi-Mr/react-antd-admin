import styles from "@/index.common.less";

const initState = {
  mixinMenuActivePath: window.location.pathname.split("/").filter((x) => x)[0],
  sideBarCollapsed: false,
  theme: "dark",
  themeColor: styles.themeColor,
  fixHeader: false,
  menuMode: "mixin",
  sideBarHidden: false,
};
const SettingModel = (state = initState, { type, data }) => {
  switch (type) {
    case "setSideBarCollapsed": {
      return { ...state, sideBarCollapsed: !state.sideBarCollapsed };
    }
    case "setSideBarHidden": {
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