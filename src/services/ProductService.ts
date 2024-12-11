import { safeParse, pipe, number, parse, transform, string } from "valibot";
import { ProductInputSchema, ProductSchema, ProductsSchema } from "../schemas/ProductSchema";
import axios from "axios";
import { ProductType } from "../types";
import { toBoolean } from "../utils";

type ProductDataType = {
    [k: string]: FormDataEntryValue;
}

export const addProduct = async (data: ProductDataType) => {
    try {
        const result = safeParse(ProductInputSchema, {
            name: data.name,
            price: +data.price
        })

        if (result.success) {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Datos inválidos')
        }
    } catch (error) {
        console.log(error)
    }

}

export const getProducts = async () => {

    const url = `${import.meta.env.VITE_API_URL}/api/products`
    const { data } = await axios(url)
    const result = safeParse(ProductsSchema, data.data)
    if (result.success) {
        return result.output
    }
}

export const getProductById = async (id: ProductType['id']) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error')
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (data: ProductDataType, id: ProductType['id']) => {

    const NumberSchema = pipe(string(), transform(Number), number())

    const result = safeParse(ProductSchema, {
        id,
        name: data.name,
        price: parse(NumberSchema, data.price),
        availability: toBoolean(data.availability.toString())
    })

    if (result.success) {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.put(url, result.output)
    }

    console.log(result)
}

export const deleteProduct = async (id: ProductType['id']) => {
    try {
        if (id !== undefined && typeof (id) === "number") {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.delete(url)
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateAvailability = async (id: ProductType['id']) => {
    try {
        if (id !== undefined) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.patch(url)
        }
    } catch (error) {
        console.log(error)
    }
}