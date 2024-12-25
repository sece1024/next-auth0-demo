'use client';

import React, { useEffect } from 'react';

import Hero from '../components/Hero';
import Content from '../components/Content';

export default function Index() {
  const callApi = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/test', { method: 'GET' });
      console.log('profile response: ', response)
    } catch (e) {
      console.log('profilr error: ', e)
    }
  }
  useEffect(() => {
    callApi()
  }, [])

  return (
    <>
      <Hero />
      <hr />
      <Content />
    </>
  );
}
