module.exports = {
  reactStrictMode: true,
  env: {
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  }
}
