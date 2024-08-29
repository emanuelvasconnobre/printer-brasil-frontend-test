import Cell from "./Cell";
import Column from "./Column";
import { ColumnProps } from "./DataTable";
import Row from "./Row";

type SkeletonProps = {
  columns: ColumnProps[];
};

export default function DatatableSkeleton({ columns }: SkeletonProps) {
  return (
    <table
      className={`border min-w-full w-auto table-auto`}
    >
      <thead>
        <tr className="border-b-4 border-b-accent bg-white">
          {columns.map((column) => {
            return (
              <Column
                className={column.className}
                key={column.keyName.toString()}
              >
                <div className="w-full h-7 flex items-center justify-center bg-gray-200 animate-pulse" />
              </Column>
            );
          })}
          <Column>
            <div className="w-full h-7 flex items-center justify-center bg-gray-200 animate-pulse" />
          </Column>
        </tr>
      </thead>
      <tbody className="bg-[#F6F7F7]">
        <Row>
          {columns.map((column) => {
            return (
              <Cell
                className={column.cell?.className}
                key={column.keyName.toString()}
              >
                <div className="min-w-24 max-w-full h-7 flex items-center justify-center bg-gray-200 animate-pulse" />
              </Cell>
            );
          })}

          <Cell>
            <div className="flex min-w-24 max-w-full h-7 items-center justify-center bg-gray-200 animate-pulse" />
          </Cell>
        </Row>
      </tbody>
    </table>
  );
}
