import { Link } from "react-router-dom";
import YardLink from "../components/common/YardLink";

function PageNotFound() {
  return (
    <div>
       <p>Sorry, page not found!</p>
       <YardLink to='/' className="hover:text-green-600 transition-all duration-500">&larr; Go Back Home</YardLink>
    </div>
  );
}

export default PageNotFound;
