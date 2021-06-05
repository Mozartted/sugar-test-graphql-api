# Sugar test api GraphQL backend
> Running the grpahql backend.

## Starting the server
1. Start the docker services.
```sh
sudo docker-compose -p sugarliving -d up
```
2. Start the backend server
```sh
yarn dev
```

## Deploying the service.
The application runs on a node server to it would be best to load balance it with an nginx server if you intend to run multiple instances of the service for scaling.