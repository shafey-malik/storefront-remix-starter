import { Link, useFetcher, useSearchParams } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { login } from '~/providers/account/account';
import { ErrorResult } from '~/generated/graphql';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { Button } from '~/components/Button';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import { GoogleLoginButton } from '~/components/account/GoogleLoginButton';

export async function action({ params, request }: DataFunctionArgs) {
  const body = await request.formData();
  const email = body.get('email');
  const password = body.get('password');
  if (typeof email === 'string' && typeof password === 'string') {
    const rememberMe = !!body.get('rememberMe');
    const redirectTo = (body.get('redirectTo') || '/account') as string;
    const result = await login(email, password, rememberMe, { request });
    if (result.__typename === 'CurrentUser') {
      return redirect(redirectTo, { headers: result._headers });
    } else {
      return json(result, {
        status: 401,
      });
    }
  }
}

export default function SignInPage() {
  const [searchParams] = useSearchParams();
  const login = useFetcher<ErrorResult>();
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl text-[hsl(var(--foreground))] ">
            {t('account.signInTitle')}
          </h2>
          <p className="mt-2 text-center text-sm text-[hsl(var(--lead-text))] ">
            {t('common.or')}{' '}
            <Link
              to="/sign-up"
              className="font-medium text-primary hover:text-primary-500"
            >
              {t('account.register')}
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-[hsl(var(--card))] ">
          <div className="bg-[hsl(var(--card))] py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {/* <div className="bg-yellow-50 border border-yellow-400 text-yellow-800 rounded p-4 text-center text-sm">
              <p>{t('vendure.demoCredentials')}</p>
              <p>
                {t('account.emailAddress')}
                {': '}
                <span className="font-bold">test@vendure.io</span>
              </p>
              <p>
                {t('account.password')}: <span className="font-bold">test</span>
              </p>
            </div> */}
            <login.Form method="post">
              <fieldset disabled={login.state !== 'idle'} className="space-y-6">
                <input
                  type="hidden"
                  name="redirectTo"
                  value={searchParams.get('redirectTo') ?? undefined}
                />
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[hsl(var(--foreground))] "
                  >
                    {t('account.emailAddress')}
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      defaultValue="test@vendure.io"
                      placeholder={t('account.emailAddress')}
                      className="appearance-none block w-full px-3 py-2 border border-foreground rounded-md shadow-sm placeholder-lead-text focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:text-[hsl(var(--lead-text))]  disabled:bg-card disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[hsl(var(--foreground))] "
                  >
                    {t('account.password')}
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder={t('account.password')}
                      defaultValue="test"
                      className="appearance-none block w-full px-3 py-2 border border-foreground rounded-md shadow-sm placeholder-lead-text focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:text-[hsl(var(--lead-text))]  disabled:bg-card disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary-500 border-foreground rounded disabled:bg-card disabled:cursor-not-allowed"
                      defaultChecked
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-[hsl(var(--foreground))] "
                    >
                      {t('account.rememberMe')}
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-primary hover:text-primary-500"
                    >
                      {t('account.forgotPassword')}
                    </a>
                  </div>
                </div>

                {login.data && login.state === 'idle' && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <XCircleIcon
                          className="h-5 w-5 text-red-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          {t('account.errorSignIn')}
                        </h3>
                        <p className="text-sm text-red-700 mt-2">
                          {login.data.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <Button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <span className="flex gap-4 items-center">
                      {login.state !== 'idle' && (
                        <ArrowPathIcon className="animate-spin h-5 w-5 text-[hsl(var(--lead-text))] " />
                      )}
                      {t('account.signIn')}
                    </span>
                  </Button>
                </div>
              </fieldset>
              {/* Add this divider and Google button */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-foreground" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[hsl(var(--card))] text-[hsl(var(--lead-text))] ">
                      Or
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <GoogleLoginButton />
                </div>
              </div>
            </login.Form>
          </div>
        </div>
      </div>
    </>
  );
}
