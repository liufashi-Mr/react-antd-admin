import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <h1>Welcome to the app!</h1>
      <nav style={{width:"1120px",display:"flex",justifyContent:"space-between"}}>
        <Link to="home">home</Link>
        <Link to="edit">edit</Link>
        <Link to="list">list</Link>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}



