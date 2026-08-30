import Link from "next/link";
import { UserRoundPlus } from "lucide-react";

import { registerAction } from "./actions";

const errorMessages = {
  invalid: "Провери полетата. Паролата трябва да е поне 8 символа.",
  exists: "Вече има потребител с този имейл."
};

export default async function RegisterPage({
  searchParams
}: {
  searchParams: Promise<{ error?: keyof typeof errorMessages }>;
}) {
  const params = await searchParams;
  const error = params.error ? errorMessages[params.error] : null;

  return (
    <main className="grid min-h-screen place-items-center bg-rail-mist px-4 py-8">
      <form action={registerAction} className="w-full max-w-md rounded border border-rail-line bg-white p-6 shadow-panel">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded bg-rail-route text-white">
            <UserRoundPlus className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-lg font-semibold">Регистрация</h1>
            <p className="text-sm text-slate-600">Нов PostgreSQL backend</p>
          </div>
        </div>

        {error ? (
          <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium" htmlFor="firstName">
              Име
            </label>
            <input id="firstName" name="firstName" className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route" />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="lastName">
              Фамилия
            </label>
            <input id="lastName" name="lastName" className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route" />
          </div>
        </div>

        <label className="mt-4 block text-sm font-medium" htmlFor="username">
          Потребителско име
        </label>
        <input id="username" name="username" className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route" autoComplete="username" />

        <label className="mt-4 block text-sm font-medium" htmlFor="email">
          Имейл
        </label>
        <input id="email" name="email" type="email" className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route" autoComplete="email" />

        <label className="mt-4 block text-sm font-medium" htmlFor="password">
          Парола
        </label>
        <input id="password" name="password" type="password" className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route" autoComplete="new-password" />

        <label className="mt-4 block text-sm font-medium" htmlFor="confirmPassword">
          Повтори паролата
        </label>
        <input id="confirmPassword" name="confirmPassword" type="password" className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route" autoComplete="new-password" />

        <button type="submit" className="mt-6 h-10 w-full rounded bg-rail-ink text-sm font-medium text-white hover:bg-slate-700">
          Създай акаунт
        </button>

        <p className="mt-4 text-center text-sm text-slate-600">
          Имаш акаунт?{" "}
          <Link href="/login" className="font-medium text-rail-route hover:underline">
            Вход
          </Link>
        </p>
      </form>
    </main>
  );
}
