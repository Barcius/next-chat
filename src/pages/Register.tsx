'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import handleError, { CustomError } from '../shared/lib/error/error';
import { useForm } from 'react-hook-form';
import { AuthFields } from '../shared/model/types';
import { authSchema } from '../shared/model/validators';
import cn from 'classnames';

function registerUser(f: AuthFields) { console.log(f) }

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({
    resolver: zodResolver(authSchema)
  });

  window.se = () => console.log(errors);
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   const data = new FormData(e.currentTarget);
  //   try {
  //     const res = await fetch('/api/auth/register', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         email: data.get('email'),
  //         password: data.get('password'),
  //       }),
  //     });
  //     if (!res.ok) {
  //       const body = await res.json();
  //       throw new CustomError(body.message ?? 'Registration failed', body.type ?? 'server', res.status);
  //     }
  //     router.push('/');
  //     router.refresh();
  //   } catch (e) {
  //     handleError(e);
  //   }
  //   setIsLoading(false);
  // };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <form onSubmit={handleSubmit(registerUser)} className="flex flex-col gap-3 w-80" noValidate>
        <h1 className="text-xl font-semibold mb-6">Create account</h1>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
          className={cn(
            'border rounded px-3 py-2 text-sm outline-none',
            errors.email ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-blue-400'
          )}
          onChange={() => { clearErrors('email') }}
        />
        <p className="text-xs text-red-700 whitespace-pre">{errors.email?.message ?? ' '}</p>
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          className={cn(
            'border rounded px-3 py-2 text-sm outline-none',
            errors.password ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-blue-400'
          )}
          onChange={() => { clearErrors('password') }}
        />
        <p className="text-xs text-red-700 whitespace-pre">{errors.password?.message ?? ' '}</p>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white rounded px-3 py-2 text-sm hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Creating account…' : 'Create account'}
        </button>
        <a href="/login" className="text-sm text-center text-blue-600 hover:underline">
          Already have an account? Sign in
        </a>
      </form>
    </div>
  );
};

export default RegisterPage;
