# G Fav

G fav, is project for the technical test in growth hackers is build the react and graphql. I spent around 48 hours building it!
Note that isn't my best job, but I'm proud of it

## Getting Started

If yo want to run locally this on your machine you most have git [git](https://git-scm.com), [node](https://nodejs.org) 12.x.x and [npm](https://npmjs.com) 6.x.x installed.

1. Clone the Repo

```shell
git clone https://github.com/Zoomelectrico/growth-hacker-g-favs.git
```

2. Install dependencies

```shell
cd growth-hacker-g-favs/frontend
npm install
cd ../backend
npm install
```

3. Create a variables.env

```shell
cd growth-hacker-g-favs/backend
touch variables.env
```

4. Add Vars

In a text editor open de `variables.env` file and set this vars

```text
PORT=3000
FRONTEND_URL=http://localhost:7777
SECRET=SOMESECRET
ROUND=5
DATABASE=<MONGO_URL>
```

5. Run the servers

Open two windows of yout terminal app go to `path/to/growth-hacker-g-favs/frontend` and in the other go to `path/to/growth-hacker-g-favs/backend` and then in both terminals run `npm run dev`. Then just open your browser in `http://localhost:7777` for the frontend and `http://localhost:3000/graphql` for the playground

## Techs Used

- [React.js](https://reactjs.org)
- [Next.js](https://nextjs.org)
- [GraphQL](https://graphql.org)
- [Apollo Server / Client](https://apollographql.com)
- [Express.js](https://expressjs.com)
- [GraphQL Compose](https://graphql-compose.github.io)
- [Mongoose](https://mongoosejs.com)
- [JWT](https://jwt.io)

## Building Process

So, I've build this app keeping in mind the requirement from growth hackers and also with the intention to demonstrate that I can deliver an app with multiples data sources. Also, I used some of the trendy techs in the market like next.js witch is a react.js framework that allow you to use server side render or even static optimization pages.

In other hand, I build the backend with the most popular tool out there (express) and used a good friend called apollo-express-server to build a Apollo GraphQL server using express so I can have the lovelily features of express and the rest server, but also having the power of graphql, and showing off that is posible to have a dual server and a dual app.

For close, I deploy the apps into to different server/services the backend was deploy in [heroku](https://heroku.com) and is available [here](https://g-favs-backend.herokuapp.com/), the frontend is deployed in [now](https://now.sh) a serverless environment made by the creators of next.js and is available [here](https://growth-hacker-g-favs.now.sh/)
