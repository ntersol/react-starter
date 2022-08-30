import { useState } from 'react'
import { useForm } from 'react-hook-form'
import style from './formValidation.module.css'

export default function FormValidation () {
  const [submitted, setSubmitted] = useState(false)
  const [submittedForm, setSubmittedForm] = useState({})
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    email: '',
    firstName: '',
    lastName: ''
  })

  const emailValid = /^.+@.+\..+$/ // Note, this a very simplified email pattern
  const nameValid = /^([^0-9]*)$/

  const onSubmit = (data) => {
    setSubmitted(true)
    setSubmittedForm(data)
  }
  const handleCancel = () => {
    reset()
    setSubmitted(false)
    setSubmittedForm({})
  }

  return (
    <div className={style.main}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Please enter your name and email</h1>
        <div className={style['name-requirement']}>Numbers not allowed in name fields</div>
        <div className={style.field}>
          <div className={style.label}>Email</div>
          <input {...register('email', { required: true, pattern: emailValid })} />
        </div>
        {errors.email?.type === 'required' && <div className={style.err}>This field is required</div>}
        {errors.email?.type === 'pattern' && <div className={style.err}>Please enter a valid email address</div>}
        <div className={style.field}>
          <div className={style.label}>First name</div>
          <input {...register('firstName', { required: true, pattern: nameValid })} />
        </div>
        {errors.firstName?.type === 'required' && <div className={style.err}>This field is required</div>}
        {errors.firstName?.type === 'pattern' && <div className={style.err}>Numbers are not allowed</div>}
        <div className={style.field}>
          <div className={style.label}>Last name</div>
          <input {...register('lastName', { required: true, pattern: nameValid })} />
        </div>
        {errors.lastName?.type === 'required' && <div className={style.err}>This field is required</div>}
        {errors.lastName?.type === 'pattern' && <div className={style.err}>Numbers are not allowed</div>}
        <input type='submit' />
        <button id={style.cancel} onClick={handleCancel}>Cancel</button>
        {/* Do not use watch() to grab values, as they will change as user types in the already-submitted form */}
        {submitted && (<div className={style.submitted}>
          <div>Submitted Name: {submittedForm.firstName} {submittedForm.lastName}</div>
          <div>Submitted Email: {submittedForm.email}</div>
        </div>
        )}
      </form>
    </div>
  )
}
