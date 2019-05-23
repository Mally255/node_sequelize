require("dotenv").config({ path: "../.env" });

const Sequelize = require("sequelize");

/* 
- Connect to db
- operatorsAliases: false -> Removes deprecated error which shows up on terminal. 
*/
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    operatorsAliases: false
  }
);

/* 
- Define Model for Post.
- Models are defined with sequelize.define('name', {attributes}, "{options}").
*/
const Post = sequelize.define("post", {
  title: Sequelize.STRING,
  body: Sequelize.TEXT
});

/* 
- Update data post table in database
*/
sequelize.sync().then(() => {
  /*Post.update({
        title: 'Really Last One'
    }, {
        where: {
            title: 'Last one'
        }
    }).then((retrievedPost) => {
        console.log(retrievedPost);
    }, (error) => {
        console.log(`Something went wrong when updating: ${error.stack}`)
    });*/

  Post.findOne({
    where: {
      title: "Really Last One"
    }
  }).then(
    retrievedPost => {
      retrievedPost.update({
        title: "Last LAST one"
      });
    },
    error => {
      console.log(`Something went wrong when updating: ${error.stack}`);
    }
  );
});
