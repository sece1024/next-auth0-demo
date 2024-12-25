import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

export const GET = withApiAuthRequired(async function shows(req) {
  try {
    const res = new NextResponse();
  
    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['read:shows']
    });


    console.log('shows getAccessToken: ', accessToken)
    const apiPort = process.env.API_PORT || 3001;
    const response = await fetch(`http://localhost:${apiPort}/api/shows`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const shows = await response.json();
    // res.setHeader('Set-Cookie', `myCookie=${accessToken}; Path=/; HttpOnly; Max-Age=604800`); // 7 天有效期
    return NextResponse.json(shows, res);
  } catch (error) {
    console.log('api error------------------')
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
});
