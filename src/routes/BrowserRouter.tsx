import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { RoutesList } from "./data/CommonRoutes";
import { GlobalLayoutWrapper } from "../components/layout";

export const AppBrowserRouter = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated &&
          RoutesList["private"].routes.map((route) => (
            <Route path={route.path} element={<GlobalLayoutWrapper>{route.element}</GlobalLayoutWrapper>} key={route.key ?? route.path} />
          ))}
        {RoutesList["public"].routes.map((route) => (
          <Route path={route.path} element={<GlobalLayoutWrapper>{route.element}</GlobalLayoutWrapper>} key={route.key ?? route.path} />
        ))}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};
