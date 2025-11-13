
import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import type { Notice, NoticePriority, NoticeAttachment } from '../ImportantNotice.data';
import { AttachmentItem } from '../components';

const notices: Notice[] = [
  {
    id: 1,
    priority: 'critical',
    title: 'Thay đổi chính sách lãi suất bảo hiểm nhân thọ từ 15/11/2025',
    date: '13/11/2025',
    content: 'Kính gửi toàn thể nhân viên và đại lý bảo hiểm, Ban Lãnh Đạo thông báo về việc điều chỉnh lãi suất bảo hiểm nhân thọ có hiệu lực từ ngày 15/11/2025. Lãi suất mới sẽ tăng từ 4.5% lên 5.2% năm. Tất cả các hợp đồng mới sẽ áp dụng mức lãi suất này. Vui lòng cập nhật thông tin cho khách hàng và tham khảo tài liệu đính kèm để biết thêm chi tiết.',
    attachments: [
        { name: 'Policy_Change_Summary_Nov2025.pdf', type: 'PDF', size: '1.2 MB' },
        { name: 'New_Interest_Rate_Chart.xlsx', type: 'XLSX', size: '450 KB' },
    ],
  },
  {
    id: 2,
    priority: 'important',
    title: 'Thay đổi thời gian khám bệnh định kỳ năm 2025',
    date: '12/11/2025',
    content: 'Công ty thông báo lịch khám sức khỏe định kỳ năm 2025 đã được thay đổi từ tháng 12 sang tháng 1/2026 để phù hợp hơn với lịch hoạt động cuối năm của công ty. Toàn bộ nhân viên vui lòng sắp xếp thời gian và đăng ký lịch khám chi tiết với phòng nhân sự trước ngày 30/11/2025.',
    attachments: [
        { name: 'Health_Checkup_Schedule_2025-2026.pdf', type: 'PDF', size: '800 KB' },
    ],
  },
  {
    id: 3,
    priority: 'info',
    title: 'Hướng dẫn sử dụng hệ thống quản lý bán hàng mới',
    date: '10/11/2025',
    content: 'Từ ngày 20/11/2025, công ty sẽ chính thức áp dụng hệ thống quản lý bán hàng mới với nhiều tính năng cải tiến. Hệ thống mới sẽ giúp tối ưu hóa quy trình bán hàng, quản lý khách hàng và báo cáo doanh thu. Vui lòng xem video hướng dẫn và tài liệu đính kèm để nắm rõ cách sử dụng.',
     attachments: [
        { name: 'Sales_System_User_Guide.pdf', type: 'PDF', size: '4.5 MB' },
        { name: 'Walkthrough_Video_Link.docx', type: 'DOCX', size: '88 KB' },
        { name: 'FAQ_Sheet.docx', type: 'DOCX', size: '200 KB' },
    ],
  },
  {
    id: 4,
    priority: 'update',
    title: 'Cập nhật chính sách làm việc từ xa (Remote Work)',
    date: '08/11/2025',
    content: 'Ban Lãnh Đạo thông báo cập nhật chính sách làm việc từ xa với quy định mới: nhân viên có thể làm remote 2 ngày/tuần thay vì 1 ngày/tuần như trước đây. Chính sách mới này sẽ có hiệu lực từ ngày 01/12/2025 và áp dụng cho tất cả các phòng ban đủ điều kiện. Vui lòng liên hệ phòng nhân sự để biết thêm chi tiết.',
    attachments: [],
  },
    {
    id: 5,
    priority: 'critical',
    title: 'Bảo trì hệ thống ngày 18/11/2025 - Ngừng hoạt động 4 giờ',
    date: '07/11/2025',
    content: 'Để nâng cấp và đảm bảo hiệu suất, hệ thống sẽ ngừng hoạt động từ 00:00 - 04:00 ngày 18/11/2025 để thực hiện bảo trì định kỳ. Vui lòng lưu lại công việc và đăng xuất khỏi hệ thống trước thời gian này để tránh mất dữ liệu.',
    attachments: [
        { name: 'Maintenance_Schedule_Details.pdf', type: 'PDF', size: '300 KB' },
    ],
  },
  {
    id: 6,
    priority: 'info',
    title: 'Lịch nghỉ Tết Nguyên Đán 2026',
    date: '05/11/2025',
    content: 'Công ty thông báo lịch nghỉ Tết Nguyên Đán 2026 từ ngày 26/01 đến 03/02/2026 (9 ngày). Nhân viên làm việc trong dịp Tết sẽ được hưởng lương x3 theo quy định của Luật Lao động. Chúc toàn thể nhân viên có một kỳ nghỉ lễ vui vẻ và ấm áp bên gia đình.',
    attachments: [],
  },
];


const icons: Record<NoticePriority, React.ReactNode> = {
  critical: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  important: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  update: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  info: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

const priorityStyles: Record<NoticePriority, { bg: string; iconColor: string; ring: string }> = {
  critical: { bg: 'bg-red-500', iconColor: 'text-red-500', ring: 'ring-red-200' },
  important: { bg: 'bg-amber-500', iconColor: 'text-amber-600', ring: 'ring-amber-200' },
  update: { bg: 'bg-blue-500', iconColor: 'text-blue-600', ring: 'ring-blue-200' },
  info: { bg: 'bg-slate-500', iconColor: 'text-slate-600', ring: 'ring-slate-200' },
};

const NoticeTimelineItem: React.FC<{ notice: Notice }> = ({ notice }) => {
  const styles = priorityStyles[notice.priority];

  return (
    <Disclosure as="div" className="relative">
    {({ open }) => (
        <>
            {/* Timeline event marker */}
            <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 bg-white rounded-full ring-4 ring-white" style={{ marginLeft: '-17px' }}>
                <div className={`h-full w-full rounded-full flex items-center justify-center text-white ${styles.bg}`}>
                    {icons[notice.priority]}
                </div>
            </div>

            <div className="ml-10">
                <Disclosure.Button className="flex justify-between items-center w-full p-4 text-left rounded-xl bg-slate-50 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800">{notice.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{notice.date}</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`ml-4 h-5 w-5 text-slate-500 transform transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                </Disclosure.Button>
                 <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform -translate-y-2 opacity-0"
                    enterTo="transform translate-y-0 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform translate-y-0 opacity-100"
                    leaveTo="transform -translate-y-2 opacity-0"
                  >
                    <Disclosure.Panel className="mt-2 p-4 text-sm text-slate-600 bg-white rounded-xl shadow-inner-soft">
                        <p className="leading-relaxed whitespace-pre-line">{notice.content}</p>

                        {notice.image && (
                            <div className="mt-4">
                                <img src={notice.image} alt={notice.title} className="w-full max-w-md rounded-lg shadow-md" />
                            </div>
                        )}

                        {notice.attachments && notice.attachments.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-sm font-bold text-slate-800 mb-2">Attachments</h4>
                                <div className="space-y-2">
                                    {notice.attachments.map((att, index) => <AttachmentItem key={index} attachment={att} />)}
                                </div>
                            </div>
                        )}
                    </Disclosure.Panel>
                </Transition>
            </div>
         </>
      )}
    </Disclosure>
  );
};

const ImportantNoticeV3: React.FC = () => {
  return (
    <div className="relative p-4">
        {/* The timeline's vertical line */}
        <div className="absolute left-4 top-0 h-full w-0.5 bg-slate-200"></div>

        <div className="space-y-8">
            {notices.map((notice) => (
                <NoticeTimelineItem key={notice.id} notice={notice} />
            ))}
        </div>
        <style>{`.shadow-inner-soft { box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05); }`}</style>
    </div>
  );
};

export default ImportantNoticeV3;
