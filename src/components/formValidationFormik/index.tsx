import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import style from './formValidationFormik.module.css';
import { Models } from '../../shared';

export default function FormValidationFormik() {
  const [submitted, setSubmitted] = useState(false);
  const defaultValues: Models.IFormFields = {
    email: '',
    firstName: '',
    lastName: '',
  };
  const [submittedForm, setSubmittedForm] = useState(defaultValues);
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^([^0-9]*)$/, 'First name may not contain numbers')
        .required('Required'),
      lastName: Yup.string()
        .matches(/^([^0-9]*)$/, 'First name may not contain numbers')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: values => {
      setSubmitted(true);
      setSubmittedForm(values);
    },
  });
  const handleCancel = () => {
    formik.resetForm();
    formik.errors = {};
    setSubmitted(false);
    setSubmittedForm(defaultValues);
  };
  return (
    <div className={style.main}>
      <form onSubmit={formik.handleSubmit} onReset={handleCancel}>
        <h1>Please enter your name and email</h1>
        <div className={style['name-requirement']}>Numbers not allowed in name fields</div>
        <div className={style.field}>
          <div className={style.label}>First Name</div>
          <input id="firstName" type="text" {...formik.getFieldProps('firstName')} />
        </div>
        {formik.touched.firstName && formik.errors.firstName ? <div className={style.err}>{formik.errors.firstName}</div> : null}
        <div className={style.field}>
          <div className={style.label}>Last Name</div>
          <input id="lastName" type="text" {...formik.getFieldProps('lastName')} />
        </div>
        {formik.touched.lastName && formik.errors.lastName ? <div className={style.err}>{formik.errors.lastName}</div> : null}
        <div className={style.field}>
          <div className={style.label}>Email Address</div>
          <input id="email" type="email" {...formik.getFieldProps('email')} />
        </div>
        {formik.touched.email && formik.errors.email ? <div className={style.err}>{formik.errors.email}</div> : null}
        <input type="submit" />
        &nbsp;&nbsp;
        <input type="reset" />
        {submitted && (
          <div className={style.submitted}>
            <div>
              <strong>Submitted Values:</strong>
            </div>
            <div>
              Name: {submittedForm.firstName} {submittedForm.lastName}
            </div>
            <div>Email: {submittedForm.email}</div>
          </div>
        )}
      </form>
    </div>
  );
}
