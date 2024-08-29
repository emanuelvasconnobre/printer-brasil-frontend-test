import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { logout } from "../../store/slices";
import { AuthService } from "../../services";
import { useToast } from "../../hooks/use-toast";
import { AppButton } from "../toolkit/AppButton";

const authService = new AuthService()

export const Header = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const logoutHandler = async () => {
        const { level, message, success } = await authService.logout();

        useToast(message, {
            level: level
        })

        if (success) {
            dispatch(logout());

            navigate("/")
        }
    }

    return (
        <header className="bg-primary p-4 flex justify-between items-center text-white border-b border-white">
            <Link to="/" className="text-xl font-bold">
                Printer Test
            </Link>
            <nav>
                {auth.isAuthenticated ? (
                    <div className="flex gap-3 items-center">
                        <span>{auth.user!.name}</span>
                        <img
                            src={auth.user!.profilePicture ?? "/facebook-default-no-profile-pic.jpg"}
                            alt="Profile"
                            className="w-8 h-8 rounded-full"
                        />
                        <AppButton onClick={logoutHandler}>
                            Logout
                        </AppButton>
                    </div>
                ) : (
                    <div>
                        <Link to="/login" className="mr-3">
                            <AppButton>
                                Login
                            </AppButton>
                        </Link>
                        <Link to="/register">
                            <AppButton>
                                Signup
                            </AppButton>
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
}