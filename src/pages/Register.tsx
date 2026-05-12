'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import handleError, { CustomError } from '../shared/lib/error/error';

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          password: data.get('password'),
        }),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new CustomError(body.message ?? 'Registration failed', body.type ?? 'server', res.status);
      }
      router.push('/');
      router.refresh();
    } catch (e) {
      handleError(e);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
        <h1 className="text-xl font-semibold mb-1">Create account</h1>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
        />
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
