import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default ({ mode }) => {
	process.env = {...process.env, ...loadEnv(mode, process.cwd())};
	return defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": process.env.VITE_BACKEND_URL,
		},
	},
})};
