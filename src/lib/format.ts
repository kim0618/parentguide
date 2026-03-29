/**
 * 날짜·텍스트 포맷 유틸
 * 컴포넌트에서 직접 Date 조작을 하지 않도록 여기서 처리
 */

/**
 * ISO 날짜 문자열을 한국어 표기로 변환
 * '2025-01-15' → '2025년 1월 15일'
 */
export function formatDate(iso: string): string {
  const date = new Date(iso + 'T00:00:00'); // UTC 오프셋 방지
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * ISO 날짜 문자열을 짧은 한국어 표기로 변환
 * '2025-01-15' → '2025년 1월'
 */
export function formatDateShort(iso: string): string {
  const date = new Date(iso + 'T00:00:00');
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
  });
}
