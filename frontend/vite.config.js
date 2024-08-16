// import react from '@vitejs/plugin-react';
// import { defineConfig } from 'vite';

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': '/src',
//     },
//   },
//   assetsInclude: ['**/*.svg', '**/*.jpg', '**/*.png'], // Ensure assets are included
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import alias from '@rollup/plugin-alias';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), alias()],
  resolve: {
    alias: {
      '@loginComponents': resolve(__dirname, '../Login/client/src/Components'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.jpg', '**/*.png'], // Ensure assets are included
});