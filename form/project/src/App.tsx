import React, { useState } from 'react';
import SignUpForm from './components/SignUpForm';
import PersonalityForm from './components/PersonalityForm';

function App() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    personality: '',
    genres: []
  });

  const handleSignUpSubmit = (data: { username: string; email: string; password: string }) => {
    setUserData(prev => ({ ...prev, ...data }));
    setStep(2);
  };

  const handlePersonalitySubmit = (data: { personality: string; genres: string[] }) => {
    setUserData(prev => ({ ...prev, ...data }));
    // Here you would typically submit the complete form data to your backend
    console.log('Complete form data:', { ...userData, ...data });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {step === 1 ? 'Create your account' : 'Tell us about yourself'}
          </h2>
        </div>

        {step === 1 ? (
          <SignUpForm onSubmit={handleSignUpSubmit} />
        ) : (
          <PersonalityForm onSubmit={handlePersonalitySubmit} />
        )}
      </div>
    </div>
  );
}

export default App;