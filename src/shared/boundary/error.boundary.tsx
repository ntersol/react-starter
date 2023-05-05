import { Message } from 'primereact/message';
import { ReactNode, useEffect, useState } from 'react';

const useErrorBoundary = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const errorHandler = (error: ErrorEvent): void => {
      console.error(error);
      setErrorMessage(error.message);
    };

    window.addEventListener('error', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  return errorMessage;
};

export const ErrorBoundary = ({ children }: { children: ReactNode }) => {
  const errorMessage = useErrorBoundary();

  if (errorMessage) {
    // Render your custom error UI here
    return (
      <div className="container mt-3">
        <Message
          severity="error"
          className="w-100 text-left p-4 pb-1"
          content={
            <div className="w-100 text-left">
              <p>
                <strong>We're sorry, an error has occured. Please refresh this page or try again later.</strong>
              </p>
              <hr />
              <p> {errorMessage}</p>
            </div>
          }
        />
      </div>
    );
  }

  return <>{children}</>;
};
