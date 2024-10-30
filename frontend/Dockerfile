# syntax=docker/dockerfile:1.4

# 1. For build React app
FROM node:20.10.0 AS development

# Set working directory
WORKDIR /app

# 
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install

COPY . /app

ENV CI=true
ENV PORT=3001

CMD [ "npm", "start" ]

FROM development AS build

RUN npm run build

FROM development as dev-envs
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "npm", "start" ]
