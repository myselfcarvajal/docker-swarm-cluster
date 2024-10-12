# Docker Swarm Cluster Setup

![Swarm cluster](/personas-react/public/Docker%20Swarm%20cluster.webp)

This document provides an overview of how to create and configure a Docker Swarm cluster using Docker in Docker (DinD) for a multi-container application setup. The setup includes containers running React, Angular, FastAPI, NestJS, and a PostgreSQL database.

## Prerequisites

- Docker installed on the host machine.
- Docker Swarm initialized on the host.

## Steps

### 1. Create a Network for the Swarm Cluster

First, create a custom network for the Swarm cluster:

```bash
docker network create swarm-cluster
```

### 2. Create Docker in Docker Containers

We will create Docker in Docker (DinD) containers to act as Swarm nodes. Each container is privileged and uses the custom swarm-cluster network.

#### Create Manager Nodes

```bash
docker run --privileged --name node1 --network swarm-cluster -d docker:dind
docker run --privileged --name node2 --network swarm-cluster -d docker:dind
docker run --privileged --name node3 --network swarm-cluster -d docker:dind
```

#### Promote Nodes To Manager

Promote one or more nodes to manager in the swarm

```bash
docker node promote mheqbfl6q91ff4jq1vbcgxpns dzjgn6sha94mt8n74un7s8kin
```

#### Create Worker Nodes

```bash
docker run --privileged --name node4 --network swarm-cluster -p 80:80 -d docker:dind
docker run --privileged --name node5 --network swarm-cluster -p 3000:3000 -d docker:dind
docker run --privileged --name node6 --network swarm-cluster -p 4200:4200 -d docker:dind
docker run --privileged --name node7 --network swarm-cluster -p 8001:8001 -d docker:dind
docker run --privileged --name node8 --network swarm-cluster -p 5432:5432 -d docker:dind
```

# 3. Initialize Swarm

Initialize Docker Swarm on the manager node (node1):

```bash
docker exec -it node1 /bin/sh
/ # docker swarm init
```

```bash
docker swarm join --token SWMTKN-1-2bkc8k3al8h9ebj0ga5hlc5smph0vhp ..... 172.x.x.x:2377
```

NOTE: The output will provide a command to join worker nodes to the Swarm. Use this command on the other nodes.

# 4. Verify the Swarm Cluster

You can list the nodes in the Swarm cluster using:

```bash
docker node ls
```

# 5. Create the Overlay Network for Services

Create an overlay network that all services will use:

```bash
docker network create -d overlay personas
```

# 6. Deploy the Services

#### PostgreSQL Database

Create the PostgreSQL service with one replica:

```bash
docker service create --name postgresql \
  -p 5432:5432 \
  --network personas \
  --replicas=1 \
  -e POSTGRES_PASSWORD=root \
  -e POSTGRES_USER=root \
  -e POSTGRES_DB=personas \
  postgres
```

#### Frontend Services

Deploy the React and Angular frontend services:

```bash
docker service create --name frontend-react \
  -p 80:80 \
  --network personas \
  --replicas=3 \
  myselfcarvajal/personas-react:latest

docker service create --name frontend-angular \
  -p 4200:4200 \
  --network personas \
  --replicas=3 \
  myselfcarvajal/personas-angular:2.0
```

#### Backend Services

Deploy the Python FastAPI and Node.js NestJS backends:

```bash
docker service create --name backend-python \
  -p 8001:8001 \
  --network personas \
  --replicas=2 \
  myselfcarvajal/personas-python:latest

docker service create --name backend-nodejs \
  -p 3000:3000 \
  --network personas \
  --replicas=2 \
  -e DATABASE_URL="postgresql://root:root@postgresql:5432/personas?schema=public" \
  myselfcarvajal/personas-nodejs:latest
```

# 8. Managing Docker Services

Docker services are the primary abstraction in Swarm mode to deploy container workloads. Below are some useful commands to manage the services:

#### List All Services

To view the list of running services:

```bash
docker service ls
```

#### View Status of a Specific Service

To view the status of the tasks of a service:

```bash
docker service ps frontend-react
```

#### Update an Existing Service

To update a parameter in an existing service (e.g., add a new published port and update the image):

```bash
docker service update --publish-add published=8090 target=80 --image=nginx:latest my-nginx
```

#### Scale a Service

To scale the number of replicas of a service up or down:

```bash
docker service scale my-nginx=4
```

#### Inspect a Service

To inspect a service and view detailed configuration:

```bash
docker service inspect my-nginx --pretty
```

# 8. Conclusion

The Docker Swarm cluster is now set up with frontend and backend services, along with a PostgreSQL database. The cluster uses an overlay network (personas) to allow communication between containers.
