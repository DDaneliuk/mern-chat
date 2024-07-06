import dotenv from 'dotenv';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

dotenv.config();

export default defineConfig({
	plugins: [react()],
	define: {
		'process.env': process.env
	},
	server: {
		port: 8000,
		proxy: {
			"/api": {
				target: "http://localhost:3000",
			},
		},
	},
});