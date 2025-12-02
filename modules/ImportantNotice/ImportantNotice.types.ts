
export type NoticePriority = 'critical' | 'important' | 'update' | 'info';

export interface NoticeAttachment {
  name: string;
  type: 'PDF' | 'DOCX' | 'XLSX' | 'IMAGE';
  size: string;
}

export interface NoticeAuthor {
  name: string;
  avatar: string; // initials or url
  role: string;
}

export interface Notice {
  id: string;
  priority: NoticePriority;
  title: string;
  description: string; // Short description for cards
  fullContent?: string; // Full content for modal
  date: string;
  time?: string;
  effectiveDate?: string;
  
  // Metadata
  isNew?: boolean;
  isPinned?: boolean;
  tags: string[];
  views?: string;
  
  // Relations
  author: NoticeAuthor;
  attachments?: NoticeAttachment[];
  image?: string;
}
