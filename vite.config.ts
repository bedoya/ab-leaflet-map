import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig(({ command }) => {
    const isBuild = command === 'build';

    return {
        build: isBuild
            ? {
                lib: {
                    entry: resolve(__dirname, 'src/ab-leaflet-map.ts'),
                    name: 'ABLeafletMap',
                    formats: ['es', 'umd'],
                    fileName: (format) => `ab-leaflet-map.${format}.js`
                },
                rollupOptions: {
                    external: ['leaflet'],
                    output: {
                        globals: {
                            leaflet: 'L'
                        },
                        exports: 'named'
                    }
                }
            }
            : undefined,
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
                'ab-leaflet-map': resolve(__dirname, 'src/ab-leaflet-map.ts')
            }
        }
    };
});
