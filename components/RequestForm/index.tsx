// components/RequestForm/index.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
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
  Calculator,
  FileText,
  GitBranch,
  Brain,
  HelpCircle,
  Building2,
  AlertCircle,
  Workflow,
  Lightbulb,
  Globe,
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
  policy?: string;
}

const typeIcons: Record<RequestType, React.ReactNode> = {
  PAGE: <Globe className="w-4 h-4" />,
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
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
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

    if (!acceptedPolicy) {
      newErrors.policy = 'กรุณายอมรับนโยบายการส่งคำขอก่อนส่งคำขอ';
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

  const handlePolicyChange = (checked: boolean) => {
    setAcceptedPolicy(checked);
    if (checked && errors.policy) {
      setErrors(prev => ({ ...prev, policy: undefined }));
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
            หน่วยงานของคุณ
          </CardTitle>
          <CardDescription>
            ระบุชื่อหน่วยงาน/แผนก ที่ต้องการเครื่องมือนี้
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="เช่น ห้องยานอก โรงพยาบาลสู่สวรรค์"
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className={errors.department ? 'border-alert-error-border' : ''}
            maxLength={200}
          />
          <div className="flex justify-between mt-1">
            {errors.department && (
              <p className="text-sm text-alert-error-text">{errors.department}</p>
            )}
            <p className="text-xs text-content-secondary ml-auto">
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
            <SelectTrigger className={errors.requestType ? 'border-alert-error-border' : ''}>
              <SelectValue placeholder="เลือกประเภทคำขอ" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(REQUEST_TYPE_VALUES).map(([key, value]) => (
                <SelectItem key={key} value={value}>
                  <div className="flex items-center gap-2">
                    {typeIcons[value]}
                    <span>{REQUEST_TYPE_INFO[value].labelTh}</span>
                    <span className="text-content-secondary text-xs">- {REQUEST_TYPE_INFO[value].description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.requestType && (
            <p className="text-sm text-alert-error-text mt-1">{errors.requestType}</p>
          )}
        </CardContent>
      </Card>

      {/* Pain Point Card */}
      <Card className="border-l-4 border-l-alert-error-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-alert-error-text flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Pain Point
          </CardTitle>
          <CardDescription>
            อธิบายปัญหาที่คุณพบในการทำงานปัจจุบัน
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          <RichTextEditor
            content={formData.painPoint}
            onChange={(content) => handleInputChange('painPoint', content)}
            disabled={isSubmitting}
          />
          {errors.painPoint && (
            <p className="text-sm text-alert-error-text">{errors.painPoint}</p>
          )}
        </CardContent>
      </Card>

      {/* Current Workflow Card */}
      <Card className="border-l-4 border-l-alert-info-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-alert-info-text flex items-center gap-2">
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
            disabled={isSubmitting}
          />
          {errors.currentWorkflow && (
            <p className="text-sm text-alert-error-text">{errors.currentWorkflow}</p>
          )}
        </CardContent>
      </Card>

      {/* Expected Tech Help Card */}
      <Card className="border-l-4 border-l-alert-success-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-alert-success-text flex items-center gap-2">
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
            disabled={isSubmitting}
          />
          {errors.expectedTechHelp && (
            <p className="text-sm text-alert-error-text">{errors.expectedTechHelp}</p>
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

      {/* Policy Checkbox */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Checkbox
                id="request-policy"
                checked={acceptedPolicy}
                onCheckedChange={handlePolicyChange}
                className={errors.policy ? "border-alert-error-border" : ""}
              />
              <Label
                htmlFor="request-policy"
                className="text-sm leading-relaxed cursor-pointer"
              >
                ฉันได้อ่านและยอมรับ{' '}
                <Link
                  href="/request-policy"
                  target="_blank"
                  className="text-interactive-primary hover:underline font-medium"
                >
                  นโยบายการส่งคำขอพัฒนาเครื่องมือ
                </Link>
              </Label>
            </div>
            
            {errors.policy && (
              <div className="flex items-center gap-2 text-alert-error-text text-sm ml-7">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.policy}</span>
              </div>
            )}
          </div>
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
          className="gradient-brand-semantic hover:opacity-90"
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