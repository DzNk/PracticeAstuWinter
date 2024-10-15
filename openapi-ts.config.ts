import { defineConfig } from "@hey-api/openapi-ts";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export default defineConfig({
    client: {
        name: "@hey-api/client-fetch",
        bundle: false,
    },
    input: process.env.NEXT_PUBLIC_API_BASE_URL + "/openapi.json",
    output: {
        format: "prettier",
        path: "api",
        lint: false,
    },
    services: {
        asClass: true,
        operationId: true,
    },
});
