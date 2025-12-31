export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (
  password: string
): "weak" | "medium" | "strong" => {
  if (password.length < 6) {
    return "weak";
  }

  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;

  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;

  if (/\d/.test(password)) strength++;

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

  if (strength <= 2) return "weak";
  if (strength <= 4) return "medium";
  return "strong";
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isNumeric = (value: string): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(Number(value));
};

export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

export const isRequired = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

export const hasMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

export const isAlphanumeric = (value: string): boolean => {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  return alphanumericRegex.test(value);
};

export const isValidDateFormat = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;

  const parseDate = new Date(date);
  return !isNaN(parseDate.getTime());
};

export const isFutureDate = (date: Date | string): boolean => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d > new Date();
};

export const isPastDate = (date: Date | string): boolean => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d < new Date();
};

export const isValidCreditCard = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\D/g, "");

  if (cleaned.length < 13 || cleaned.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

export const isValidFileType = (
  fileName: string,
  allowTypes: string[]
): boolean => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  return extension ? allowTypes.includes(extension) : false;
};

export const isValidFileSize = (fileSize: number, maxSize: number): boolean => {
  return fileSize <= maxSize;
};
