import * as yup from 'yup';

export const registrationSchema = yup.object().shape({
  organization: yup
    .string()
    .required('Organization is a required field.')
    .typeError('Organization is a required field.')
    .max(250)
    .label('Organization'),
  username: yup
    .string()
    .required('Username is a required field.')
    .typeError('Username is a required field.')
    .max(250)
    .label('Username'),
  password: yup
    .string()
    .notRequired()
    .max(250)
    .nullable()
    .optional()
    .label('password'),
  confirmPassword: yup
    .string()
    .notRequired()
    .max(250)
    .nullable()
    .optional()
    .label('confirmPassword'),
  firstName: yup
    .string()
    .required('First Name is a required field.')
    .typeError('First Name is a required field.')
    .max(250)
    .label('firstName'),
  lastName: yup
    .string()
    .required('Last Name is a required field.')
    .typeError('Last Name is a required field.')
    .max(250)
    .label('lastName'),
  email: yup
    .string()
    .required('Email is a required field.')
    .typeError('Email is a required field.')
    .max(250)
    .label('email'),
  address1: yup
    .string()
    .required('Address1 is a required field.')
    .typeError('Address1 is a required field.')
    .max(250)
    .label('address1'),
  address2: yup
    .string()
    .notRequired()
    .nullable()
    .optional()
    .label('address2'),
  city: yup
    .string()
    .required('City is a required field.')
    .typeError('City is a required field.')
    .max(250)
    .label('city'),
  state: yup
    .string()
    .required('State is a required field.')
    .typeError('State is a required field.')
    .max(250)
    .label('state'),
  zipCode: yup
    .number()
    .required('Zip Code is a required field.')
    .typeError('Zip Code is a required field.')
    .label('zipCode'),
});
