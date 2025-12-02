FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bullseye

# Install isolate-vm dependencies, these are needed by the @backstage/plugin-scaffolder-backend.
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update && \
    apt-get install -y --no-install-recommends python3 python3-venv g++ build-essential && \

    yarn config set python /usr/bin/python3

# Install sqlite3 dependencies. You can skip this if you don't use sqlite3 in the image,
# in which case you should also move better-sqlite3 to "devDependencies" in package.json.
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update && \
    apt-get install -y --no-install-recommends libsqlite3-dev

# Configure umbrella proxy for users behind this particular corporate proxy
ENV NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt
RUN mkdir -p /usr/local/share/ca-certificates/extra && \
    curl -o /usr/local/share/ca-certificates/extra/Cisco_Umbrella_Root_CA.crt https://d36u8deuxga9bo.cloudfront.net/certificates/Cisco_Umbrella_Root_CA.cer && \
    update-ca-certificates
RUN corepack enable

ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv "$VIRTUAL_ENV"
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Set Python interpreter for `node-gyp` to use
ENV PYTHON /usr/bin/python3

RUN pip3 install setuptools

ENV NODE_OPTIONS="${NODE_OPTIONS:-} --no-node-snapshot"
