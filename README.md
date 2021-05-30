# aws-fileupload-nodejs

Testing file upload to aws using Node.js


For running this project you need have MongoDB installed in your environment.

Running MongoDB on your local environment:

```
$ sudo mongod --dbpath=data/db

or using docker

$ docker container run --name mongodb -d mongo:tag

```

Install the dependencies of Node.js

```
$ npm i
```

Start project
```
$ npm start
```

Open in
`http://localhost:3000/`

Add new file
`POST: http://localhost:3000/upload`

Delete file
`DELETE: http://localhost:3000/delete/:id`
