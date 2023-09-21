import styles from "./styles.module.css";

export default function ProductCard({ name, description, imageUrl }) {
  return (
    <div className={styles.productWrapper}>
      <div className={styles.product}>
        <img className={styles.product} src={imageUrl} />
      </div>
      <div className={styles.col}>
        <div className={styles.row}>
          <h3 className={styles.name}>{name}</h3>
          {/* <h6 className={styles.messageTime}>{time}</h6> */}
        </div>
        <div className={styles.row}>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
}
