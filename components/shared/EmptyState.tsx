// components/shared/EmptyState.tsx
// HealthTech Sandbox - Empty State Component

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion, Plus } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  // Action as object (legacy)
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  // Action as individual props
  actionLabel?: string;
  actionHref?: string;
  actionOnClick?: () => void;
}

export function EmptyState({ 
  title, 
  description, 
  icon,
  action,
  actionLabel,
  actionHref,
  actionOnClick,
}: EmptyStateProps) {
  // Merge action props (individual props take precedence)
  const resolvedAction = actionLabel ? {
    label: actionLabel,
    href: actionHref,
    onClick: actionOnClick,
  } : action;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-4">
        {icon || <FileQuestion className="w-16 h-16 text-gray-400" />}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 max-w-md mb-6">{description}</p>
      )}
      {resolvedAction && (
        resolvedAction.href ? (
          <Link href={resolvedAction.href}>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="w-4 h-4 mr-2" />
              {resolvedAction.label}
            </Button>
          </Link>
        ) : resolvedAction.onClick ? (
          <Button 
            onClick={resolvedAction.onClick}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            {resolvedAction.label}
          </Button>
        ) : null
      )}
    </div>
  );
}