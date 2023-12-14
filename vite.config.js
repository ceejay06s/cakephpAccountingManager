// View your website at your own local server
// for example http://vite-php-setup.test

// http://localhost:5133 is serving Vite on development
// but accessing it directly will be empty
// TIP: consider changing the port for each project, see below

// IMPORTANT image urls in CSS works fine
// BUT you need to create a symlink on dev server to map this folder during dev:
// ln -s {path_to_project_source}/src/assets {path_to_public_html}/assets
// on production everything will work just fine
// (this happens because our Vite code is outside the server public access,
// if it were, we could use https://vitejs.dev/config/server-options.html#server-origin)

import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import reactRefresh from "@vitejs/plugin-react-refresh";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        //splitVendorChunkPlugin(),
        reactRefresh()
    ],

    root: 'src',
    base: '/',

    build: {
        // output dir for production build
        outDir: '../app/webroot/dist',
        emptyOutDir: true,

        // emit manifest so PHP can find the hashed files
        manifest: true,

        // our entry
        rollupOptions: {
            //external: [/^node:.*/, '@mui/icon-material'],
            input: path.resolve(__dirname, 'src/main.jsx'),
        }
    },


})