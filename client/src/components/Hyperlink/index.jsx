/* eslint-disable react/prop-types */
const Hyperlink = ({ classname, children, href }) => {
  return (
    <a
      href={href}
      className={`${classname} font-semibold rounded-lg py-5 px-12`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default Hyperlink;
