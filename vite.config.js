import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
// https://vite.dev/config/
export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "VITE_BACKEND_URL");

    return defineConfig({
        plugins: [react()],
        server: {
            proxy: {
                "/api": env.VITE_BACKEND_URL,
            },
        },
    });
};