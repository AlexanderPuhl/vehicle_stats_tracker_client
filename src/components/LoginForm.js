import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import useAuthentication from '../hooks/useAuthentication';
import { useAuthenticated } from '../context/authContext';
import useForm from '../hooks/useForm';
import '../styles/landing-page.css';

function LoginForm() {
  const { setAuthenticated, setUser } = useAuthenticated();
  const history = useHistory();
  const { values, updateValue } = useForm({
    username: 'demo',
    password: 'thinkful123',
  });

  const { error, loading, submitLogin } = useAuthentication({
    values,
  });

  async function handleClick(e) {
    e.preventDefault();
    const decodedToken = await submitLogin(values);
    if (decodedToken) {
      setAuthenticated(true);
      setUser(decodedToken);
      history.push('/dashboard');
    }
  }

  return (
    <>
      <form onSubmit={handleClick}>
        <fieldset>
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
          {error && (
            <div>
              <p>Error: {error}</p>
            </div>
          )}
          <button type='submit' disabled={loading}>
            {loading ? 'Loading' : 'Login'}
          </button>
        </fieldset>
      </form>
    </>
  );
}

export default withRouter(LoginForm);
