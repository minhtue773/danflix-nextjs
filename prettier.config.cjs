module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/app/globals.css',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 100,

  // Dòng này CỰC KỲ QUAN TRỌNG cho Next.js nếu bạn dùng shadcn/ui hoặc clsx/cn:
  tailwindFunctions: ['cn', 'clsx', 'cva'],
};
