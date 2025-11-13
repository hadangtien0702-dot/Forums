
export type NoticePriority = 'critical' | 'important' | 'update' | 'info';

export interface NoticeAttachment {
  name: string;
  type: 'PDF' | 'DOCX' | 'XLSX' | 'IMAGE';
  size: string;
}

export interface Notice {
  id: number;
  title: string;
  date: string;
  content: string;
  priority: NoticePriority;
  image?: string; // Optional image URL
  attachments?: NoticeAttachment[]; // Optional array of attachments
}

export const notices: Notice[] = [
  {
    id: 1,
    title: 'System Maintenance Downtime Scheduled',
    date: 'June 28, 2024',
    content: 'Please be advised that our main CRM system will be offline for scheduled maintenance on Sunday, June 30, from 2:00 AM to 4:00 AM EST. During this time, access to client records and policy information will be unavailable. We apologize for any inconvenience. This update is crucial for enhancing system security and performance.',
    priority: 'critical',
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Updated Underwriting Guidelines for LifePlus Policy',
    date: 'June 27, 2024',
    content: 'The underwriting guidelines for the LifePlus policy series have been updated, effective July 1, 2024. Please review the new documentation in the Resource Hub before submitting new applications. Key changes include revised income verification requirements and updated health classifications.',
    priority: 'update',
    attachments: [
      { name: 'Underwriting_Guidelines_v3.pdf', type: 'PDF', size: '2.5 MB' },
      { name: 'Income_Verification_Form.docx', type: 'DOCX', size: '128 KB' }
    ]
  },
  {
    id: 3,
    title: 'Q3 Performance Review Schedule',
    date: 'June 25, 2024',
    content: 'The schedule for the Q3 performance reviews has been finalized. Managers will be reaching out to schedule individual meetings between July 15th and July 31st. Please prepare your self-assessment forms in advance. The master schedule is attached.',
    priority: 'info',
     attachments: [
        { name: 'Q3_Review_Schedule.xlsx', type: 'XLSX', size: '78 KB' }
    ]
  },
   {
    id: 4,
    title: 'New Training Module Available: Advanced Annuity Strategies',
    date: 'June 24, 2024',
    content: 'A new self-paced training module, "Advanced Annuity Strategies," is now available in the learning portal. Completion is recommended for all agents who wish to sell our new annuity products. This module covers product specifics, suitability, and sales techniques.',
    priority: 'info',
  },
];