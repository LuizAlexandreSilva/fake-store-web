import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import { AuthContext } from '../../../contexts/auth';

function SignIn() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: FieldValues) => {
      try {
        setErrorMsg('');
        const { username, password } = data;
        setIsLoading(true);
        await signIn({
          username,
          password,
        });

        navigate('/', { replace: true });
      } catch (err: any) {
        const message = err.response.data || '';
        setErrorMsg(message);
      } finally {
        setIsLoading(false);
      }
    },
    [signIn, navigate],
  );

  return (
    <div className="h-100 w-100 d-flex align-items-center justify-content-center">
      <Card>
        <CardHeader>
          <CardTitle tag="h5">Sign in</CardTitle>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <div>
              <input
                id="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                {...register('username')}
              />
            </div>
            <div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                {...register('password')}
              />
            </div>
            {errorMsg && (
              <div className="text-center w-100 mt-1">
                <span className="text-red-700">{errorMsg}</span>
              </div>
            )}

            <Button
              color="primary"
              disabled={isLoading}
              type="submit"
              className="w-100 mt-4"
            >
              {!isLoading ? 'Sign in' : 'Loading'}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default SignIn;
