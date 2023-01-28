# Online Classbook

The design sketch can be found [here](https://www.figma.com/file/zMG2jrV2OrSzxr21ozWKur/Online-Classbook?node-id=1%3A5&t=XRjINLtHoT02GUID-1).

The planning document can be found [here](https://hollow-soccer-dbb.notion.site/online-classbook-f1b3507ece6746ec8f8686b4b90d119a).

- [Online Classbook](#online-classbook)
  - [Setting up](#setting-up)
  - [Spinning up the application](#spinning-up-the-application)
    - [Start the containers](#start-the-containers)
    - [Start the `server` app](#start-the-server-app)
    - [Start the `client` app](#start-the-client-app)

## Setting up

Install the required dependencies:

```bash
# `client` folder.
yarn install
```

```bash
# `server` folder.
npm i
```

---

## Spinning up the application

### Start the containers

```bash
# In the project's root folder.
docker-compose up
```

### Start the `server` app

*Make sure you're at the root of the project.*

```bash
cd server
npm run dev
```

### Start the `client` app

*Make sure you're at the root of the project.*

```bash
# Make sure you've run `npm i` fist.

cd client
yarn start
```