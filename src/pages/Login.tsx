'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import handleError from '../shared/lib/error/error';
import { useForm } from 'react-hook-form';
import { AuthFields } from '../shared/model/types';
import { authSchema } from '../shared/model/validators';
import cn from 'classnames';
import { loginUser } from '../features/auth/api/authApi';
import { setCurrentUser } from '@/src/entities/user/model/userActions';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  const handleLogin = async (form: AuthFields) => {
    setIsLoading(true);
    try {
      const user = await loginUser(form);
      setCurrentUser(user);
      router.push('/');
      router.refresh();
    } catch (e) {
      handleError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-3 w-80" noValidate>
        <h1 className="text-xl font-semibold mb-6">Sign in</h1>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
          className={cn(
            'border rounded px-3 py-2 text-sm outline-none',
            errors.email ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-blue-400',
          )}
          onChange={() => {
            clearErrors('email');
          }}
        />
        <p className="text-xs text-red-700 whitespace-pre">{errors.email?.message ?? ' '}</p>
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          className={cn(
            'border rounded px-3 py-2 text-sm outline-none',
            errors.password ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-blue-400',
          )}
          onChange={() => {
            clearErrors('password');
          }}
        />
        <p className="text-xs text-red-700 whitespace-pre">{errors.password?.message ?? ' '}</p>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white rounded px-3 py-2 text-sm hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Signing in…' : 'Sign in'}
        </button>
        <a href="/register" className="text-sm text-center text-blue-600 hover:underline">
          No account? Register
        </a>
      </form>
    </div>
  );
};

export default LoginPage;
