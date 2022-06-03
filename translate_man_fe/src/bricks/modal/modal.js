import React, { useState, forwardRef, useImperativeHandle } from "react";
import styles from "./modal.module.css";
import CloseIcon from "@mui/icons-material/Close";

export const Modal = forwardRef((props, ref) => {
  const [content, setModalContent] = useState(undefined);

  useImperativeHandle(ref, () => ({
    showModal(content) {
      setModalContent(content);
    },
    closeModal() {
      _closeModal();
    },
  }));

  const _closeModal = () => {
    setModalContent(undefined);
  };

  return (
    content && (
      <div className={styles.modalWrapper}>
        <div className={styles.backDrop} onClick={_closeModal} />
        <div className={styles.contentWrapper}>
          <div className={styles.controlPanelWrapper}>
            <CloseIcon onClick={_closeModal} />
          </div>
          {content}
        </div>
      </div>
    )
  );
});
