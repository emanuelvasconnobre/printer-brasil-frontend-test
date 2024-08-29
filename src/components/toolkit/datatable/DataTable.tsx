import Column from "./Column";
import Row from "./Row";
import Cell from "./Cell";
import DatatableSkeleton from "./Skeleton";
import { TurnAttributesTypeOn } from "../../../utils/typing/TurnAttributesTypeOn";

export type ColumnProps<T = any> = {
  keyName: keyof T;
  title?: string;
  node?: React.ReactNode;
  default?: React.ReactNode;
  className?: string;
  cell?: {
    formatter?: (data: React.ReactNode | string) => React.ReactNode | string;
    className?: string;
  };
};

type Props<T extends Object> = {
  columns: ColumnProps<T>[];
  indexColumn: keyof T;
  data: T[];
  dataTransform: (
    value: T
  ) => TurnAttributesTypeOn<React.ReactNode | string, T>;
  isLoading: boolean;
  actions?: {
    func: (value: T) => void;
    title: string;
  }[];
};

function DataTable<T extends Object>({
  isLoading = false,
  columns,
  data,
  dataTransform,
  indexColumn,
  actions,
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement> & Props<T>) {
  return isLoading ? (
    <DatatableSkeleton columns={columns} />
  ) : (
    <table
      className={`border min-w-full w-auto table-auto ${className}`}
      {...props}
    >
      <thead>
        <tr className="border-b-4 border-b-accent bg-white">
          {columns.map((column) => {
            return (
              <Column
                className={column.className}
                key={column.keyName.toString()}
              >
                {column.node ?? column.title}
              </Column>
            );
          })}
          <Column key="actions"></Column>
        </tr>
      </thead>
      <tbody className="bg-[#F6F7F7]">
        {data.length > 0 &&
          data.map((row) => {
            const valueFormatted = dataTransform(row);

            return (
              <Row key={String(row[indexColumn])}>
                {columns.map((column) => {
                  let content = valueFormatted[column.keyName];

                  if (column.cell?.formatter) {
                    content = column.cell.formatter(content);
                  }

                  return (
                    <Cell
                      className={column.cell?.className}
                      key={column.keyName.toString()}
                    >
                      {content ?? column.default}
                    </Cell>
                  );
                })}

                {actions && (
                  <Cell className="flex gap-3 items-center justify-center">
                    {actions.map((action) => (
                      <button
                        className="text-accent hover:text-primary rounded-xl"
                        key={action.title}
                        onClick={() => action.func(row)}
                      >
                        {action.title}
                      </button>
                    ))}
                  </Cell>
                )}
              </Row>
            );
          })}

        {isLoading && (
          <div className="bg-[#ffffffa9] flex justify-center items-center w-full h-full absolute top-0 font-bold">
            Carregando...
          </div>
        )}
        {data.length === 0 && !isLoading && (
          <tr className="bg-[#dbdbdb6b] w-full py-7">
            <td
              className="text-toast-info-bg font-semibold text-center"
              colSpan={columns.length}
            >
              Nenhum dado encontrado
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default DataTable;
