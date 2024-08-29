type CellType = {
  className?: string;
};

const Cell: React.FC<React.PropsWithChildren<CellType>> = ({
  children,
  className,
}) => {
  return <td className={`p-2 text-sm ${className}`}>{children}</td>;
};

export default Cell;
