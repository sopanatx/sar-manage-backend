FROM node:14 AS builder

# Create app directory
WORKDIR /app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/
# Install app dependencies

RUN npm install --no-optional
# Generate prisma client, leave out if generating in `postinstall` script
RUN npx prisma generate

COPY . .

RUN npm run build
RUN npm rebuild bcrypt --build-from-source
FROM node:14

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 7001
CMD [ "npm", "run", "start:prod" ]