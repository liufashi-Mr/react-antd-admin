import { useSelector } from 'react-redux';

export default function Home() {
  const res = useSelector(state => {
    return state.CommonModel;
  });
  return <div>home</div>;
}
