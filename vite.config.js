import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

const reactSwcPatched = () => {
  const plugins = react()

  return plugins.map((plugin) => {
    if (plugin.name === 'vite:react-swc' && plugin.apply === 'serve') {
      const originalConfig = plugin.config
      plugin.config = (...args) => {
        const config = originalConfig ? originalConfig(...args) : {}
        if (config?.optimizeDeps?.esbuildOptions) {
          const include = config.optimizeDeps.include
          delete config.optimizeDeps.esbuildOptions
          config.optimizeDeps.rolldownOptions = {
            transform: {
              jsx: {
                runtime: 'automatic'
              }
            }
          }
          if (include) config.optimizeDeps.include = include
        }
        return config
      }
    }
    return plugin
  })
}

export default defineConfig({
  plugins: [
    ...reactSwcPatched(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: false,
      includeAssets: [
        'brain.svg',
        'manifest.webmanifest',
        'icons/apple-touch-icon.png',
        'icons/icon-192.png',
        'icons/icon-512.png',
        'icons/icon-192-maskable.png',
        'icons/icon-512-maskable.png'
      ],
      workbox: {
        cleanupOutdatedCaches: true,
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('firebase')) return 'firebase'
          if (id.includes('react-router')) return 'router'
          if (id.includes('react-dom') || id.includes('react')) return 'react'
          if (id.includes('axios')) return 'axios'
          return 'vendor'
        }
      }
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})
