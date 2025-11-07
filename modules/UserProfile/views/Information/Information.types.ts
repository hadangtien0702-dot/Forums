import type { UserDetail } from '../../UserProfile.types';

export interface InformationSectionProps {
  details: UserDetail[];
  isEditing: boolean;
  isSaving: boolean;
  showSuccess: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onInputChange: (key: string, value: string) => void;
}