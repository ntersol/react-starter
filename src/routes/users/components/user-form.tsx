import { Models, removeNils } from '$shared';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';

interface UserFormProps {
  user?: Models.User | null;
  userUpdated?: (user: Models.User) => void;
  userReset?: () => void;
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

export function UserForm({ user, userUpdated, userReset }: UserFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Models.User>({
    defaultValues: { ...defaultUser, ...user },
    values: user ?? undefined, // Update user in form if passed in by parent
  });

  const userForm = watch();

  // console.log(watch()); // watch input value by passing the name of it

  /**
   * Handle form submit
   * @param e
   */
  const onSubmit = (data: Models.User) => {
    userUpdated && userUpdated(removeNils(data));
    onReset();
  };

  const onReset = () => {
    reset({ ...defaultUser });
    userReset && userReset();
  };

  return (
    <div>
      {userForm?.id && (
        <button className="link" style={{ float: 'right' }} onClick={() => onReset()}>
          Cancel
        </button>
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
