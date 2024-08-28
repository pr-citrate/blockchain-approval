"use client";
import Image from "next/image";

/* Style Sheets */
import modal from "../styles/Modal.module.css";

/* Icons */
import exitIcon from "../../public/icon/exit.svg";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={modal.overlay}>
      <div className={modal.modal}>
        <div className={modal.exitContainer}>
          <Image
            src={exitIcon}
            alt="User Icon"
            width={35}
            height={35}
            onClick={onClose}
            className={modal.closeBtn}
          />
        </div>
        <div className={modal.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
