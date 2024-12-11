import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom"
import { getProducts, updateAvailability } from "../services/ProductService"
import ProductDetails from "../components/ProductDetails"
import { ProductsType } from "../types"

export async function loader() {
    const products = await getProducts()
    return products
}

export async function action({ request }: ActionFunctionArgs) {
    const { id } = Object.fromEntries(await request.formData())
    if (id !== undefined) {
        await updateAvailability(+id)
    }
    return {}
}

const Products = () => {

    const products = useLoaderData() as ProductsType

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Productos</h2>
                <Link
                    className="rounded-sm bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                    to="/productos/nuevo">
                    Nuevo producto
                </Link>
            </div>
            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((x) => (
                            <ProductDetails key={x.id} product={x} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Products
