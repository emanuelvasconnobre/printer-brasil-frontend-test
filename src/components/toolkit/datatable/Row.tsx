type RowType = {
  className?: string;
};

const Row: React.FC<React.PropsWithChildren<RowType>> = ({
  children,
  className,
}) => {
  return (
    <tr
      className={`text-center border-b border-b-neutral-light-400 hover:bg-neutral-light-200 ${className}`}
    >
      {children}
    </tr>
  );
};

export default Row;
