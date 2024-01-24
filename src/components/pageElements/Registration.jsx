/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useState } from 'react';
import { useFunctions, useUser } from 'reactfire';
import { Button, Spinner } from '@utahdts/utah-design-system';
import { Link, Navigate } from 'react-router-dom';
import { httpsCallable } from 'firebase/functions';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Input } from '../formElements/Inputs.jsx';
import { registrationSchema } from '../../helpers/schema.mjs';
import ErrorMessageTag from './ErrorMessage.jsx';
import pageUrls from '../../enums/pageUrls';
import useAppContext from '../../contexts/AppContext/useAppContext';
import InfoBanner from './InfoBanner';

function Registration() {
  const { appState: { hasTermsConditionsAgreed } } = useAppContext();
  const { data: user } = useUser();
  const functions = useFunctions();
  const createTrimbleUser = httpsCallable(functions, 'createTrimbleUser');
  const getProfile = httpsCallable(functions, 'getProfile');

  const [state, setState] = useState();
  const [busy, setBusy] = useState(false);

  const uid = user?.uid;
  const isUserAvailable = uid?.length > 0;
  const { data: defaultValues, status: profileStatus } = useQuery({
    queryKey: ['profile', uid],
    enabled: isUserAvailable,
    queryFn: getProfile,
    staleTime: Infinity,
  });

  /* eslint-disable no-unused-vars */
  const mutation = useMutation({
    mutationFn: (payload) => createTrimbleUser(payload),
    onError: (error, variables, context) => {
      // eslint-disable-next-line no-console
      console.error(`rolling back optimistic update with id ${context.id}`);
    },
    onSuccess: (successData, variables, context) => {
      // Boom baby!
    },
    onSettled: (settledData, error, variables, context) => {
      // Error or success... doesn't matter!
      setBusy(false);
    },
  });

  useEffect(
    () => {
      setState(state);
    },
    []
  );

  const {
    formState, register, handleSubmit, setFocus, reset,
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  useEffect(() => {
    if (profileStatus === 'success') {
      reset(defaultValues?.data);
    }
  }, [profileStatus, defaultValues]);

  const onSubmit = (payload) => {
    setBusy(true);
    mutation.mutate(payload);
  };

  useEffect(() => {
    setFocus('organization');
  }, [setFocus]);

  return (
  hasTermsConditionsAgreed
    ? (
      <div className="landing-page-template mb-spacing-xl">
        <div className="home-banner">
          <div className="banner-layer-right" />
          <div className="banner-layer-left">
            <div className="home-banner__title">TURN<br />GPS</div>
          </div>
        </div>
        <div className="content-width">
          <h1 className="my-spacing-l text-center">Registration</h1>

          <p className="lead-in text-center">
            Registration and use of the service is contingent on accepting the Terms and Conditions.
          </p>

          <InfoBanner />

          <form
            className="form form--stacked m-auto"
            id="registration"
          >
            <h4>Account</h4>
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

            <h4 className="mt-spacing-xl">Personal Information</h4>
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

            <h4 className="mt-spacing-xl">Contact Information</h4>
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
            <div className="flex gap-l justify-center mt-spacing-xl">
              <Link to={pageUrls.home} className="button button--primary-color button--solid" style={{ display: 'inline-flex' }}>
                <span className="button--icon button--icon-left">
                  <span className="utds-icon-before-arrow-left" aria-hidden="true" style={{ fontSize: '.9rem' }} />
                </span>{' '}
                Back
              </Link>

              <Button
                appearance="outlined"
                color="primary"
                type="submit"
                isDisabled={!isUserAvailable}
                onClick={handleSubmit((valid) => {
                  onSubmit(valid);
                }, (invalid) => {
                  // invalid
                })}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
        {busy && <Spinner id="spinner-registration-id" className="spinner spinner--indeterminate fullscreen" />}
      </div>
    )
    : <Navigate to={pageUrls.home} />
  );
}

export default Registration;
