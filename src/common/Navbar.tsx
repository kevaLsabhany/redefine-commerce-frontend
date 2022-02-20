import { Link } from "react-router-dom";

export default function Navbar(props: {
  paths: { name: string; path: string }[];
}) {
  const listStyle = {
    listStyleType: "none",
  };
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Redefine Commerce
        </Link>
        <div id="navbarText">
          <ul style={listStyle} className="navbar me-auto mb-2 mb-lg-0">
            {props.paths.map((path) => (
              <li key={path.name} className="nav-item">
                <Link className="nav-link" to={path.path}>
                  {path.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
