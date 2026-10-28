import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // '/' if you use a custom domain or a repo named <username>.github.io
  // '/your-repo-name/' if the site lives at <username>.github.io/your-repo-name/
   base: '/vincent-react-site/',
   build: { outDir: 'docs' },
})
