FROM node:8

ADD server/chat_server.js /
ADD client/chat_client.js /

EXPOSE 8080

CMD ["node", "./chat_server.js"]