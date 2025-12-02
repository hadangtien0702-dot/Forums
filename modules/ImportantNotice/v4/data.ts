
import type { NoticeAttachment } from '../ImportantNotice.types';

export interface NoticeV4 {
  id: string;
  priority: 'urgent' | 'important' | 'info' | 'update';
  isNew?: boolean;
  title: string;
  tags: string[];
  fullDescription?: string;
  attachmentCount?: number;
  attachments?: NoticeAttachment[];
  author: { avatar: string; name: string; role?: string };
  date: string;
  time?: string;
  effectiveDate?: string;
  views?: string;
}

export const featuredNoticeV4: NoticeV4 = {
  id: 'featured-1',
  priority: 'urgent',
  title: 'Thay đổi chính sách lãi suất bảo hiểm nhân thọ từ 15/11/2025',
  tags: ['Chính sách', 'Lãi suất', 'Bảo hiểm nhân thọ'],
  fullDescription: 'Kính gửi toàn thể nhân viên và đại lý bảo hiểm, Ban Lãnh Đạo thông báo về việc điều chỉnh lãi suất bảo hiểm nhân thọ có hiệu lực từ ngày 15/11/2025. Lãi suất mới sẽ tăng từ 4.5% lên 5.2% năm, áp dụng cho tất cả các sản phẩm bảo hiểm nhân thọ. Vui lòng xem chi tiết trong file đính kèm và cập nhật thông tin cho khách hàng trong thời gian sớm nhất.',
  attachmentCount: 2,
  attachments: [
        { name: 'Policy_Change_Summary_Nov2025.pdf', type: 'PDF', size: '1.2 MB' },
        { name: 'New_Interest_Rate_Chart.xlsx', type: 'XLSX', size: '450 KB' },
  ],
  author: { avatar: 'CEO', name: 'Nguyễn Văn A', role: 'CEO - ThinkSmart Insurance' },
  date: '13/11/2025',
  time: '14:30',
  effectiveDate: '15/11/2025',
  views: '128 views',
};

export const otherNoticesV4: NoticeV4[] = [
  {
    id: 'other-1',
    priority: 'important',
    isNew: true,
    title: 'Thay đổi thời gian khám bệnh định kỳ năm 2025',
    tags: ['Sức khỏe', 'Phúc lợi'],
    attachmentCount: 1,
    author: { avatar: 'HR', name: 'Trần Thị B' },
    date: '12/11/2025',
  },
  {
    id: 'other-2',
    priority: 'info',
    title: 'Hướng dẫn sử dụng hệ thống quản lý bán hàng mới',
    tags: ['Hệ thống', 'Hướng dẫn', 'Bán hàng'],
    attachmentCount: 3,
    author: { avatar: 'IT', name: 'Lê Văn C' },
    date: '10/11/2025',
  },
  {
    id: 'other-3',
    priority: 'update',
    title: 'Cập nhật chính sách làm việc từ xa (Remote Work)',
    tags: ['Chính sách', 'Remote'],
    author: { avatar: 'COO', name: 'Phạm Thị D' },
    date: '08/11/2025',
  },
  {
    id: 'other-4',
    priority: 'urgent',
    title: 'Bảo trì hệ thống ngày 18/11/2025 - Ngừng hoạt động 4 giờ',
    tags: ['Bảo trì', 'Hệ thống'],
    attachmentCount: 1,
    author: { avatar: 'IT', name: 'Lê Văn C' },
    date: '07/11/2025',
  },
  {
    id: 'other-5',
    priority: 'info',
    title: 'Lịch nghỉ Tết Nguyên Đán 2026',
    tags: ['Nghỉ lễ', 'Tết'],
    author: { avatar: 'HR', name: 'Trần Thị B' },
    date: '05/11/2025',
  },
];
