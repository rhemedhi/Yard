import { Link } from "react-router-dom";

function YardLink({children, className='', to}) {
  return (
    <Link to={to} className={`animated-underline ${className}`}>{children}</Link>
  );
}

export default YardLink;