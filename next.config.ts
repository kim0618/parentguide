import type { NextConfig } from 'next';

// Static export 기준으로 설정.
// ISR/SSR 전환 시: output 제거, images.unoptimized 제거하면 됨.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    // static export에서는 Next.js Image 최적화 서버 불가 → unoptimized 필수
    unoptimized: true,
  },
};

export default nextConfig;
