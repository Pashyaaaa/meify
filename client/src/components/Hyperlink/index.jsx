import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const Hyperlink = ({ classname, children, to, target = "_self" }) => {
  return (
    <Link
      to={to}
      target={target}
      className={`${classname} font-semibold rounded-lg`}
    >
      {children}
    </Link>
  );
};

export default Hyperlink;
