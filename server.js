const http = require('http');
const { db, User, Page } = require('./models');
const app = require('./app');
const server = http.createServer(app);
const PORT = 3000;
const init = async () => {
  //await models.User.sync();
  //await models.Page.sync();
  db.sync({ force: true });
  server.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};
init();
