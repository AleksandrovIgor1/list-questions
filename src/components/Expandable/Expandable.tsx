import { useState, type MouseEvent, type ReactNode } from "react";

interface ExpandableProps<T> {
  items: T[];
  initialCount?: number;
  children: (visibleItems: T[]) => ReactNode,
  className?: string,
  buttonClassName?: string,
}

export const Expandable = <T,>({
  items,
  initialCount = 5,
  children,
  className,
  buttonClassName,
}: ExpandableProps<T>) => {
  const [expanded, setExpanded] = useState(false);

  if (!items?.length) return null;

  const visibleItems = expanded ? items : items.slice(0, initialCount);

  const isExpandable = items.length > initialCount;

  const handleExpanded = (e: MouseEvent) => {
    e.preventDefault();
    setExpanded((prev) => !prev);
  };

  return (
    <>
      <div className={className}>{children(visibleItems)}</div>
      {isExpandable && (
        <a className={buttonClassName} onClick={handleExpanded}>
          {expanded ? "Скрыть" : "Посмотреть все"}
        </a>
      )}
    </>
  );
};
