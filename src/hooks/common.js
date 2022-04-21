import { useLocation } from "react-router-dom";
export const  useMenu = () => {
  const location = useLocation();
  Array.prototype.getDefaultKeys = function () {
    console.log(this);
    let pre = "";
    return this.map((x, i, arr) => {
      pre += `/${x}`;
      return !arr[i - 1] ? `/${x}` : `${pre}`;
    });
  };
  return location.pathname
    .split("/")
    .filter((x) => x)
    .getDefaultKeys()||[];
};
