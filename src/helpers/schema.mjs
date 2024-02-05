import * as yup from 'yup';
import 'yup-phone-lite';
import { checkUsernameUnique } from './gql.js';

export const registrationSchema = (idToken) => yup.object().shape({
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
    .label('Username')
    .test(
      'checkUsernameUnique',
      'This username is already registered.',
      (value, context) => checkUsernameUnique(idToken, context.parent.organization, value)
    ),
  password: yup
    .string()
    .required('Password is a required field.')
    .max(250)
    .label('password'),
  confirmPassword: yup
    .string()
    .max(250)
    .oneOf([yup.ref('password'), null], 'Passwords must match.')
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
    .email()
    .required('Email is a required field.')
    .typeError('Email is a required field.')
    .max(250)
    .label('email'),
  additionalEmail: yup
    .string()
    .email()
    .notRequired()
    .nullable()
    .optional()
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
  stateCode: yup
    .string()
    .required('State is a required field.')
    .typeError('State is a required field.')
    .max(250)
    .label('stateCode'),
  zipCode: yup
    .number()
    .required('Zip Code is a required field.')
    .typeError('Zip Code is a required field.')
    .label('zipCode'),
  phoneNumber: yup
    .string()
    .phone('US', 'Please enter a valid phone number.')
    .required('A phone number is required.'),
});
