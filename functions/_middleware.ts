const errorHandler = async (context:{
    next: () => Promise<Response>
  }) => {
    try {
      const { next } = context;
      return await next();
    } catch (err: any) {
      return new Response(`${err.message}\n${err.stack}`, { status: 500 });
    }
  };
  
  const guardByBasicAuth = async (context:{
      next: () => Promise<Response>;
      request: Request;
      env: {
        BASIC_AUTH_USER: string
        BASIC_AUTH_PASSWORD: string
        ALLOW_BASIC_HOST: string
      };
    }
  ): Promise<Response> => {
  
    const { request, next, env } = context;
  
    const BASIC_AUTH_USER = env.BASIC_AUTH_USER;
    const BASIC_AUTH_PASSWORD = env.BASIC_AUTH_PASSWORD;
  
    const headers: Headers = request.headers;
    const authorization: string | null = headers.get('authorization') ?? null;

    if (!authorization) {
      return new Response(
        "You need to login.",
        {
          status: 401,
          headers: {
            'WWW-Authenticate': 'Basic realm="Input username and password"',
          },
        });
    };
  
    const [scheme, encoded] = authorization.split(' ');
    if (!encoded || scheme !== 'Basic') {
      return new Response(
        "Malformed authorization header.",
        {
          status: 400,
        }
      );
    }
  
    const buffer = Uint8Array.from(atob(encoded), character => character.charCodeAt(0));
    const decoded = new TextDecoder().decode(buffer).normalize();
    const index = decoded.indexOf(":");
    if (index === -1 || /[\0-\x1F\x7F]/.test(decoded)) {
      return new Response(
        "Invalid authorization value.",
        {
          status: 400,
        }
      );
    }
  
    const username = decoded.substring(0, index);
    const password = decoded.substring(index + 1);
    if (username !== BASIC_AUTH_USER || password !== BASIC_AUTH_PASSWORD) {
      return new Response(
        "Invalid username or password.",
        {
          status: 401,
        }
      );
    }
    return await next();
  };
  
  export const onRequest = [errorHandler, guardByBasicAuth];