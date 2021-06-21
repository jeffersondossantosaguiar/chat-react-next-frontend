import 'tailwindcss/tailwind.css';

import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
