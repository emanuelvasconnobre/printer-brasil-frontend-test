import { useNavigate } from "react-router-dom"
import { useToast } from "../../../hooks/use-toast"
import { AuthService, LoginDto } from "../../../services"
import { useDispatch } from "react-redux"
import { login } from "../../../store/slices"
import { useEffect } from "react"
import { object, string } from "yup"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import SubmitButton from "./SubmitButton"
import TextFormControl from "../../toolkit/forms/TextFormControl"

type FormType = LoginDto

const authService = new AuthService()

const schema = object().shape({
    email: string().email('Invalid email address').required('Email is required'),
    password: string().required('Password is required').min(8, 'Password must be at least 8 characters')
});

export const LoginWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { control, handleSubmit, formState: { errors } } = useForm<FormType>({
        resolver: yupResolver(schema)
    });

    const checkAccessHandler = async () => {
        const { message, level, ...response } = await authService.checkAccess()

        if (response.success && response.data) {
            dispatch(login(response.data))
            navigate("/wellcome")
        }
    }

    const onSubmit = async (data: FormType) => {
        const { message, level, ...response } = await authService.login(data)

        useToast(message, {
            level
        })

        if (response.success && response.data) {
            dispatch(login(response.data))
            navigate("/wellcome")
        }
    }

    useEffect(() => {
        checkAccessHandler()
    }, [])

    return <div className="w-full h-full bg-accent text-white pt-16">
        <div className="w-96 bg-primary rounded-xl p-4 mx-auto">
            <p className="font-semibold text-lg">Login Form</p>
            <hr className="my-4" />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-end">
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextFormControl {...field} type="text" className="text-white" errorMessage={errors.email?.message} placeholder="Email" label="Email" />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <TextFormControl {...field} type="password" className="text-white" errorMessage={errors.password?.message} placeholder="Password" label="Password" />
                    )}
                />

                <SubmitButton className="mt-12 w-min whitespace-nowrap" label="Sign in" />
            </form>
        </div>

    </div>
}