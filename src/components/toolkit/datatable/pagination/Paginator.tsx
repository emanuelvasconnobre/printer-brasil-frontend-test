import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { usePagination } from "../../../../hooks/use-pagination";

type Props = {
  pagination: PaginationProps;
  onPageChange: (page: number) => void;
};

export type PaginationProps = {
  paginator: {
    page: number;
    countPerPage: number;
  };
  countPage: number;
};

export default function Paginator({
  pagination: {
    paginator: { page },
    countPage,
  },
  onPageChange,
}: Props) {
  const paginationButtonArray = usePagination({
    currentPage: page,
    pageSize: 1,
    totalCount: countPage,
  });

  const ACTION_BUTTON_NORMAL_BASE =
    "flex items-center justify-center px-2 py-1 hover:text-secondary";

  const BUTTON_NORMAL_BASE =
    "h-[40px] w-[40px] max-md:h-[20px] max-md:w-[20px] shadow-md rounded-full flex items-center justify-center";

  const BUTTON_NORMAL_STYLE = "bg-white text-black ";

  const BUTTON_NORMAL_HOVER = "hover:bg-secondary hover:text-white";

  const BUTTON_NORMAL_ACTIVE =
    "active:bg-primary active:text-white";

  const BUTTON_DISABLED_STYLE = "bg-secondary-100 cursor-auto";

  const BUTTON_SELECTED_STYLE =
    "bg-secondary text-white cursor-auto";

  const BUTTON_NORMAL_CLASS = `${BUTTON_NORMAL_BASE} ${BUTTON_NORMAL_STYLE} ${BUTTON_NORMAL_HOVER} ${BUTTON_NORMAL_ACTIVE}`;

  const BUTTON_SELECTED_CLASS = `${BUTTON_NORMAL_BASE} ${BUTTON_SELECTED_STYLE}`;

  const BUTTON_DISABLED_CLASS = `${BUTTON_NORMAL_BASE} ${BUTTON_DISABLED_STYLE}`;

  return (
    <div className="flex max-md:text-sm text-base text-black">
      <button
        className={`flex-0 ${
          countPage === 0 ? BUTTON_DISABLED_CLASS : ACTION_BUTTON_NORMAL_BASE
        }`}
        onClick={() => page - 1 >= 1 && onPageChange(page - 1)}
      >
        <BsArrowLeft className="w-[32px]" />
        <p>Previous</p>
      </button>
      <ul className="flex flex-wrap justify-center items-center p-1 gap-2">
        {paginationButtonArray?.map((pageSelect, index) => {
          return (
            <button
              className={`${
                pageSelect === page
                  ? BUTTON_SELECTED_CLASS
                  : BUTTON_NORMAL_CLASS
              }`}
              key={`${pageSelect}-${index}`}
              onClick={() =>
                typeof pageSelect === "number" && onPageChange(pageSelect)
              }
            >
              {pageSelect}
            </button>
          );
        })}
      </ul>
      <button
        className={`flex-0 ${
          countPage === 0 ? BUTTON_DISABLED_CLASS : ACTION_BUTTON_NORMAL_BASE
        }`}
        onClick={() => page + 1 <= countPage && onPageChange(page + 1)}
      >
        Next
        <BsArrowRight className="w-[32px]" />
      </button>
    </div>
  );
}
