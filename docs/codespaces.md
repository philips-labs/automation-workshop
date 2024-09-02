# CodeSpaces

## Running using VSCode in the browser

To allow you to access the running application entirely in CodeSpaces from the
browser you need to make some changes. This is because the frontend and backend
run on different ports (300 and 7007). In the browser CodeSpaces exposes these
on different URLs over HTTPS on port 443 instead of the original ports. THere is
also a layer of GitHub security over these endpoints to protect your running
application

- Set the port visibility of the backend port (7007) to public. Right click on
  it in the ports tab and select "Port Visibility" -> "Public". Public means
  accessible to the entire world. For the purposes of this workshop, it is safe
  to do this. However, in a real-world scenario, you should be careful about
  exposing your application to the public and should never do this.
- Make some changes to the `app-config.yml` inside `backstage` to tell backstage
  which URLs you are going to use for the frontend and backend.

There are 2 things we need to do

- Tell the frontend where the backend is by changing the `backend.baseUrl`
  value.

  ```yaml
  backend:
    baseUrl: https://${CODESPACE_NAME}-7007.app.github.dev
  ```

- Tell the backend to allow CORS connections form the frontend. By changing the
  `backend.cors.origin` value

  ```yaml
  backend:
    cors:
      origin: https://${CODESPACE_NAME}-3000.app.github.dev
  ```
