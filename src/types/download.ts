/**
 * PDF 다운로드 자료 타입
 *
 * 현재: status='coming-soon' + gateType='direct' 중심으로 운용.
 * 향후 확장:
 *   - gateType='email'  → 이메일 입력 후 발송 플로우
 *   - gateType='kakao'  → 카카오 채널 추가 후 전달 플로우
 *   - status='available' → public/downloads/ 실제 파일 연결
 */

import type { ContentCategory } from './content';

/**
 * 다운로드 게이트 유형
 *
 * direct - 버튼 클릭 → 파일 직접 다운로드 (현재 구현 단계)
 * email  - 이메일 입력 폼 → 이메일 발송 (향후 확장)
 * kakao  - 카카오 채널 추가 → 채널 내 파일 제공 (향후 확장)
 */
export type DownloadGateType = 'direct' | 'email' | 'kakao';

/**
 * 다운로드 자료 상태
 *
 * available    - 파일 준비 완료, 다운로드 가능
 * coming-soon  - 준비 중, 버튼 비활성화
 */
export type DownloadStatus = 'available' | 'coming-soon';

/** PDF 다운로드 자료 */
export interface PdfDownload {
  /** 고유 ID (URL slug 형식) */
  id: string;

  /** 자료 제목 (카드·버튼에 표시) */
  title: string;

  /** 한 줄 설명 */
  description: string;

  /**
   * public/downloads/ 기준 파일명
   * status='available'일 때만 필요
   * 예: 'basic-pension-checklist.pdf'
   */
  fileName?: string;

  /** 자료 상태 */
  status: DownloadStatus;

  /**
   * 다운로드 게이트 유형
   * 현재는 'direct'만 처리 - 나머지는 타입 예약
   */
  gateType: DownloadGateType;

  /**
   * 연관 가이드 slug 목록
   * getDownloadsByGuide() 역방향 조회에 사용
   */
  relatedGuides?: string[];

  /**
   * 연관 허브 slug 목록
   * getDownloadsByHub() 역방향 조회에 사용
   */
  relatedHubs?: string[];

  /** 소속 카테고리 (선택) */
  category?: ContentCategory;

  /** 검색·필터용 태그 */
  tags?: string[];
}
