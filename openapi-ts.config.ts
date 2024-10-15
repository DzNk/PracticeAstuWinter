import { defineConfig } from "@hey-api/openapi-ts";
import { loadEnv } from "vite";

const mode = "development";
const env = loadEnv(mode, process.cwd());

export default defineConfig({
    client: {
        name: "@hey-api/client-fetch",
        bundle: true,
    },
    input: env.VITE_API_BASE_URL + "/openapi.json",
    output: {
        format: "prettier",
        path: "src/api",
        lint: false,
    },
    services: {
        asClass: true,
        operationId: true,
    },
});
