import { useAuth, useStorage } from '$shared';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { FormEvent, useEffect, useState } from 'react';

import { FaPowerOff, FaUsers } from 'react-icons/fa';

export default function LoginPage() {
  const { error, loggedOutReason, waiting, login } = useAuth();
  const [userName, setUserName] = useState('juser');
  const [password, setPassword] = useState('password-' + Math.floor(Math.random() * 1000000000) + 'dltrjew');
  const [remember, setRemember] = useState(false);

  const { getItem, setItem, removeItem } = useStorage();

  useEffect(() => {
    const username = getItem('savedUserName');
    if (username) {
      setUserName(username);
      setRemember(true);
    }
  }, []);

  /**
   * Submit the login form
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (remember) {
      setItem('savedUserName', userName || null);
    } else {
      removeItem('savedUserName');
    }

    login(userName, password).then(
      () => {},
      (error: any) => {
        error.errorMsg = 'Error logging in.';
        if (error.statusText === 'Unauthorized') {
          error.errorMsg = 'Invalid username or password, please try again.';
        }
      },
    );
  };

  return (
    <div className="container mt-5">
      <div className="m-auto" style={{ maxWidth: '480px' }}>
        <h1>
          <FaUsers /> Please sign in
        </h1>
        <Card>
          <form onSubmit={handleSubmit}>
            {/* Logout and session expired messages */}
            {loggedOutReason === 'notLoggedIn' && <Message severity="warn" className="w-100 mb-3" text="Please log in to continue" />}
            {loggedOutReason === 'sessionExpired' && <Message severity="warn" className="w-100 mb-3" text="Session expired, please log in again" />}
            {loggedOutReason === 'userInitiated' && <Message severity="success" className="w-100 mb-3" text="You have successfully logged out" />}
            {/* Login failure */}
            {error && <Message severity="error" className="w-100 mb-3" text="Unable to log in, please check your username and password" />}

            <p className="mb-4">Please enter your username and password.</p>

            <div className="p-float-label mb-4">
              <InputText className="w-100" type="text" id="username" value={userName} onChange={event => setUserName(event.target.value)} />
              <label htmlFor="username">Username:</label>
            </div>

            <div className="p-float-label mb-4">
              <InputText className="w-100" type="password" id="password" value={password} onChange={event => setPassword(event.target.value)} />
              <label htmlFor="password">Password:</label>
            </div>

            <label className="form-check-label">
              <Checkbox className="form-check-input remember me-2" checked={remember} />
              Remember my username
            </label>

            <div className="text-end">
              <Button type="submit" className="btn btn-primary" disabled={waiting || !userName || !password}>
                <FaPowerOff className="me-2" /> Sign In
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
