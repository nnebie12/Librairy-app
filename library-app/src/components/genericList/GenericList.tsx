
import styles from "./GenericList.module.css";

interface GenericListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  emptyMessage?: string;
}

export function GenericList<T>({
  items,
  renderItem,
  emptyMessage = "Aucun élément à afficher.",
}: GenericListProps<T>) {
  if (items.length === 0) {
    return (
      <p className={styles.empty}>{emptyMessage}</p>
    );
  }

  return (
    <div className={styles.list}>
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  );
}
