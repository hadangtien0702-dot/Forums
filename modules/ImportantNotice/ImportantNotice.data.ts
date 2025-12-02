
import type { Notice } from './ImportantNotice.types';

export const noticesData: Notice[] = [
  {
    id: 'notice-1',
    priority: 'critical',
    isNew: true,
    isPinned: true,
    title: 'Thay đổi chính sách lãi suất bảo hiểm nhân thọ từ 15/11/2025',
    tags: ['Chính sách', 'Lãi suất', 'Bảo hiểm nhân thọ'],
    description: 'Kính gửi toàn thể nhân viên và đại lý bảo hiểm, Ban Lãnh Đạo thông báo về việc điều chỉnh lãi suất bảo hiểm nhân thọ có hiệu lực từ ngày 15/11/2025. Lãi suất mới sẽ tăng từ 4.5% lên 5.2% năm...',
    fullContent: 'Kính gửi toàn thể nhân viên và đại lý bảo hiểm, Ban Lãnh Đạo thông báo về việc điều chỉnh lãi suất bảo hiểm nhân thọ có hiệu lực từ ngày 15/11/2025. Lãi suất mới sẽ tăng từ 4.5% lên 5.2% năm. Tất cả các hợp đồng mới sẽ áp dụng mức lãi suất này. Vui lòng cập nhật thông tin cho khách hàng và tham khảo tài liệu đính kèm để biết thêm chi tiết.',
    date: '13/11/2025',
    time: '14:30',
    effectiveDate: '15/11/2025',
    views: '1,240',
    author: { 
        avatar: 'CEO', 
        name: 'Nguyễn Văn A', 
        role: 'CEO - ThinkSmart Insurance' 
    },
    attachments: [
        { name: 'Policy_Change_Summary_Nov2025.pdf', type: 'PDF', size: '1.2 MB' },
        { name: 'New_Interest_Rate_Chart.xlsx', type: 'XLSX', size: '450 KB' },
    ],
  },
  {
    id: 'notice-2',
    priority: 'important',
    isNew: true,
    title: 'Thay đổi thời gian khám bệnh định kỳ năm 2025',
    tags: ['Sức khỏe', 'Phúc lợi'],
    description: 'Công ty thông báo lịch khám sức khỏe định kỳ năm 2025 đã được thay đổi từ tháng 12 sang tháng 1/2026. Toàn bộ nhân viên vui lòng sắp xếp thời gian phù hợp...',
    fullContent: 'Công ty thông báo lịch khám sức khỏe định kỳ năm 2025 đã được thay đổi từ tháng 12 sang tháng 1/2026 để phù hợp hơn với lịch hoạt động cuối năm của công ty. Toàn bộ nhân viên vui lòng sắp xếp thời gian và đăng ký lịch khám chi tiết với phòng nhân sự trước ngày 30/11/2025.',
    date: '12/11/2025',
    author: { avatar: 'HR', name: 'Trần Thị B', role: 'HR Director' },
    attachments: [
        { name: 'Health_Checkup_Schedule.pdf', type: 'PDF', size: '800 KB' },
    ],
  },
  {
    id: 'notice-3',
    priority: 'info',
    title: 'Hướng dẫn sử dụng hệ thống quản lý bán hàng mới',
    tags: ['Hệ thống', 'Hướng dẫn', 'Bán hàng'],
    description: 'Từ ngày 20/11/2025, công ty sẽ chính thức áp dụng hệ thống quản lý bán hàng mới với nhiều tính năng cải tiến. Vui lòng xem video hướng dẫn và tài liệu đính kèm...',
    fullContent: 'Từ ngày 20/11/2025, công ty sẽ chính thức áp dụng hệ thống quản lý bán hàng mới với nhiều tính năng cải tiến. Hệ thống mới sẽ giúp tối ưu hóa quy trình bán hàng, quản lý khách hàng và báo cáo doanh thu. Vui lòng xem video hướng dẫn và tài liệu đính kèm để nắm rõ cách sử dụng.',
    date: '10/11/2025',
    author: { avatar: 'IT', name: 'Lê Văn C', role: 'CTO' },
    attachments: [
        { name: 'User_Guide_v2.pdf', type: 'PDF', size: '4.5 MB' },
        { name: 'FAQ_System.docx', type: 'DOCX', size: '120 KB' },
    ]
  },
  {
    id: 'notice-4',
    priority: 'update',
    title: 'Cập nhật chính sách làm việc từ xa (Remote Work)',
    tags: ['Chính sách', 'Remote'],
    description: 'Ban Lãnh Đạo thông báo cập nhật chính sách làm việc từ xa với quy định mới: nhân viên có thể làm remote 2 ngày/tuần thay vì 1 ngày/tuần như trước đây...',
    date: '08/11/2025',
    author: { avatar: 'COO', name: 'Phạm Thị D', role: 'COO' },
  },
  {
    id: 'notice-5',
    priority: 'critical',
    title: 'Bảo trì hệ thống ngày 18/11/2025 - Ngừng hoạt động 4 giờ',
    tags: ['Bảo trì', 'Hệ thống'],
    description: 'Hệ thống sẽ ngừng hoạt động từ 00:00 - 04:00 ngày 18/11/2025 để thực hiện bảo trì định kỳ. Vui lòng hoàn tất công việc trước thời gian này...',
    date: '07/11/2025',
    author: { avatar: 'IT', name: 'Lê Văn C', role: 'CTO' },
    attachments: [
        { name: 'Maintenance_Plan.pdf', type: 'PDF', size: '200 KB' },
    ],
  },
  {
    id: 'notice-6',
    priority: 'info',
    title: 'Lịch nghỉ Tết Nguyên Đán 2026',
    tags: ['Nghỉ lễ', 'Tết'],
    description: 'Công ty thông báo lịch nghỉ Tết Nguyên Đán 2026 từ ngày 26/01 đến 03/02/2026 (9 ngày). Nhân viên làm việc trong dịp Tết sẽ được hưởng lương x3 theo quy định...',
    date: '05/11/2025',
    author: { avatar: 'HR', name: 'Trần Thị B', role: 'HR Director' },
  },
];
