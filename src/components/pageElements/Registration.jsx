import { useForm } from 'react-hook-form';
// import { httpsCallable } from 'firebase/functions';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect } from 'react';
import { useUser } from 'reactfire';
// eslint-disable-next-line no-unused-vars
// import { useQueryClient } from '@tanstack/react-query';
// import { gql } from 'graphql-request';
import {
  Button, Form, Select, SelectOption, TextInput
} from '@utahdts/utah-design-system';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { registrationSchema } from '../../helpers/schema.mjs';
import ErrorMessageTag from './ErrorMessage.jsx';
import pageUrls from '../../enums/pageUrls';
import RegistrationPropsShape from '../propTypeShapes/RegistrationPropsShape';

const propTypes = {
  setState: PropTypes.func.isRequired,
  state: PropTypes.shape({
    props: RegistrationPropsShape.isRequired,
  }).isRequired,
};
const defaultProps = {};

function Registration({ setState, state }) {
  const { data } = useUser();
  // const getRolesGraphql = httpsCallable(functions, 'graphQl');
  // const updateRegistration = httpsCallable(functions, 'functions-httpsPostProfile');

  useEffect(
    () => {
      setState((draftState) => {
        draftState.props.organization = 'ugrc';
        draftState.props.username = '';
        draftState.props.password = '';
        draftState.props.confirmPassword = '';
        draftState.props.firstName = undefined;
        draftState.props.lastName = undefined;
        draftState.props.email = '';
        draftState.props.address1 = '';
        draftState.props.address2 = '';
        draftState.props.city = '';
        draftState.props.stateCode = 'UT';
        draftState.props.zipCode = '';
        draftState.props.phoneNumber = '';
      });
    },
    []
  );

  // eslint-disable-next-line no-unused-vars
  // const queryClient = useQueryClient();
  //
  // const endpoint = 'https://graphql-ueoh6v2sya-uc.a.run.app/';
  // const getRoles = gql`
  //  query {
  //   getRoles {
  //     roleName
  //   }
  // }
  // `;

  // const { data: response, status: registrationStatus } = useQuery({
  //   queryKey: ['roles', data.uid],
  //   enabled: data?.uid?.length > 0,
  //   queryFn: async () => {
  //     const { getRoles: retVal } = await request(endpoint, getRoles);
  //     return retVal;
  //   },
  //   staleTime: Infinity,
  // });

  const defaultValues = {
    username: '',
    password: '',
  };
  /* eslint-disable no-unused-vars */
  const {
    formState, handleSubmit, register, reset, setFocus,
  } = useForm({
    resolver: yupResolver(registrationSchema),
    defaultValues,
  });

  useEffect(() => {
    setFocus('organization');
  }, [setFocus]);

  // eslint-disable-next-line no-console
  // console.log('registrationStatus', registrationStatus);
  // eslint-disable-next-line no-console
  console.log('data', data);
  // eslint-disable-next-line no-console
  // console.log('response', response);

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
        <Form
          // onSubmit(({ state, validationErrors }) => ... do whatever ...)
          state={state}
          setState={setState}
          className="form--stacked"
        >
          <TextInput
            id="props.organization"
            label="Organization"
            isRequired
            className="input--height-small1x"
          />

          <ErrorMessage
            errors={formState.errors}
            name="organization"
            as={ErrorMessageTag}
          />
          <TextInput
            id="props.username"
            label="Username"
            isRequired
            className="input--height-small1x"
          />
          <ErrorMessage
            errors={formState.errors}
            name="username"
            as={ErrorMessageTag}
          />
          <TextInput
            id="props.password"
            label="Password"
            isRequired
            className="input--height-small1x"
          />
          <ErrorMessage
            errors={formState.errors}
            name="password"
            as={ErrorMessageTag}
          />
          <TextInput
            id="props.confirmPassword"
            label="Confirm Password"
            isRequired
            className="input--height-small1x"
          />
          <ErrorMessage
            errors={formState.errors}
            name="confirmPassword"
            as={ErrorMessageTag}
          />
          <TextInput
            id="props.firstName"
            label="First Name"
            isRequired
            className="input--height-small1x"
          />
          <ErrorMessage
            errors={formState.errors}
            name="firstName"
            as={ErrorMessageTag}
          />
          <TextInput
            id="props.lastName"
            label="Last Name"
            isRequired
            className="input--height-small1x"
          />
          <ErrorMessage
            errors={formState.errors}
            name="lastName"
            as={ErrorMessageTag}
          />
          <TextInput
            id="props.email"
            label="Email"
            isRequired
            className="input--height-small1x"
          />
          <ErrorMessage
            errors={formState.errors}
            name="email"
            as={ErrorMessageTag}
          />
          <TextInput
            id="props.address1"
            label="Address 1"
            isRequired
            className="input--height-small1x"
          />
          <ErrorMessage
            errors={formState.errors}
            name="address1"
            as={ErrorMessageTag}
          />
          <TextInput
            id="props.address2"
            label="Address 2"
            isRequired
            className="input--height-small1x"
          />
          <ErrorMessage
            errors={formState.errors}
            name="address2"
            as={ErrorMessageTag}
          />
          <TextInput
            id="props.city"
            label="City"
            isRequired
            className="input--height-small1x"
          />
          <ErrorMessage
            errors={formState.errors}
            name="city"
            as={ErrorMessageTag}
          />

          <div className="flex-1">
            <Select id="props.stateCode" label="State" className="input--height-small1x">
              <SelectOption label="Utah" value="UT" />
              <SelectOption label="Nevada" value="NV" />
            </Select>
          </div>

          <TextInput
            id="props.zipCode"
            label="Zip Code"
            isRequired
            className="input--height-small1x"
          />
          <ErrorMessage
            errors={formState.errors}
            name="zip"
            as={ErrorMessageTag}
          />
          <TextInput
            id="props.phoneNumber"
            label="Phone Number"
            isRequired
            className="input--height-small1x"
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
              // eslint-disable-next-line no-alert
              onClick={() => { alert('alert'); }}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

Registration.propTypes = propTypes;
Registration.defaultProps = defaultProps;

export default Registration;
