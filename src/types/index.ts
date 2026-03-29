// 타입 중앙 re-export
// 컴포넌트에서 '@/types'로 한 번에 import 가능

export type {
  ContentCategory,
  ContentTemplate,
  TargetUser,
  ReviewStatus,
  ContentItem,
  ContentListItem,
  ContentSection,
  SectionType,
  OfficialSource,
  FAQ,
  RelatedCalculator,
  CalculatorCTA,
} from './content';

export { CATEGORY_LABELS } from './content';

export type { Category, Hub, NavLink } from './navigation';
export type { HubDetail } from './hub';
export type { PdfDownload, DownloadGateType, DownloadStatus } from './download';
