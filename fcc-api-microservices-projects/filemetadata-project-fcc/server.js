var express = require('express');
var cors = require('cors');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var multer = require('multer')
var upload = multer()

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  console.log(req.file)
  res.send({
    "name": req.file.originalname,
    "type": req.file.mimetype,
    "size": req.file.size
  })
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
