import { Link, useNavigate } from "react-router-dom";
import { TaskModel } from "../../../services/protocols/model";
import { AppButton } from "../../toolkit/AppButton";
import DataTable from "../../toolkit/datatable/DataTable";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { TaskService } from "../../../services/task";
import Paginator from "../../toolkit/datatable/pagination/Paginator";
import RowsCounterPaginator from "../../toolkit/datatable/pagination/RowsCounterPaginator";
import { useToast } from "../../../hooks/use-toast";

const transformDataCallback = (data: TaskModel) => {
  return {
    ...data,
    deadline: format(data.deadline, "dd/MM/yyyy"),
    createdAt: format(data.createdAt, "dd/MM/yyyy"),
    updatedAt: format(data.updatedAt, "dd/MM/yyyy"),
  };
};

const taskService = new TaskService();

export const ListTasksWrapper = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [page, setPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(5);
  const [countPage, setCountPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const deleteHandler = async (id: string) => {
    const { success, message, level } = await taskService.delete(id);
    useToast(message, { level });

    if (success) {
      if (tasks.length > 1) {
        setTasks((tasks) => tasks.filter((task) => task.id !== id));
      } else {
        setPage((page) => page - 1);
      }
    }
  };

  const fetchData = async () => {
    const { success, ...response } = await taskService.getMany({
      page,
      countPerPage,
    });
    setIsLoading(false);

    if (success && response.data) {
      setTasks(response.data.items);
      setCountPage(response.data.countPage);
    } else {
      useToast(response.message, { level: response.level });
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, countPerPage, isLoading]);

  return (
    <>
      <div className="px-5 py-6">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-secondary-light mb-3">
            Task Page
          </p>
          <div className="py-3 flex gap-4">
            <Link to={"/task/add"}>
              <AppButton>Add Task</AppButton>
            </Link>
          </div>
        </div>
        <hr className="my-3" />
        <DataTable<TaskModel>
          columns={[
            {
              keyName: "id",
              node: <>ID</>,
            },
            {
              keyName: "title",
              node: <>Title</>,
            },
            {
              keyName: "priority",
              node: <>Priority</>,
            },
            {
              keyName: "deadline",
              node: <>Deadline</>,
            },
            {
              keyName: "description",
              node: <>Description</>,
              cell: {
                formatter: (data) => <p className="line-clamp-3">{data}</p>,
                className: "w-80",
              },
            },
            {
              keyName: "createdAt",
              node: <>Created at</>,
            },
            {
              keyName: "updatedAt",
              node: <>Updated at</>,
            },
          ]}
          data={tasks}
          dataTransform={transformDataCallback}
          actions={[
            {
              func: async (value) => {
                await deleteHandler(value.id);
              },
              title: "Delete",
            },
            {
              func: (value) => {
                navigate(`/task/edit/${value.id}`);
              },
              title: "Edit",
            },
          ]}
          indexColumn="id"
          isLoading={isLoading}
        />

        <div className="flex py-3 gap-1">
          <Paginator
            pagination={{
              paginator: {
                page,
                countPerPage,
              },
              countPage,
            }}
            onPageChange={(page) => setPage(page)}
          />
          <RowsCounterPaginator
            options={[5, 10, 50]}
            selectedValue={5}
            onSelectHandler={(value) => setCountPerPage(value)}
          />
        </div>
      </div>
    </>
  );
};
