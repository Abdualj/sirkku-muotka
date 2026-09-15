# Docker exercise - own image from scratch

A small Express app with a MongoDB backend, packaged into a Docker image and run with Docker Compose.

## App

`index.js` is an Express server with two routes:

- `GET /` - increments and returns a visit counter stored in MongoDB
- `GET /health` - returns `{ "status": "ok", "mongoConnected": true }`

The server listens on `0.0.0.0` so it's reachable from outside the container.

## Files

- `Dockerfile` - builds the app image (`node:20-alpine`, installs dependencies, runs as the non-root `node` user)
- `compose.yaml` - defines two services:
  - `server` - the Express app, port 3000, with `develop.watch` for live sync
  - `mongo` - official `mongo:7` image with a named volume (`mongo_data`) so data survives container restarts
- `.dockerignore` / `.gitignore` - keep `node_modules` and build clutter out of the image and out of git

## Running

Build and start both services:

```
docker compose up --build
```

Or with file watching (syncs code changes into the running container and restarts it):

```
docker compose up --watch
```

Then open http://localhost:3000 - refreshing increments the visit count.
Check http://localhost:3000/health for app + database status.

Stop and remove everything:

```
docker compose down
```

## Process notes

- Started from a plain Express app (`GET /`, `GET /health`), confirmed it ran locally with `node index.js` before touching Docker.
- Wrote the Dockerfile by hand (multi-stage-style layer caching: install deps before copying source, run as non-root `node` user, expose 3000).
- Wrote `compose.yaml` with a `develop.watch` block using `sync+restart`, so edits to any file are copied into the container and the process restarts automatically.
- Verified `docker compose up --watch`: edited `index.js` while the container was running and confirmed the change took effect without a manual rebuild.
- Added a `mongo` service and rewired the app to use `mongoose` for the visit counter instead of an in-memory variable. Verified the counter persists across `docker compose restart server` (proving state lives in Mongo, not the app process) and that data survives via the named volume.




