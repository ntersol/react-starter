import { ChangeEvent, FormEvent, useState } from 'react';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

/**
 * Custom hook for handling form state and submission.
 * @param {FormValues} initialValues - The initial values for the form fields.
 * @returns {object} - An object containing the form values, change handler, and submit handler.
 */
export function useForm(initialValues: FormValues, onSubmitFn: () => void) {
  const [values, setValues] = useState<FormValues>(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform form submission logic here, e.g., send data to server
    console.log('Form submitted with values:', values);
  };

  return {
    values,
    handleChange,
    handleSubmit,
  };
}
