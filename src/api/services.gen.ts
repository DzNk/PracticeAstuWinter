// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type Options } from "./client";
import type {
    LoginUserData,
    LoginUserError,
    LoginUserResponse,
    GetProductsListData,
    GetProductsListError,
    GetProductsListResponse,
} from "./types.gen";

export const client = createClient(createConfig());

export class UserService {
    /**
     * Login User
     */
    public static loginUser<ThrowOnError extends boolean = false>(
        options: Options<LoginUserData, ThrowOnError>
    ) {
        return (options?.client ?? client).post<
            LoginUserResponse,
            LoginUserError,
            ThrowOnError
        >({
            ...options,
            url: "/user/login",
        });
    }
}

export class ProductsService {
    /**
     * Get Products List
     */
    public static getProductsList<ThrowOnError extends boolean = false>(
        options: Options<GetProductsListData, ThrowOnError>
    ) {
        return (options?.client ?? client).post<
            GetProductsListResponse,
            GetProductsListError,
            ThrowOnError
        >({
            ...options,
            url: "/products/list",
        });
    }
}
