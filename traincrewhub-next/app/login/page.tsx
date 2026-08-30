import Link from "next/link";
import { TrainFront } from "lucide-react";

import { loginAction } from "./actions";

const errorMessages = {
  missing: "Въведи потребител и парола.",
  invalid: "Невалиден потребител или парола."
};

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: keyof typeof errorMessages }>;
}) {
  const params = await searchParams;
  const error = params.error ? errorMessages[params.error] : null;

  return (
    <main className="grid min-h-screen place-items-center bg-rail-mist px-4">
      <form action={loginAction} className="w-full max-w-sm rounded border border-rail-line bg-white p-6 shadow-panel">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded bg-rail-route text-white">
            <TrainFront className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-lg font-semibold">Вход</h1>
            <p className="text-sm text-slate-600">TrainCrewHub Next</p>
          </div>
        </div>

        {error ? (
          <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <label className="block text-sm font-medium" htmlFor="login">
          Имейл или потребителско име
        </label>
        <input
          id="login"
          name="login"
          className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route"
          type="text"
          autoComplete="username"
        />

        <label className="mt-4 block text-sm font-medium" htmlFor="password">
          Парола
        </label>
        <input
          id="password"
          name="password"
          className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route"
          type="password"
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="mt-6 h-10 w-full rounded bg-rail-ink text-sm font-medium text-white hover:bg-slate-700"
        >
          Вход
        </button>

        <p className="mt-4 text-center text-sm text-slate-600">
          Нямаш акаунт?{" "}
          <Link href="/register" className="font-medium text-rail-route hover:underline">
            Регистрация
          </Link>
        </p>
      </form>
    </main>
  );
}
