
import type { NoticeAttachment } from '../ImportantNotice.types';

export interface NoticeAuthor {
  avatar: string; // initials
  name: string;
  role: string;
}

export interface NoticeV1 {
  id: string;
  priority: 'urgent' | 'important' | 'info' | 'update';
  isUnread?: boolean;
  isPinned?: boolean;
  isNew?: boolean;
  title: string;
  tags: string[];
  description: string;
  fullDescription: string;
  attachmentCount: number;
  attachments?: NoticeAttachment[];
  author: NoticeAuthor;
  date: string;
  time: string;
}

export const noticesV1: NoticeV1[] = [
  {
    id: '1',
    priority: 'urgent',
    isUnread: true,
    isPinned: true,
    isNew: true,
    title: 'Thay đổi chính sách lãi suất bảo hiểm nhân thọ từ 15/11/2025',
    tags: ['Chính sách', 'Lãi suất', 'Bảo hiểm'],
    description: 'Kính gửi toàn thể nhân viên và đại lý bảo hiểm, Ban Lãnh Đạo thông báo về việc điều chỉnh lãi suất bảo hiểm nhân thọ có hiệu lực từ ngày 15/11/2025. Lãi suất mới sẽ tăng từ 4.5% lên 5.2% năm...',
    fullDescription: 'Kính gửi toàn thể nhân viên và đại lý bảo hiểm, Ban Lãnh Đạo thông báo về việc điều chỉnh lãi suất bảo hiểm nhân thọ có hiệu lực từ ngày 15/11/2025. Lãi suất mới sẽ tăng từ 4.5% lên 5.2% năm. Tất cả các hợp đồng mới sẽ áp dụng mức lãi suất này. Vui lòng cập nhật thông tin cho khách hàng và tham khảo tài liệu đính kèm để biết thêm chi tiết.',
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
    isUnread: true,
    isNew: true,
    title: 'Thay đổi thời gian khám bệnh định kỳ năm 2025',
    tags: ['Sức khỏe', 'Phúc lợi'],
    description: 'Công ty thông báo lịch khám sức khỏe định kỳ năm 2025 đã được thay đổi từ tháng 12 sang tháng 1/2026. Toàn bộ nhân viên vui lòng sắp xếp thời gian phù hợp...',
    fullDescription: 'Công ty thông báo lịch khám sức khỏe định kỳ năm 2025 đã được thay đổi từ tháng 12 sang tháng 1/2026 để phù hợp hơn với lịch hoạt động cuối năm của công ty. Toàn bộ nhân viên vui lòng sắp xếp thời gian và đăng ký lịch khám chi tiết với phòng nhân sự trước ngày 30/11/2025.',
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
    isUnread: false,
    title: 'Hướng dẫn sử dụng hệ thống quản lý bán hàng mới',
    tags: ['Hệ thống', 'Hướng dẫn', 'Bán hàng'],
    description: 'Từ ngày 20/11/2025, công ty sẽ chính thức áp dụng hệ thống quản lý bán hàng mới với nhiều tính năng cải tiến. Vui lòng xem video hướng dẫn và tài liệu đính kèm...',
    fullDescription: 'Từ ngày 20/11/2025, công ty sẽ chính thức áp dụng hệ thống quản lý bán hàng mới với nhiều tính năng cải tiến. Hệ thống mới sẽ giúp tối ưu hóa quy trình bán hàng, quản lý khách hàng và báo cáo doanh thu. Vui lòng xem video hướng dẫn và tài liệu đính kèm để nắm rõ cách sử dụng.',
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
    isUnread: false,
    title: 'Cập nhật chính sách làm việc từ xa (Remote Work)',
    tags: ['Chính sách', 'Remote'],
    description: 'Ban Lãnh Đạo thông báo cập nhật chính sách làm việc từ xa với quy định mới: nhân viên có thể làm remote 2 ngày/tuần thay vì 1 ngày/tuần như trước đây...',
    fullDescription: 'Ban Lãnh Đạo thông báo cập nhật chính sách làm việc từ xa với quy định mới: nhân viên có thể làm remote 2 ngày/tuần thay vì 1 ngày/tuần như trước đây. Chính sách mới này sẽ có hiệu lực từ ngày 01/12/2025 và áp dụng cho tất cả các phòng ban đủ điều kiện. Vui lòng liên hệ phòng nhân sự để biết thêm chi tiết.',
    attachmentCount: 0,
    author: { avatar: 'COO', name: 'Phạm Thị D', role: 'COO - ThinkSmart' },
    date: '08/11/2025',
    time: '11:20',
  },
  {
    id: '5',
    priority: 'urgent',
    isUnread: false,
    title: 'Bảo trì hệ thống ngày 18/11/2025 - Ngừng hoạt động 4 giờ',
    tags: ['Bảo trì', 'Hệ thống'],
    description: 'Hệ thống sẽ ngừng hoạt động từ 00:00 - 04:00 ngày 18/11/2025 để thực hiện bảo trì định kỳ. Vui lòng hoàn tất công việc trước thời gian này...',
    fullDescription: 'Để nâng cấp và đảm bảo hiệu suất, hệ thống sẽ ngừng hoạt động từ 00:00 - 04:00 ngày 18/11/2025 để thực hiện bảo trì định kỳ. Vui lòng lưu lại công việc và đăng xuất khỏi hệ thống trước thời gian này để tránh mất dữ liệu.',
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
    isUnread: false,
    title: 'Lịch nghỉ Tết Nguyên Đán 2026',
    tags: ['Nghỉ lễ', 'Tết'],
    description: 'Công ty thông báo lịch nghỉ Tết Nguyên Đán 2026 từ ngày 26/01 đến 03/02/2026 (9 ngày). Nhân viên làm việc trong dịp Tết sẽ được hưởng lương x3 theo quy định...',
    fullDescription: 'Công ty thông báo lịch nghỉ Tết Nguyên Đán 2026 từ ngày 26/01 đến 03/02/2026 (9 ngày). Nhân viên làm việc trong dịp Tết sẽ được hưởng lương x3 theo quy định của Luật Lao động. Chúc toàn thể nhân viên có một kỳ nghỉ lễ vui vẻ và ấm áp bên gia đình.',
    attachmentCount: 0,
    author: { avatar: 'HR', name: 'Trần Thị B', role: 'Giám Đốc Nhân Sự' },
    date: '05/11/2025',
    time: '10:30',
  },
];
