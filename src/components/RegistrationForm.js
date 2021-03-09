import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import useAuthentication from '../hooks/useAuthentication';
import { useAuthenticated } from '../context/authContext';
import useForm from '../hooks/useForm';

function RegistrationForm() {
  const { setAuthenticated, setUser } = useAuthenticated();
  const history = useHistory();
  const { values, updateValue } = useForm({
    name: 'alex',
    username: 'alex',
    email: 'alex@gmail.com',
    password: 'supersecret',
    confirmPassword: 'supersecret',
  });

  const { error, loading, submitRegistration } = useAuthentication({ values });

  async function handleClick(e) {
    e.preventDefault();
    const decodedToken = await submitRegistration(values);
    if (decodedToken) {
      setAuthenticated(true);
      setUser(decodedToken);
      history.push('/dashboard');
    }
  }

  return (
    <form onSubmit={handleClick}>
      <fieldset>
        <label htmlFor='name'>
          Name:
          <input
            type='text'
            name='name'
            id='name'
            value={values.name}
            onChange={updateValue}
            required
          />
        </label>
        <label htmlFor='username'>
          Username:
          <input
            type='text'
            name='username'
            id='username'
            value={values.username}
            onChange={updateValue}
            required
          />
        </label>
        <label htmlFor='email'>
          Email:
          <input
            type='email'
            name='email'
            id='email'
            value={values.email}
            onChange={updateValue}
            required
          />
        </label>
        <label htmlFor='password'>
          password:
          <input
            type='password'
            name='password'
            id='password'
            value={values.password}
            onChange={updateValue}
            required
          />
        </label>
        <label htmlFor='confirmPassword'>
          Confirm password:
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            value={values.confirmPassword}
            onChange={updateValue}
            required
          />
        </label>
        <div>{error ? <p>Error: {error}</p> : ''}</div>
        <button type='submit' disabled={loading}>
          {loading ? 'Registering' : 'Register'}
        </button>{' '}
      </fieldset>
    </form>
  );
}

export default withRouter(RegistrationForm);
