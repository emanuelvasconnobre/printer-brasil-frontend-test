import { Controller, useForm } from "react-hook-form";
import TextFormControl from "../../toolkit/forms/TextFormControl";
import TextareaFormControl from "../../toolkit/forms/TextareaFormControl";
import SubmitButton from "../auth/SubmitButton";
import { useToast } from "../../../hooks/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { date, number, object, string } from "yup";
import { CreateTaskDto, TaskService } from "../../../services/task";
import DateFormControl from "../../toolkit/forms/DateFormControl";

type FormType = CreateTaskDto;

const service = new TaskService();

const schema = object().shape({
    title: string().required('Title is required'),
    description: string().required('Description is required'),
    deadline: date().required('Deadline is required'),
    priority: number().required('Number is required'),
});

export const AddTaskWrapper = () => {
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm<FormType>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: FormType) => {
        const { message, level, ...response } = await service.create(data);

        useToast(message, {
            level
        });

        if (response.success && response.data) {
            navigate("/task");
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-3/4 p-4">
                <p className="text-xl font-bold text-secondary-light mb-3">
                    Add Task
                </p>
                <hr className="my-3" />

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-4">
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <TextFormControl {...field} className="text-black text-sm" type="text" errorMessage={errors.title?.message} placeholder="Title" label="Title" />
                        )}
                    />

                    <Controller
                        name="deadline"
                        control={control}
                        render={({ field }) => (
                            <DateFormControl {...field} className="text-black text-sm" errorMessage={errors.deadline?.message} placeholder="Deadline" label="Deadline" />
                        )}
                    />

                    <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => (
                            <TextFormControl {...field} className="text-black text-sm" type="money" errorMessage={errors.priority?.message} placeholder="Priority" label="Priority" />
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextareaFormControl {...field} className="text-black text-sm" inputClassName="h-24" errorMessage={errors.description?.message} countCols={4} placeholder="Description" label="Description" />
                        )}
                    />

                    <SubmitButton className="mt-12 col-span-2 w-min whitespace-nowrap" label="Save" />
                </form>
            </div>
        </div>
    );
};
