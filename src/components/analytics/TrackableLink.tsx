'use client';

/**
 * 클릭 추적이 포함된 <a> 태그 래퍼 컴포넌트
 *
 * 서버 컴포넌트(OfficialSourcesSection, PdfDownloadCard 등)가
 * 클라이언트 상태 없이 추적 링크를 렌더링할 수 있도록 함.
 *
 * 사용 예:
 *   <TrackableLink
 *     href={source.url}
 *     target="_blank"
 *     rel="noopener noreferrer"
 *     event={{ name: 'official_source_click', params: { ... } }}
 *   >
 *     {source.name}
 *   </TrackableLink>
 *
 * 주의:
 * - Next.js <Link> (내부 라우팅)에는 사용하지 말 것 → 해당 컴포넌트에 'use client' 추가 후 onClick 직접 사용
 * - 외부 링크(<a href="https://...">)에만 사용
 */

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { trackEvent, type EventName, type EventParamMap } from '@/lib/analytics';

interface TrackableEvent<T extends EventName> {
  name: T;
  params: EventParamMap[T];
}

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** 추적할 이벤트 (name + params) */
  event: TrackableEvent<EventName>;
  children: ReactNode;
}

export default function TrackableLink({
  event,
  children,
  onClick,
  ...anchorProps
}: Props) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    trackEvent(
      event.name as EventName,
      event.params as EventParamMap[EventName],
    );
    onClick?.(e);
  }

  return (
    <a onClick={handleClick} {...anchorProps}>
      {children}
    </a>
  );
}
