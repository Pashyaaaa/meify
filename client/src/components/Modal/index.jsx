/* eslint-disable react/prop-types */

const Modal = ({
  isOpen,
  toggleModal,
  title,
  content,
  footer,
  layout = "default",
}) => {
  if (!isOpen) return null;

  const layoutClasses = {
    default: "p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md",
    wide: "p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md",
    narrow: "p-4 max-w-sm mx-auto bg-white rounded-lg shadow-md",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={layoutClasses[layout]}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={toggleModal}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="mb-4">{content}</div>
        {footer && <div className="flex justify-end">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
