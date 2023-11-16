/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useState } from 'react';
import { useFunctions, useUser } from 'reactfire';
import { Button } from '@utahdts/utah-design-system';
import { Link } from 'react-router-dom';
import { httpsCallable } from 'firebase/functions';
import { useMutation } from '@tanstack/react-query';
import { Input } from '../formElements/Inputs.jsx';
import { registrationSchema } from '../../helpers/schema.mjs';
import ErrorMessageTag from './ErrorMessage.jsx';
import pageUrls from '../../enums/pageUrls';

function Registration() {
  const { data } = useUser();
  const functions = useFunctions();

  const createTrimbleUser = httpsCallable(functions, 'createTrimbleUser');
  // const createUser = async ({ email, password, name, price }) => {
  //   const response = await createTrimbleUser({
  //     organization: 'agrc',
  //     username: 'chwardle3',
  //     password: 'test',
  //     email: 'chwardle@utah.gov',
  //   });
  //   return response;
  // };

  const defaultValues = {
    organization: 'agrc',
    stateCode: 'UT',
    username: '',
    password: '',
  };

  /* eslint-disable no-unused-vars */
  const mutation = useMutation({
    mutationFn: (payload) => createTrimbleUser(payload),
    onMutate: (variables) => ({ id: 1 }),
    onError: (error, variables, context) => {
      // eslint-disable-next-line no-console
      console.log(`rolling back optimistic update with id ${context.id}`);
    },
    onSuccess: (successData, variables, context) => {
      // Boom baby!
      // eslint-disable-next-line no-console
      console.log(`success ${variables}`);
    },
    onSettled: (settledData, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  const [state, setState] = useState();

  useEffect(
    () => {
      setState(state);
    },
    []
  );

  const {
    formState, register, handleSubmit, setFocus,
  } = useForm({
    resolver: yupResolver(registrationSchema),
    defaultValues,
  });

  const onSubmit = (payload) => {
    // eslint-disable-next-line no-console
    console.log('payload', payload);
    // mutation.mutate(payload);
  };

  useEffect(() => {
    setFocus('organization');
  }, [setFocus]);

  // eslint-disable-next-line no-console
  console.log('data', data);

  return (
    <div>
      <div className="home-banner">
        <div className="home-banner__title">TURN<br />GPS</div>
      </div>
      <div className="content-width">
        <h1 className="my-spacing-l text-center">TurnGPS Registration</h1>

        <p className="lead-in">
          Registration and use of the service is contingent on accepting the Terms and Conditions.
        </p>
        <form
          className="form form--stacked"
        >
          <Input
            label="Organization"
            required
            {...register('organization')}
          />

          <ErrorMessage
            errors={formState.errors}
            name="organization"
            as={ErrorMessageTag}
          />
          <Input
            label="Username"
            required
            {...register('username')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="username"
            as={ErrorMessageTag}
          />
          <Input
            label="Password"
            type="password"
            required
            {...register('password')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="password"
            as={ErrorMessageTag}
          />
          <Input
            label="Confirm Password"
            type="password"
            required
            {...register('confirmPassword')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="confirmPassword"
            as={ErrorMessageTag}
          />
          <Input
            label="First Name"
            required
            {...register('firstName')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="firstName"
            as={ErrorMessageTag}
          />
          <Input
            label="Last Name"
            required
            {...register('lastName')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="lastName"
            as={ErrorMessageTag}
          />
          <Input
            label="Email"
            required
            {...register('email')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="email"
            as={ErrorMessageTag}
          />
          <Input
            label="Additional Email"
            {...register('additionalEmail')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="additionalEmail"
            as={ErrorMessageTag}
          />
          <Input
            label="Address 1"
            required
            {...register('address1')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="address1"
            as={ErrorMessageTag}
          />
          <Input
            label="Address 2"
            {...register('address2')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="address2"
            as={ErrorMessageTag}
          />
          <Input
            label="City"
            required
            {...register('city')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="city"
            as={ErrorMessageTag}
          />

          <Input
            label="State"
            required
            {...register('stateCode')}
          />

          <Input
            label="Zip Code"
            required
            {...register('zipCode')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="zipCode"
            as={ErrorMessageTag}
          />
          <Input
            label="Phone Number"
            required
            {...register('phoneNumber')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="phoneNumber"
            as={ErrorMessageTag}
          />
          <div className="flex">
            <Link to={pageUrls.termsAndConditions} className="button button--primary-color button--solid" style={{ display: 'inline-flex' }}>
              <span className="button--icon button--icon-left"><span className="utds-icon-before-arrow-left" aria-hidden="true" style={{ fontSize: '.9rem' }} /></span>
              Back
            </Link>

            <Button
              appearance="outlined"
              color="primary"
              type="submit"
              onClick={handleSubmit((valid) => {
                // eslint-disable-next-line no-console
                console.log('valid', valid);
                }, (invalid) => {
                // eslint-disable-next-line no-console
                console.log('invalid', invalid);
                })}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Registration.propTypes = propTypes;
// Registration.defaultProps = defaultProps;

export default Registration;
