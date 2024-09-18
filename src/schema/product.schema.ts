import { query } from "express";
import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string({
    required_error: "Product name is required",
  }).trim().max(50),
  description: z.string({
    required_error: "Product description is required",
  }).trim().max(500),
  price: z.number({
    required_error: "Product price is required",
  }).min(0, "Price must be a positive number"),
});

export const updateProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional()
});

export const searchProductSchema = z.object({
  query: z.object({
    name: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
  }),
});

export const deleteProductSchema = z.object({
  params: z.object({
    productId: z.string({
      required_error: "productId is required",
    }).regex(/^[0-9a-fA-F]{24}$/, "Invalid productId format"), 
  }),
});


