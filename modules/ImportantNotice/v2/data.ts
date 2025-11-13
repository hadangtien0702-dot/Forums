

export interface NoticeAttachment {
  name: string;
  type: 'PDF' | 'DOCX' | 'XLSX' | 'IMAGE';
  size: string;
}

export interface NoticeAuthor {
  avatar: string; // initials
  name: string;
  role: string;
}

export interface NoticeV2 {
  id: string;
  priority: 'urgent' | 'important' | 'info' | 'update';
  isUnread?: boolean;
  isPinned?: boolean;
  isNew?: boolean;
  title: string;
  tags: string[];
  description: string;
  attachmentCount?: number;
  attachments?: NoticeAttachment[];
  author: NoticeAuthor;
  date: string;
  time: string;
}

export const noticesV2: NoticeV2[] = [
  {
    id: '1',
    priority: 'urgent',
    isPinned: true,
    isNew: false,
    title: 'Thay đổi chính sách lãi suất bảo hiểm nhân thọ từ 15/11/2025',
    tags: ['Chính sách', 'Lãi suất', 'Bảo hiểm'],
    description: 'Kính gửi toàn thể nhân viên và đại lý bảo hiểm, Ban Lãnh Đạo thông báo về việc điều chỉnh lãi suất bảo hiểm nhân thọ có hiệu lực từ ngày 15/11/2025. Lãi suất mới...',
    attachmentCount: 2,
    attachments: [
        { name: 'Policy_Change_Summary_Nov2025.pdf', type: 'PDF', size: '1.2 MB' },
        { name: 'New_Interest_Rate_Chart.xlsx', type: 'XLSX', size: '450 KB' },
    ],
    author: { avatar: 'CEO', name: 'Nguyễn Văn A', role: 'CEO - ThinkSmart' },
    date: '13/11/2025',
    time: '14:30',
  },
  {
    id: '2',
    priority: 'important',
    isNew: true,
    title: 'Thay đổi thời gian khám bệnh định kỳ năm 2025',
    tags: ['Sức khỏe', 'Phúc lợi'],
    description: 'Công ty thông báo lịch khám sức khỏe định kỳ năm 2025 đã được thay đổi từ tháng 12 sang tháng 1/2026. Toàn bộ nhân viên vui lòng sắp xếp thời gian phù hợp...',
    attachmentCount: 1,
    attachments: [
        { name: 'Health_Checkup_Schedule_2025-2026.pdf', type: 'PDF', size: '800 KB' },
    ],
    author: { avatar: 'HR', name: 'Trần Thị B', role: 'Giám Đốc Nhân Sự' },
    date: '12/11/2025',
    time: '09:15',
  },
  {
    id: '3',
    priority: 'info',
    title: 'Hướng dẫn sử dụng hệ thống quản lý bán hàng mới',
    tags: ['Hệ thống', 'Hướng dẫn', 'Bán hàng'],
    description: 'Từ ngày 20/11/2025, công ty sẽ chính thức áp dụng hệ thống quản lý bán hàng mới với nhiều tính năng cải tiến. Vui lòng xem video hướng dẫn và tài liệu đính kèm...',
    attachmentCount: 3,
     attachments: [
        { name: 'Sales_System_User_Guide.pdf', type: 'PDF', size: '4.5 MB' },
        { name: 'Walkthrough_Video_Link.docx', type: 'DOCX', size: '88 KB' },
        { name: 'FAQ_Sheet.docx', type: 'DOCX', size: '200 KB' },
    ],
    author: { avatar: 'IT', name: 'Lê Văn C', role: 'Giám Đốc Công Nghệ' },
    date: '10/11/2025',
    time: '16:45',
  },
  {
    id: '4',
    priority: 'update',
    title: 'Cập nhật chính sách làm việc từ xa (Remote Work)',
    tags: ['Chính sách', 'Remote'],
    description: 'Ban Lãnh Đạo thông báo cập nhật chính sách làm việc từ xa với quy định mới: nhân viên có thể làm remote 2 ngày/tuần thay vì 1 ngày/tuần như trước đây...',
    attachmentCount: 0,
    author: { avatar: 'COO', name: 'Phạm Thị D', role: 'COO - ThinkSmart' },
    date: '08/11/2025',
    time: '11:20',
  },
  {
    id: '5',
    priority: 'urgent',
    title: 'Bảo trì hệ thống ngày 18/11/2025 - Ngừng hoạt động 4 giờ',
    tags: ['Bảo trì', 'Hệ thống'],
    description: 'Hệ thống sẽ ngừng hoạt động từ 00:00 - 04:00 ngày 18/11/2025 để thực hiện bảo trì định kỳ. Vui lòng hoàn tất công việc trước thời gian này...',
    attachmentCount: 1,
    attachments: [
        { name: 'Maintenance_Schedule_Details.pdf', type: 'PDF', size: '300 KB' },
    ],
    author: { avatar: 'IT', name: 'Lê Văn C', role: 'Giám Đốc Công Nghệ' },
    date: '07/11/2025',
    time: '18:00',
  },
  {
    id: '6',
    priority: 'info',
    title: 'Lịch nghỉ Tết Nguyên Đán 2026',
    tags: ['Nghỉ lễ', 'Tết'],
    description: 'Công ty thông báo lịch nghỉ Tết Nguyên Đán 2026 từ ngày 26/01 đến 03/02/2026 (9 ngày). Nhân viên làm việc trong dịp Tết sẽ được hưởng lương x3 theo quy định...',
    attachmentCount: 0,
    author: { avatar: 'HR', name: 'Trần Thị B', role: 'Giám Đốc Nhân Sự' },
    date: '05/11/2025',
    time: '10:30',
  },
];
