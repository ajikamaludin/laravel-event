import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    lodash: ['lodash'],
                    moment: ['moment'],
                    daisyui: ['daisyui'],
                    sonner: ['sonner'],
                    apexcharts: ['apexcharts'],
                    reactapexcharts: ['react-apexcharts'],
                    fullcalendarcore: ['@fullcalendar/core'],
                    fullcalendardaygrid: ['@fullcalendar/daygrid'],
                    fullcalendarreact: ['@fullcalendar/react'],
                    reacttailwindcssdatepicker: [
                        'react-tailwindcss-datepicker',
                    ],
                },
            },
        },
    },
})
