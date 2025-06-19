import { defineConfig } from 'vite'
import tailwindcss from "@vitejs/plugin-react";
//import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
})
