const express = require('express');
const cors = require('cors');
const path=require('path');

global.app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));


require('./routes/routes')();


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
