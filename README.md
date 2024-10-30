# Copyrights

## Prerequirements

Docker is required to build and start the application https://docs.docker.com/engine/install/

## Build and start application

Run `docker compose build` to build the application. It takes a bit of time to build frontend, so be patient.
Run `docker compose up` to start the application.
The application can be opened on http://localhost:3001/ 

## Login informatrion

For `cleark` user:
username: jack@example.com
password: password123

For `citizen` user:
username: john@example.com
password: password123

## Useful commands

To access mongo container run `docker exec -it copyrights-db-1 /bin/bash`

To access mongo database in mongo container run `mongosh mongodb://copyrightsdb:password123@db:27017/copyrights_development`

To remove all images run `docker system prune -a`
