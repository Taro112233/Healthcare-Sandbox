// types/request.ts
// HealthTech Sandbox - Request Type Definitions

// ===== ENUMS =====

export enum RequestType {
  CALCULATOR = 'CALCULATOR',
  FORM = 'FORM',
  WORKFLOW = 'WORKFLOW',
  DECISION_AID = 'DECISION_AID',
  OTHER = 'OTHER',
}

export enum RequestStatus {
  PENDING_REVIEW = 'PENDING_REVIEW',
  UNDER_CONSIDERATION = 'UNDER_CONSIDERATION',
  IN_DEVELOPMENT = 'IN_DEVELOPMENT',
  IN_TESTING = 'IN_TESTING',
  COMPLETED = 'COMPLETED',
  BEYOND_CAPACITY = 'BEYOND_CAPACITY',
}

// ===== STATUS DISPLAY INFO =====

export const REQUEST_STATUS_INFO: Record<RequestStatus, {
  label: string;
  labelTh: string;
  color: string;
  bgColor: string;
  textColor: string;
}> = {
  [RequestStatus.PENDING_REVIEW]: {
    label: 'Pending Review',
    labelTh: 'รอตรวจสอบ',
    color: 'bg-yellow-500',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
  },
  [RequestStatus.UNDER_CONSIDERATION]: {
    label: 'Under Consideration',
    labelTh: 'อยู่ในการพิจารณา',
    color: 'bg-blue-500',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
  },
  [RequestStatus.IN_DEVELOPMENT]: {
    label: 'In Development',
    labelTh: 'อยู่ในการพัฒนา',
    color: 'bg-purple-500',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800',
  },
  [RequestStatus.IN_TESTING]: {
    label: 'In Testing',
    labelTh: 'อยู่ในการทดสอบ',
    color: 'bg-orange-500',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-800',
  },
  [RequestStatus.COMPLETED]: {
    label: 'Completed',
    labelTh: 'สำเร็จ',
    color: 'bg-green-500',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
  },
  [RequestStatus.BEYOND_CAPACITY]: {
    label: 'Beyond Capacity',
    labelTh: 'เกินความสามารถ',
    color: 'bg-gray-500',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800',
  },
};

export const REQUEST_TYPE_INFO: Record<RequestType, {
  label: string;
  labelTh: string;
  icon: string;
  description: string;
}> = {
  [RequestType.CALCULATOR]: {
    label: 'Calculator',
    labelTh: 'เครื่องคำนวณ',
    icon: 'Calculator',
    description: 'เครื่องคำนวณทางการแพทย์ เช่น BMI, Drug Dosing, Risk Score',
  },
  [RequestType.FORM]: {
    label: 'Form',
    labelTh: 'แบบฟอร์ม',
    icon: 'FileText',
    description: 'แบบฟอร์มบันทึกข้อมูล, Checklist, Assessment Form',
  },
  [RequestType.WORKFLOW]: {
    label: 'Workflow',
    labelTh: 'ระบบจัดการงาน',
    icon: 'GitBranch',
    description: 'ระบบจัดการขั้นตอนการทำงาน, Process Automation',
  },
  [RequestType.DECISION_AID]: {
    label: 'Decision Aid',
    labelTh: 'ช่วยตัดสินใจ',
    icon: 'Brain',
    description: 'เครื่องมือช่วยตัดสินใจทางคลินิก, Clinical Decision Support',
  },
  [RequestType.OTHER]: {
    label: 'Other',
    labelTh: 'อื่นๆ',
    icon: 'HelpCircle',
    description: 'คำขออื่นๆ ที่ไม่เข้าหมวดหมู่ข้างต้น',
  },
};

// ===== INTERFACES =====

export interface Attachment {
  id: string;
  requestId: string;
  filename: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  uploadedAt: Date;
}

export interface StatusHistory {
  id: string;
  requestId: string;
  fromStatus: RequestStatus;
  toStatus: RequestStatus;
  changedBy: string;
  note?: string | null;
  changedAt: Date;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface Request {
  id: string;
  userId: string;
  painPoint: string;
  currentWorkflow: string;
  expectedTechHelp: string;
  requestType: RequestType;
  status: RequestStatus;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations (optional - populated when needed)
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email?: string | null;
  };
  attachments?: Attachment[];
  comments?: Comment[];
  statusHistory?: StatusHistory[];
  _count?: {
    comments: number;
    attachments: number;
  };
}

// ===== FORM INTERFACES =====

export interface CreateRequestFormData {
  painPoint: string;
  currentWorkflow: string;
  expectedTechHelp: string;
  requestType: RequestType;
  attachments?: File[];
}

export interface UpdateStatusFormData {
  status: RequestStatus;
  note?: string;
}

// ===== API RESPONSE INTERFACES =====

export interface RequestListResponse {
  success: boolean;
  data: Request[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface RequestDetailResponse {
  success: boolean;
  data: Request;
}

export interface CreateRequestResponse {
  success: boolean;
  data: Request;
  message: string;
}

// ===== STATS INTERFACE =====

export interface RequestStats {
  total: number;
  pending: number;
  inDevelopment: number;
  completed: number;
  beyondCapacity: number;
  byType: Record<RequestType, number>;
}

// ===== HELPER FUNCTIONS =====

export function getStatusInfo(status: RequestStatus) {
  return REQUEST_STATUS_INFO[status] || REQUEST_STATUS_INFO[RequestStatus.PENDING_REVIEW];
}

export function getTypeInfo(type: RequestType) {
  return REQUEST_TYPE_INFO[type] || REQUEST_TYPE_INFO[RequestType.OTHER];
}

export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}