FROM python:3.5
RUN apt-get -y update && apt-get -y upgrade

RUN apt-get install -y libpq-dev
## BUILD JS STUFF
RUN cd /tmp
RUN wget https://nodejs.org/dist/v4.5.0/node-v4.5.0-linux-x64.tar.xz
RUN cd /tmp && tar xfvJ /node-v4.5.0-linux-x64.tar.xz
RUN ln -sf /tmp/node-v4.5.0-linux-x64/bin/node /usr/bin/node
RUN useradd -m openslides
RUN mkdir /app && chown openslides /app
ADD package.json /app
ADD bower.json /app
WORKDIR /app
RUN /tmp/node-v4.5.0-linux-x64/bin/npm install;  exit 0 #ignore errors in npm scripts
RUN su -c 'node_modules/.bin/bower --config.interactive=false install' openslides

# INSTALL PYTHON DEPENDENCIES
ADD requirements_production.txt /app/requirements_production.txt
RUN pip install -r /app/requirements_production.txt
RUN pip install daphne psycopg2 asgi_redis

# BUILD APP
ADD . /app

RUN node_modules/.bin/gulp
RUN rm -fr /tmp/node-v4.5.0-linux-x64/
RUN rm -fr /app/bower_components
RUN rm -fr /app/node_modules

ADD docker/run.sh /usr/local/bin/run

RUN apt-get -y install supervisor

RUN mkdir /data && chown openslides /data
USER openslides
EXPOSE 8000
USER openslides
VOLUME /supervisord.conf
VOLUME /data
