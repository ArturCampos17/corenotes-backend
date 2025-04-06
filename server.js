const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const sequelize = require('./config/connection'); 

const app = express(); 


app.use(cors());
app.use(bodyParser.json()); 


app.use('/api/tasks', taskRoutes); 


const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});