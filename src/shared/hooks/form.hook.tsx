import { ChangeEvent, FormEvent, useState } from 'react';

interface UseFormProps<T> {
  initialValues: T;
  onSubmitFn: (values: T) => void;
}

/**
 * Custom hook for handling form state and submission.
 * @param {UseFormProps<T>} props - The hook props containing the initial values and submit function.
 * @returns {object} - An object containing the form values, change handler, and submit handler.
 * @example
 *
 * const { values, handleChange, handleSubmit } = useForm<FormValues>({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    onSubmitFn: (formValues) => {
      console.log('Form submitted with values:', formValues);
      // Perform form submission logic here, e.g., send data to server
    },
  });
 */
export function useForm<T>({ initialValues, onSubmitFn }: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitFn(values);
  };

  return {
    values,
    handleChange,
    handleSubmit,
  };
}
