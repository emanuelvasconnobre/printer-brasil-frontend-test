type ColumnType = {
  className?: string;
};

const Column: React.FC<React.PropsWithChildren<ColumnType>> = ({
  children,
  className,
}) => {
  return (
    <th
      className={`font-bold text-center p-1.5 ${className}`}
    >
      <div>{children}</div>
    </th>
  );
};

export default Column;
