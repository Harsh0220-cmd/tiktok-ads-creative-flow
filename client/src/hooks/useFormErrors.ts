import { useState } from "react";

type Errors<T> = Partial<Record<keyof T, string>>;

export function useFormErrors<T>() {
  const [errors, setErrors] = useState<Errors<T>>({});

  function setFieldError<K extends keyof T>(field: K, message: string) {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  }

  function clearFieldError<K extends keyof T>(field: K) {
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  }

  function setMultipleErrors(newErrors: Errors<T>) {
    setErrors(newErrors);
  }

  function clearAllErrors() {
    setErrors({});
  }

  function hasErrors() {
    return Object.keys(errors).length > 0;
  }

  return {
    errors,
    setFieldError,
    clearFieldError,
    setMultipleErrors,
    clearAllErrors,
    hasErrors,
  };
}
