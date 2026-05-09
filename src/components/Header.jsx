import { NavLink } from "react-router-dom";
import meetup from "../assets/meetup.png"
import { Link } from "react-router-dom";

const Header = () => (
  <header className="bg-body-secondary text-dark py-3">
    <div className="container">
        <Link to="/">
            <img src={meetup} className="img-fluid" style={{width: "", height: "40px", objectFit: "cover" }}/>
        </Link>
      <hr className=""/>
    </div>
  </header>
);

export default Header;