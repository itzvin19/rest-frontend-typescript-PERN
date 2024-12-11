import { ActionFunctionArgs, Form, Link, redirect, useFetcher } from "react-router-dom"
import { ProductType } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
    product: ProductType
}

export const action = async ({ params }: ActionFunctionArgs) => {
    if (params.id !== undefined) {
        await deleteProduct(+params.id)
        return redirect('/')
    }
    return ''
}

const ProductDetails = ({ product }: ProductDetailsProps) => {


    const fetcher = useFetcher()

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg">
                <fetcher.Form
                    method="post">
                    <button
                        className={`p-3 bg-slate-200 w-full rounded-md font-bold ${product.availability ? 'text-gray-800' : 'text-red-500'}`}
                        name="id"
                        value={product.id.toString()}
                    >
                        {product.availability ? 'Disponible' : 'No Disponible'}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg flex text-gray-800 gap-3">
                <Link to={`/productos/${product.id}/editar`} className="bg-indigo-800 w-full text-center text-white font-bold p-3 rounded-md">Editar</Link>
                <Form
                    className="w-full bg-red-500 rounded-md text-white font-bold justify-center items-center flex"
                    method="POST"
                    action={`/productos/${product.id}/eliminar`}
                    onSubmit={(e) => {
                        if (!confirm('Deseas Eliminar este producto?')) {
                            e.preventDefault()
                        }
                    }}
                >
                    <input type="submit" value="Eliminar" />
                </Form>
            </td>
        </tr>

    )
}

export default ProductDetails
