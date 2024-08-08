/* eslint-disable react/prop-types */
const Button = ({
  classname,
  children,
  onClick = () => {},
  type = "button",
}) => {
  return (
    <button
      className={`${classname} font-semibold rounded-lg px-8 h-10`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
