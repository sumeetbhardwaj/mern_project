import { Navigate } from "react-router-dom";
import Home from "../Pages/Home";
import Signup from "../Pages/Signup";


export const publicRoutes = [
	{ path: "/", element: <Home /> },
	{ path: "/signup", element: <Signup /> },
	{ path: "*", element: <Navigate replace to="/" /> },
];


	