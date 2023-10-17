import { useForm } from 'react-hook-form';
// import { httpsCallable } from 'firebase/functions';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import ErrorMessageTag from './ErrorMessage.jsx';
import { Input } from '../formElements/Inputs.jsx';
import { Select } from '../formElements/Select.jsx';
import {registrationSchema} from '../../helpers/schema.mjs';
import { useEffect, useState } from 'react';
import { useUser } from 'reactfire';
// eslint-disable-next-line no-unused-vars
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { request, gql } from 'graphql-request'
import { Button } from '@utahdts/utah-design-system';
import { Link } from 'react-router-dom';
import pageUrls from '../../enums/pageUrls';

const propTypes = {};
const defaultProps = {};

function Registration() {

  // const functions = useFunctions();
  const { data } = useUser();
  // const getRolesGraphql = httpsCallable(functions, 'graphQl');
  // const updateRegistration = httpsCallable(functions, 'functions-httpsPostProfile');

  // eslint-disable-next-line no-unused-vars
  const queryClient = useQueryClient();
  
  const endpoint = 'https://graphql-ueoh6v2sya-uc.a.run.app/';
  const getRoles = gql`
   query {
    getRoles {
      roleName
    }
  }
  `;

  const { data: response, status: registrationStatus } = useQuery({
    queryKey: ['roles', data.uid],
    enabled: data?.uid?.length > 0,
      queryFn: async () => {
        const {getRoles: retVal} = await request(endpoint,getRoles);
        return retVal;
      },
    staleTime: Infinity,
  });

  const defaultValues = {
    username: '',
    password: '',
  };
  // eslint-disable-next-line no-unused-vars
  const { formState, handleSubmit, register, reset, setFocus } =
    useForm({
      resolver: yupResolver(registrationSchema),
      defaultValues,
    });


  useEffect(() => {
    setFocus('organization');
  }, [setFocus]);

  // const { mutate, status } = useMutation({
  //   mutationKey: ['update profile', data.uid],
  //   mutationFn: (data) => updateRegistration(data),
  //   onSuccess: (response) => {
  //     reset(response.data);
  //     queryClient.invalidateQueries({ queryKey: ['registration', data.uid] });
  //   },
  //   onError: (error) => {
  //     console.warn('error', error);
  //     reset();
  //   },
  // });

  // useEffect(() => {
  //   if (registrationStatus === 'success') {
  //     reset(response.data);
  //   }
  // }, [registrationStatus, reset, response]);
  //
  // const onSubmit = (payload) => {
  //   mutate(payload);
  // };

  const stateList = [
    'Utah',
    'Nevada',
  ];
  const [selectedState, setSelectedState] = useState(stateList[0]);

  console.log('registrationStatus', registrationStatus);
  console.log('data', data);
  console.log('response', response);
  
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
        {/*<form onSubmit={handleSubmit(onSubmit)}>*/}
        <form>
          <Input
            label="Organization"
            required={true}
            {...register('organization')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="organization"
            as={ErrorMessageTag}
          />
          <Input
            label="Username"
            required={true}
            {...register('username')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="username"
            as={ErrorMessageTag}
          />
          <Input
            label="Password"
            required={true}
            {...register('password')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="password"
            as={ErrorMessageTag}
          />
          <Input
            label="Confirm Password"
            required={true}
            {...register('confirmPassword')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="confirmPassword"
            as={ErrorMessageTag}
          />
          <Input
            label="First Name"
            required={true}
            {...register('firstName')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="firstName"
            as={ErrorMessageTag}
          />
          <Input
            label="Last Name"
            required={true}
            {...register('lastName')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="lastName"
            as={ErrorMessageTag}
          />
          <Input
            label="Email"
            required={true}
            {...register('email')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="email"
            as={ErrorMessageTag}
          />
          <Input
            label="Address 1"
            required={true}
            {...register('address1')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="address1"
            as={ErrorMessageTag}
          />
          <Input
            label="Address 2"
            required={false}
            {...register('address2')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="address2"
            as={ErrorMessageTag}
          />
          <Input
            label="City"
            required={true}
            {...register('city')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="city"
            as={ErrorMessageTag}
          />

          <div className="flex-1">
            <Select
              label="State"
              options={stateList}
              value={selectedState}
              onChange={setSelectedState}
            ></Select>
          </div>

          <Input
            label="Zip Code"
            required={true}
            {...register('zip')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="zip"
            as={ErrorMessageTag}
          />
          <Input
            label="Phone Number"
            required={true}
            {...register('phoneNumber')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="phoneNumber"
            as={ErrorMessageTag}
          />
          <div className="flex">
            <Link to={pageUrls.termsAndConditions} className='button button--primary-color button--solid' style={{ display: 'inline-flex' }}>
              <span className='button--icon button--icon-left'><span className='utds-icon-before-arrow-left' aria-hidden='true' style={{ fontSize: '.9rem' }} /></span>
              Back
            </Link>
            {/*<Button*/}
            {/*  type="button"*/}
            {/*  style="secondary"*/}
            {/*  onClick={() =>*/}
            {/*    dispatch({ type: 'menu/toggle', payload: 'login' })*/}
            {/*  }*/}
            {/*>*/}
            {/*  Back*/}
            {/*</Button>*/}
            <Button
              appearance="outlined"
              color="primary"
              type="submit"
              onClick={() => { alert('alert') }}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

Registration.propTypes = propTypes;
Registration.defaultProps = defaultProps;

export default Registration;
