import { createPortal } from "react-dom";

const Modal = ({ children, show, onHide }) => {
  const handleCancel = () => {
    onHide();
  };

  if (!show) {
    return null;
  }

  return createPortal(
    <div className="wrapper">
      <div className="modal_content">
        <div className="modal_header">
          <p onClick={handleCancel}>Close</p>
        </div>
        <div className="modal_body">{children}</div>
      </div>
    </div>,

    document.getElementById("modal")
  );
};

export default Modal;
