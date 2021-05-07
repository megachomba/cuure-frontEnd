## Description

Simple Project that allows user to create patients, appointements and to add notes to the appointements.
the Frontend is done via ReactJS + context, Material-UI

## Requirements

-NodeJs and NPM
-Docker

## Installation

1.download this repository 2. Go into the main folder and install node depencies via the following command:

```bash
$ npm i
```

4.Go into the main folder and launch the FrontEnd via the following command:

```bash
$ npm start
```

for the frontened to work, Please create a first new user once the backend is started via a POST or via this curl command :

```bash
curl --location --request POST 'localhost:3000/user' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nom": "first user"
}'
```
