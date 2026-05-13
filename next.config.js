/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['nedb-promises', 'bcryptjs', 'nodemailer'],
};
module.exports = nextConfig;
