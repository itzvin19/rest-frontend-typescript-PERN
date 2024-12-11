import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, { loader as getProducts , action as updateAvailability} from "./views/Products";
import { loader as getProduct, action as updateProduct } from "./views/EditProduct";
import { action as deleteProduct } from "./components/ProductDetails"
import NewProduct, { action as newProduct } from "./views/NewProduct";
import EditProduct from "./views/EditProduct";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: getProducts,
                action: updateAvailability
            },
            {
                path: '/productos/nuevo',
                element: <NewProduct />,
                action: newProduct
            },
            {
                path: '/productos/:id/editar',
                element: <EditProduct />,
                loader: getProduct,
                action: updateProduct
            },
            {
                path: '/productos/:id/eliminar',
                action: deleteProduct
            }
        ]
    }
]) 