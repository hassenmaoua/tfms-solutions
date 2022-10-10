import styles from './Modal.module.css';

function Modal(props) {
  return (
    <>
      <div onClick={props.onClose} className={styles.backdrop} />
      <div
        style={{
          height: props.height,
          top: `calc(50% - ${props.height} / 2)`,
          width: props.width,
          left: `calc(50% - ${props.width} / 2)`,
        }}
        className={styles.card}
      >
        <form
          onSubmit={props.onSubmit}
          spellCheck={false}
          className={styles.form}
        >
          <div className={styles.title}>
            <h1>{props.title}</h1>
          </div>

          <div className={styles.container}>{props.children}</div>
          <div className={styles.buttonContainer}>
            <button className={styles.secondary} onClick={props.onClose}>
              Cancel
            </button>
            <button className={styles.primary}>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Modal;
