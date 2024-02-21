# Copyright (C) 2024  Joao Eduardo Luis <joao@1e3ms.io>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.

# backend builder
#
FROM node:21-alpine as backend-build

RUN mkdir /build

COPY backend/src/ /build/src/
COPY backend/*.json /build

RUN ls /build

WORKDIR /build

RUN npm ci
RUN npx nest build

RUN ls /build

# frontend builder
#
FROM node:21-alpine as frontend-build

RUN mkdir /build

COPY frontend/src/ /build/src/
COPY frontend/*.json /build/
COPY frontend/*.js /build/

RUN ls /build

WORKDIR /build

RUN npm ci
RUN npx ng build -c production

RUN ls /build

FROM node:21-alpine as io.1e3ms.qrcodes

RUN mkdir -p /1e3ms-qrcodes/backend
RUN mkdir -p /1e3ms-qrcodes/frontend

COPY --from=backend-build /build/dist/ /1e3ms-qrcodes/backend
COPY --from=backend-build /build/node_modules/ \
    /1e3ms-qrcodes/backend/node_modules/

COPY --from=frontend-build /build/dist/browser/ /1e3ms-qrcodes/frontend
COPY --from=frontend-build /build/dist/3rdpartylicenses.txt \
    /1e3ms-qrcodes/frontend

COPY backend/LICENSE /1e3ms-qrcodes/backend/LICENSE
COPY frontend/LICENSE /1e3ms-qrcodes/frontend/LICENSE

ENV FRONTEND_DIST /1e3ms-qrcodes/frontend

EXPOSE 3000

WORKDIR /1e3ms-qrcodes

CMD ["node", "backend/main"]
