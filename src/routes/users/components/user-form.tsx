import { Models, removeNils } from '$shared';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface UserFormProps {
  user?: Models.User | null;
  userUpdated?: (user: Models.User) => void;
}

const defaultUser: Models.User = {
  id: undefined,
  name: '',
  username: '',
  email: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    geo: {
      lat: '',
      lng: '',
    },
  },
  phone: '',
  website: '',
  company: {
    name: '',
    catchPhrase: '',
    bs: '',
  },
};

export function UserForm({ user, userUpdated }: UserFormProps) {
  // const [userForm, setUser] = useState<Models.User>({ ...defaultUser });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Models.User>({
    defaultValues: { ...defaultUser, ...user },
  });

  const userForm = watch();

  console.log(watch()); // watch input value by passing the name of it

  /***/
  useEffect(() => {
    // setUser({ ...defaultUser, ...user }); // On input, update user in form
  }, [user]);

  /**
   * Reset form state
   * @returns
   */
  // const reset = () => setValue({ ...defaultUser });

  /**
   * Handle form submit
   * @param e
   */
  const onSubmit = (data: Models.User) => {
    userUpdated && userUpdated(removeNils(data));
    reset();
  };

  return (
    <div>
      {userForm?.id && (
        <a style={{ float: 'right' }} onClick={() => reset()}>
          Cancel
        </a>
      )}

      <h3>{userForm?.id ? 'Update User' : ' Create User'}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <label>Username</label>
          <br />
          <InputText {...register('name', { required: true })} />
          {errors.name && <span className="small red d-block">This field is required</span>}
        </p>
        <p>
          <label>Email</label>
          <br />
          <InputText {...register('email', { required: true })} />
          {errors.email && <span className="small red d-block">This field is required</span>}
        </p>

        <p className="mb-0">
          <Button type="submit">{userForm?.id ? 'Update User' : ' Create User'}</Button>
        </p>
      </form>
    </div>
  );
}
