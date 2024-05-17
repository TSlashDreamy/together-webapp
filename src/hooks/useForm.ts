import { ChangeEvent, FormEvent, useCallback, useState } from "react";

interface UseFormHook<T> {
  values: T;
  errors: { [K in keyof T]?: string };
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function useForm<T extends object>(
  initialValues: T,
  onSubmit: (values: T) => void,
  validate?: (values: T) => { [K in keyof T]?: string }
): UseFormHook<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<{ [K in keyof T]?: string }>({});

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (validate) {
        const validationErrors = validate(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
          onSubmit(values);
        }
      } else {
        onSubmit(values);
      }
    },
    [onSubmit, validate, values]
  );

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}

export default useForm;
