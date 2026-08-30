import { TrainFront } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-rail-mist px-4">
      <form className="w-full max-w-sm rounded border border-rail-line bg-white p-6 shadow-panel">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded bg-rail-route text-white">
            <TrainFront className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-lg font-semibold">Вход</h1>
            <p className="text-sm text-slate-600">TrainCrewHub Next</p>
          </div>
        </div>

        <label className="block text-sm font-medium" htmlFor="email">
          Имейл или потребителско име
        </label>
        <input
          id="email"
          className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route"
          type="text"
          autoComplete="username"
        />

        <label className="mt-4 block text-sm font-medium" htmlFor="password">
          Парола
        </label>
        <input
          id="password"
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
      </form>
    </main>
  );
}
