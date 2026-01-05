// components/RequestForm/index.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileUploadSection } from './FileUploadSection';
import { RichTextEditor } from '@/components/RichTextEditor';
import { 
  RequestType, 
  REQUEST_TYPE_INFO,
  REQUEST_TYPE_VALUES,
} from '@/types/request';
import { 
  Send, 
  Loader2, 
  AlertTriangle,
  Info,
  Calculator,
  FileText,
  GitBranch,
  Brain,
  HelpCircle,
  Building2,
  AlertCircle,
  Workflow,
  Lightbulb,
} from 'lucide-react';
import { toast } from 'sonner';

interface UploadedFile {
  filename: string;
  originalFilename: string;
  fileType: string;
  fileSize: number;
  fileSizeFormatted: string;
  fileUrl: string;
}

interface FormData {
  department: string;
  painPoint: string;
  currentWorkflow: string;
  expectedTechHelp: string;
  requestType: RequestType | '';
}

interface FormErrors {
  department?: string;
  painPoint?: string;
  currentWorkflow?: string;
  expectedTechHelp?: string;
  requestType?: string;
}

const typeIcons: Record<RequestType, React.ReactNode> = {
  CALCULATOR: <Calculator className="w-4 h-4" />,
  FORM: <FileText className="w-4 h-4" />,
  WORKFLOW: <GitBranch className="w-4 h-4" />,
  DECISION_AID: <Brain className="w-4 h-4" />,
  OTHER: <HelpCircle className="w-4 h-4" />,
};

export function RequestForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    department: '',
    painPoint: '',
    currentWorkflow: '',
    expectedTechHelp: '',
    requestType: '',
  });
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.department || formData.department.trim().length < 1) {
      newErrors.department = 'กรุณาระบุหน่วยงานที่ขอ';
    }

    if (!formData.painPoint || formData.painPoint.length < 10) {
      newErrors.painPoint = 'กรุณาอธิบาย Pain Point อย่างน้อย 10 ตัวอักษร';
    }

    if (!formData.currentWorkflow || formData.currentWorkflow.length < 10) {
      newErrors.currentWorkflow = 'กรุณาอธิบายขั้นตอนการทำงานอย่างน้อย 10 ตัวอักษร';
    }

    if (!formData.expectedTechHelp || formData.expectedTechHelp.length < 10) {
      newErrors.expectedTechHelp = 'กรุณาอธิบายสิ่งที่ต้องการอย่างน้อย 10 ตัวอักษร';
    }

    if (!formData.requestType) {
      newErrors.requestType = 'กรุณาเลือกประเภทคำขอ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFilesUploaded = (files: UploadedFile[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleFileRemove = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        department: formData.department.trim(),
        painPoint: formData.painPoint.trim(),
        currentWorkflow: formData.currentWorkflow.trim(),
        expectedTechHelp: formData.expectedTechHelp.trim(),
        requestType: formData.requestType,
        attachmentUrls: uploadedFiles.map(file => ({
          filename: file.filename,
          fileType: file.fileType,
          fileSize: file.fileSize,
          fileUrl: file.fileUrl,
        })),
      };

      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'ส่งคำขอไม่สำเร็จ');
      }

      if (data.success) {
        toast.success('ส่งคำขอสำเร็จ!', {
          description: 'คำขอของคุณถูกส่งเรียบร้อยแล้ว',
        });
        
        router.push(`/requests/${data.data.id}`);
      } else {
        throw new Error(data.error || 'ส่งคำขอไม่สำเร็จ');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'เกิดข้อผิดพลาด';
      setSubmitError(errorMsg);
      toast.error('เกิดข้อผิดพลาด', {
        description: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      

      {/* Department Input */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            หน่วยงานที่ขอ
          </CardTitle>
          <CardDescription>
            ระบุชื่อหน่วยงาน/แผนก ที่ต้องการเครื่องมือนี้
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="เช่น ห้องฉุกเฉิน, OPD อายุรกรรม, หอผู้ป่วยศัลยกรรม, ห้องยา"
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className={errors.department ? 'border-red-500' : ''}
            maxLength={200}
          />
          <div className="flex justify-between mt-1">
            {errors.department && (
              <p className="text-sm text-red-500">{errors.department}</p>
            )}
            <p className="text-xs text-muted-foreground ml-auto">
              {formData.department.length} / 200
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Request Type */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">ประเภทคำขอ</CardTitle>
          <CardDescription>
            เลือกประเภทเครื่องมือที่คุณต้องการ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            value={formData.requestType}
            onValueChange={(value) => handleInputChange('requestType', value)}
          >
            <SelectTrigger className={errors.requestType ? 'border-red-500' : ''}>
              <SelectValue placeholder="เลือกประเภทคำขอ" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(REQUEST_TYPE_VALUES).map(([key, value]) => (
                <SelectItem key={key} value={value}>
                  <div className="flex items-center gap-2">
                    {typeIcons[value]}
                    <span>{REQUEST_TYPE_INFO[value].labelTh}</span>
                    <span className="text-muted-foreground text-xs">- {REQUEST_TYPE_INFO[value].description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.requestType && (
            <p className="text-sm text-red-500 mt-1">{errors.requestType}</p>
          )}
        </CardContent>
      </Card>

      {/* Pain Point Card - สีแดง */}
      <Card className="border-l-4 border-l-red-500 dark:border-l-red-400">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Pain Point หน้างาน
          </CardTitle>
          <CardDescription>
            อธิบายปัญหาที่คุณพบในการทำงานปัจจุบัน (รองรับการจัดรูปแบบข้อความ)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          <RichTextEditor
            content={formData.painPoint}
            onChange={(content) => handleInputChange('painPoint', content)}
            placeholder="เช่น ต้องคำนวณ dose ยาด้วยมือทุกครั้ง ซึ่งใช้เวลานานและเสี่ยงต่อการผิดพลาด..."
            disabled={isSubmitting}
          />
          {errors.painPoint && (
            <p className="text-sm text-red-500">{errors.painPoint}</p>
          )}
        </CardContent>
      </Card>

      {/* Current Workflow Card - สีน้ำเงิน */}
      <Card className="border-l-4 border-l-blue-500 dark:border-l-blue-400">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
            <Workflow className="w-5 h-5" />
            ขั้นตอนการทำงานปัจจุบัน
          </CardTitle>
          <CardDescription>
            อธิบายว่าปัจจุบันคุณทำงานอย่างไร (Step by step)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          <RichTextEditor
            content={formData.currentWorkflow}
            onChange={(content) => handleInputChange('currentWorkflow', content)}
            placeholder="เช่น 1. ดูน้ำหนักผู้ป่วยจาก chart 2. หาสูตรคำนวณจากหนังสือ 3. คำนวณด้วยเครื่องคิดเลข..."
            disabled={isSubmitting}
          />
          {errors.currentWorkflow && (
            <p className="text-sm text-red-500">{errors.currentWorkflow}</p>
          )}
        </CardContent>
      </Card>

      {/* Expected Tech Help Card - สีเขียว */}
      <Card className="border-l-4 border-l-green-500 dark:border-l-green-400">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-green-700 dark:text-green-400 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            สิ่งที่ต้องการให้ Tech ช่วย
          </CardTitle>
          <CardDescription>
            อธิบายว่าคุณอยากได้เครื่องมืออะไร หรืออยากให้ช่วยอะไร
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          <RichTextEditor
            content={formData.expectedTechHelp}
            onChange={(content) => handleInputChange('expectedTechHelp', content)}
            placeholder="เช่น อยากได้เครื่องคำนวณที่ใส่น้ำหนักแล้วแสดง dose ทันที รองรับยาหลายชนิด..."
            disabled={isSubmitting}
          />
          {errors.expectedTechHelp && (
            <p className="text-sm text-red-500">{errors.expectedTechHelp}</p>
          )}
        </CardContent>
      </Card>

      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">ไฟล์แนบ (ไม่บังคับ)</CardTitle>
          <CardDescription>
            แนบรูปภาพหรือเอกสารเพิ่มเติมเพื่ออธิบายปัญหาให้ชัดเจนขึ้น
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FileUploadSection
            uploadedFiles={uploadedFiles}
            onFilesUploaded={handleFilesUploaded}
            onFileRemove={handleFileRemove}
            disabled={isSubmitting}
          />
        </CardContent>
      </Card>

      {submitError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )} 
      {/* Submit Buttons */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          ยกเลิก
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-teal-600 hover:bg-teal-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              กำลังส่ง...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              ส่งคำขอ
            </>
          )}
        </Button>
      </div>
    </form>
  );
}