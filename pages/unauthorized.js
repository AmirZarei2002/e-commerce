import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout title="Unauthorized Page">
      <div className="flex flex-col gap-3 text-center justify-center place-items-center p-8 rounded-t-md text-xl">
        <h1 className="text-xl font-semibold text-white/80">Access Denied !</h1>
        {message && (
          <div className="mb-4 dark-slate font-semibold">{message}</div>
        )}
        <div>
          <Link href="/login">
            <a className="rounded-lg w-fit bg-white/80 dark-slate px-5 py-2 text-sm font-medium">
              Log in
            </a>
          </Link>
          <span className="mx-2">or</span>
          <Link href="/login">
            <a className="rounded-lg w-fit bg-blue-800 text-white px-5 py-2 text-sm font-medium">
              sign up
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
