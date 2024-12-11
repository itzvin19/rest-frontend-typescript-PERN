import { InferOutput } from "valibot";
import { ProductSchema, ProductsSchema } from "../schemas/ProductSchema";

export type ProductsType = InferOutput<typeof ProductsSchema>
export type ProductType = InferOutput<typeof ProductSchema>