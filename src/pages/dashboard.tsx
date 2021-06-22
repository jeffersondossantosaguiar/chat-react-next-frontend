import React, { useEffect } from 'react';
import Head from 'next/head';
import Admin from '../layouts/Admin';
import { GetServerSideProps } from 'next';
import { getAPIClient } from '../services/axios';
import { parseCookies } from 'nookies';

export default function Dashboard() {

  useEffect(() => {
    //api.get('/users');
  }, []);

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}

Dashboard.layout = Admin;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['nextauth.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    };
  }
  /* 
    await apiClient.get('/users') */

  return {
    props: {}
  };
};