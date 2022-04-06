/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_ACCESSTOKEN,
    FIREBASE_APIKEY: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    FIREBASE_APPID: process.env.NEXT_PUBLIC_FIREBASE_APPID,
    FIREBASE_SENDERID: process.env.NEXT_PUBLIC_FIREBASE_SENDERID
  }
}

module.exports = nextConfig
