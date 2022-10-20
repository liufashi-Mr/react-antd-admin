import { useSelector } from 'react-redux';
export default function Home() {
  const res = useSelector(state => {
    // console.log(state, "state");
    return state.CommonModel;
  });
  return <div>home</div>;
}
