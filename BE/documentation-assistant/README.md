# Categories - A Mongo-Express-NodeJS REST API

## Prerequisites

We are assuming you are already familiar with MongoDB, NodeJS and that these are already installed on your system.

## API Setup

```
git clone https://github.com/gregartemides/contact-list-api.git
cd contact-list-api
npm install
```

## MongoDB Setup

Open a terminal window and start the mongo CLI to create the database and add some data.

```
mongo
```

In the CLI type the following to create the database categories and add a couple of documents to collection categories:

```
use categories
db.categories.insert({
  "name": "Category",
  "levelOfCategory": 1,
  "link": "https://www.google.com",
  "textDoc": "Comment"
})
```

## Run

```
npm start
```

Open your browser to http://localhost:3000/api/categories

## License

[MIT](LICENSE)
