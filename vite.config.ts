import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    // dev mode
    return {
      plugins: [react()],
      server: {
        port: 5500,
      },
      base: '/', // use root base in dev
    }
  } else {
    // build mode (production)
    return {
      plugins: [react()],
      base: '/Portfolio/', // production base path
    }
  }
})



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5500,
//   },
// })
