const initState = {
  sideBarCollapsed: false,
  theme: "dark",
  fixHeader: true,
  showSettings: false,
  menuMode:"inline"
};
const SettingModel = (state = initState, { type, data }) => {
  switch (type) {
    case "setSideBarCollapsed": {
      return { ...state, sideBarCollapsed: !state.sideBarCollapsed };
    }
    case "setTheme": {
      return { ...state, theme: data ? "dark" : "light" };
    }
    case "setFixHeader": {
      return { ...state, fixHeader: data };
    }
    case "setShowSettings": {
      return { ...state, showSettings: data };
    }
    case "setMenuMode": {
      return { ...state, setMenuMode: data };
    }
    default: {
      return state;
    }
  }
};
export default SettingModel;
