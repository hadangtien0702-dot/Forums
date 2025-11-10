// FIX: Import React to resolve 'Cannot find namespace React' error.
import React from 'react';

export interface UserDetail {
  label: string;
  value: string;
  icon: React.ReactNode;
  editable?: boolean;
  key?: string;
}
