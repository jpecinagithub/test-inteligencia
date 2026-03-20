import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

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
  plugins: [...reactSwcPatched()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.js'],
    include: ['tests/**/*.test.js', 'tests/**/*.test.jsx'],
    pool: 'forks',
    minThreads: 1,
    maxThreads: 1
  }
})
