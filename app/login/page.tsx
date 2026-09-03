import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="eyebrow mb-4">Member login</p>
      <h1 className="display text-4xl">
        The member portal is <em className="text-crimson">coming online</em>.
      </h1>
      <p className="mt-5 max-w-md text-stone">
        Accounts, subscriptions, and the course player arrive in the next phase
        of this build. In the meantime, call us at 678-627-2796 with any
        questions about your membership.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep transition-colors"
      >
        Back to the homepage
      </Link>
    </main>
  );
}
