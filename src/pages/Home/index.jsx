import React from "react";
import { useSelector } from "react-redux";
export default function Home() {
  const res = useSelector((state) => {
    console.log(state, "state");
    return state.CommonModel;
  });
  console.log(res);
  return <div>Home Page</div>;
}
