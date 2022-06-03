FROM public.ecr.aws/lambda/nodejs:16

COPY service/ ${LAMBDA_TASK_ROOT}/service/
COPY package.json pollScores.js ${LAMBDA_TASK_ROOT}

RUN npm install --production

CMD [ "pollScores.handler" ]