# Recipe Book

-- current place 379 router store max
- migrate recipes from services to ngrx
## Build docker image

### local
docker build -t recipe-book .
docker run --rm -it -p 8080:80 -p 3000:3000 recipe-book /bin/sh
### remote
docker buildx build -t micael11/recipe-book:alpha --platform=linux/amd64 . --push