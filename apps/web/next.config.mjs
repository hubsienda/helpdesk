import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig = {
  reactStrictMode: true,

  // IMPORTANT for this app:
  // Do NOT use output: 'export' for this project.
};

export default withNextIntl(nextConfig);
