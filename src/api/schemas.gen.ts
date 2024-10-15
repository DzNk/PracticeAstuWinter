// This file is auto-generated by @hey-api/openapi-ts

export const HTTPValidationErrorSchema = {
    properties: {
        detail: {
            items: {
                $ref: "#/components/schemas/ValidationError",
            },
            type: "array",
            title: "Detail",
        },
    },
    type: "object",
    title: "HTTPValidationError",
} as const;

export const LoginResponseSchema = {
    properties: {
        permission: {
            type: "integer",
            title: "Permission",
        },
        name: {
            type: "string",
            title: "Name",
        },
        ok: {
            type: "boolean",
            title: "Ok",
            default: false,
        },
    },
    type: "object",
    required: ["permission", "name"],
    title: "LoginResponse",
} as const;

export const PaginationRequestSchema = {
    properties: {
        page: {
            type: "integer",
            title: "Page",
        },
        perPage: {
            type: "integer",
            title: "Perpage",
        },
    },
    type: "object",
    required: ["page", "perPage"],
    title: "PaginationRequest",
} as const;

export const PaginationResponseSchema = {
    properties: {
        total: {
            type: "integer",
            title: "Total",
        },
        pages: {
            type: "integer",
            title: "Pages",
        },
    },
    type: "object",
    required: ["total", "pages"],
    title: "PaginationResponse",
} as const;

export const ProductItemSchema = {
    properties: {
        id: {
            type: "integer",
            title: "Id",
        },
        name: {
            type: "string",
            title: "Name",
        },
        description: {
            type: "string",
            title: "Description",
        },
        price: {
            type: "number",
            title: "Price",
        },
        article: {
            type: "string",
            title: "Article",
        },
        quantity: {
            type: "integer",
            title: "Quantity",
        },
    },
    type: "object",
    required: ["id", "name", "description", "price", "article", "quantity"],
    title: "ProductItem",
} as const;

export const ProductListSchema = {
    properties: {
        products: {
            items: {
                $ref: "#/components/schemas/ProductItem",
            },
            type: "array",
            title: "Products",
        },
        paginationInfo: {
            $ref: "#/components/schemas/PaginationResponse",
        },
    },
    type: "object",
    required: ["products", "paginationInfo"],
    title: "ProductList",
} as const;

export const ProductListFilterSchema = {
    properties: {
        keyword: {
            type: "string",
            title: "Keyword",
            default: "",
        },
        pagination: {
            $ref: "#/components/schemas/PaginationRequest",
        },
    },
    type: "object",
    required: ["pagination"],
    title: "ProductListFilter",
} as const;

export const UserLoginSchema = {
    properties: {
        username: {
            type: "string",
            title: "Username",
        },
        password: {
            type: "string",
            title: "Password",
        },
    },
    type: "object",
    required: ["username", "password"],
    title: "UserLogin",
} as const;

export const ValidationErrorSchema = {
    properties: {
        loc: {
            items: {
                anyOf: [
                    {
                        type: "string",
                    },
                    {
                        type: "integer",
                    },
                ],
            },
            type: "array",
            title: "Location",
        },
        msg: {
            type: "string",
            title: "Message",
        },
        type: {
            type: "string",
            title: "Error Type",
        },
    },
    type: "object",
    required: ["loc", "msg", "type"],
    title: "ValidationError",
} as const;
