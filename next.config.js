/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Add this to handle trailing slashes properly
  trailingSlash: true,
  // Add webpack configuration to fix module loading issues
  webpack: (config, { isServer }) => {
    // Fix for "__webpack_modules__[moduleId] is not a function" error
    config.optimization.moduleIds = 'named';
    
    // Ensure proper module loading
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      ]
    });
    
    return config;
  },
};

module.exports = nextConfig;
