import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import Cookies from 'js-cookie'
// export const GET = withApiAuthRequired(async function test(req) {
//   try {
//     const res = new NextResponse();

//     const { accessToken } = await getAccessToken(req, res, {
//       scopes: ['read:shows']
//     });

//     console.log('req.headers.cookie', req.headers.get('cookie'))
//     console.log('test getAccessToken: ', accessToken)
//     const apiPort = process.env.API_PORT || 3001;
//     const response = await fetch(`http://localhost:${apiPort}/api/test`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`
//       }
//     });
//     const test = await response.json();
//     Cookies.set('Authorization', accessToken)
//     return NextResponse.json(accessToken, res);
//   } catch (error) {
//     console.log('api error------------------')
//     return NextResponse.json({ error: error.message }, { status: error.status || 500 });
//   }
// });

export const GET = async (req) => {
  try {
    const res = new NextResponse();
    const { accessToken } = await getAccessToken(req, res);

    console.log('req.headers.cookie', req.headers.get('cookie'))
    console.log('test getAccessToken: ', accessToken)
    const apiPort = process.env.API_PORT || 3001;
    const response = await fetch(`http://localhost:${apiPort}/api/test`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const test = await response.json();
    // Cookies.set('Authorization', accessToken)
    const cookie = `Authorization=${accessToken}; Path=/; Max-Age=3600; HttpOnly; Secure`;
    const r = new Response(JSON.stringify({ message: 'Login successful' }), {
      status: 200,
    });
    r.headers.set('Set-Cookie', cookie);

    return r;
  } catch (error) {
    console.log('api error------------------', error)
    return new Response(JSON.stringify({ message: error }), {
      status: 400,
    });
  }

}