/* eslint-disable no-console */
import ky, { HTTPError } from 'ky';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://3.255.186.112/api/v1';

const api = ky.create({
  prefixUrl: API_URL,
  timeout: 120000,
  cache: 'no-store',
  hooks: {
    beforeRequest: [
      request => {
        console.log('Request:', {
          url: request.url,
          method: request.method,
          headers: Object.fromEntries(request.headers.entries()),
          body: request.body
        });
      },
    ],
    afterResponse: [
      (_request, _options, response) => {
        console.log('Response:', {
          status: response.status,
          headers: Object.fromEntries(response.headers.entries()),
        });
      },
    ],
    beforeError: [
      async error => {
        if (error instanceof HTTPError) {
          let errorMessage = 'An unexpected error occurred. Please try again.';
          try {
            const errorData = await error.response.clone().json();
            errorMessage = errorData.message || errorMessage;
          } catch (parseError) {
            console.error('Error parsing JSON response:', parseError);
          }

          console.error('API Error:', {
            status: error.response.status,
            message: errorMessage,
            headers: Object.fromEntries(error.response.headers.entries()),
          });

          const newError = new HTTPError(
            error.response,
            error.request,
            error.options
          );
          Object.defineProperty(newError, 'message', {
            value: errorMessage,
            enumerable: true,
            configurable: true,
            writable: true,
          });

          return newError;
        }
        return error;
      },
    ],
  },
});

export default api;