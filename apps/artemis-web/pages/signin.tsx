import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useCurrentUser } from '../lib/hooks';
import { useRouter } from 'next/router';

const SigninPage: React.FunctionComponent<{}> = () => {
  const [user] = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.push('/');
  }, [user]);

  const Footer = dynamic(() => import('../components/footer/footer'));
  const SignInComponent = dynamic(() => import('../components/sign-in/sign-in'));
  const Header = dynamic(() => import('../components/header/header'));

  return (
    <>
      <Head>
        <title>ARTEMIS - Login</title>
      </Head>
      <div id="login-container">
        <Header />
        {!user && (
          <div id="content-wrap" style={{ paddingBottom: '5rem' }}>
            <SignInComponent />
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default SigninPage;
