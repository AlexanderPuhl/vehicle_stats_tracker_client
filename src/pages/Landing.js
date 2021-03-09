import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';

export default function LandingPage() {
  const [loggingIn, setLoggingIn] = useState(true);

  return (
    <section>
      <p>
        This app will help you keep records and track general stats for your
        vehicles. This is a great way to keep an eye on the health of your
        vehicle. It's also just fun to collect this sort of data and look back
        over it!
      </p>
      {loggingIn ? <LoginForm /> : <RegistrationForm />}
      <button onClick={() => setLoggingIn(!loggingIn)}>
        {loggingIn ? 'Register' : 'Login'}
      </button>
    </section>
  );
}
