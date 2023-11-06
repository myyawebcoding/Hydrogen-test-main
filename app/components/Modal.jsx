import { useNavigate } from "@remix-run/react";

export const Modal = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
  };

  return (
    <>
      <div>
        <div>
          <p>This is ModalContent</p>
          <button
            type="button"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  )
}
