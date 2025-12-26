export type FormFieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "date"
  | "select"
  | "multiselect"
  | "textarea"
  | "checkbox"
  | "radio"
  | "file";
export type ValidationRuleType =
  | "required"
  | "email"
  | "min"
  | "max"
  | "pattern"
  | "custom";

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  options?: SelectOption[];
  validation?: ValidationRule[];
}

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface ValidationRule {
  type: ValidationRuleType;
  value?: unknown;
  message: string;
}

export interface FormState<T = unknown> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

export interface FormikHelpers<T> {
  setSubmitting: (isSubmitting: boolean) => void;
  setErrors: (errors: Record<keyof T, string>) => void;
  setFieldValue: (field: keyof T, value: unknown) => void;
  setFieldError: (field: keyof T, message: string) => void;
  setFieldTouched: (field: keyof T, isTouched: boolean) => void;
  resetForm: () => void;
}

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  deaprtment: string;
  jobTitle: string;
}

export interface FilterFormValues {
  searchTerm?: string;
  status?: string;
  category?: string;
  dateForm?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
