import AddProduct from "../Pages/AddProduct";
import Logout from "../Pages/Logout";
import Products from "../Pages/Products";


export const protectedRoutes = [
    // { path: APP_ROUTES.INSTRUCTORS_LIST, element: InstructorList },
    { path: "/products", element: Products },
    { path: "/add_product", element: AddProduct },
    { path: "/logout", element: Logout },
];
