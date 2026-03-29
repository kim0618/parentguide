import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '부모혜택 - 부모님 복지·건강·은퇴 가이드',
    short_name: '부모혜택',
    description: '부모님과 시니어가 꼭 알아야 할 복지·건강보험·은퇴 실무 가이드',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1D4ED8',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
