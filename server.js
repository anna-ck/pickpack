const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const arrayOfPickedItems = []

app.get('/picked', (req, res, next) => {
  res.send(arrayOfPickedItems)
})

app.post('/picked', (req, res, next) => {
  const newItem = req.body;
  arrayOfPickedItems.push(newItem)
  res.send(newItem)
})

app.param('itemId', (req, res, next, id) => {
  const itemId = id;
  const itemIndex = arrayOfPickedItems.findIndex(item => item.id === itemId);
  if (itemIndex !== -1){
    req.itemIndex = itemIndex;
    next();
  } else {
    res.status(404);
  }
})

app.put('/picked/:itemId', (req, res, next) => {
  arrayOfPickedItems[req.itemIndex] = req.body;
  res.send(arrayOfPickedItems[req.itemIndex]);
})

app.delete('/picked/:itemId', (req, res, next) => {
  arrayOfPickedItems.splice(req.itemIndex, 1);
  res.status(204).send(arrayOfPickedItems);
})


app.listen(port, () => console.log(`Listening on port ${port}`));