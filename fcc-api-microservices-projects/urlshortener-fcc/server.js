var express = require('express');
var app = express();

var mongo = require('mongodb');
var mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const shortid = require('shortid');
var bodyParser = require('body-parser');
var dns = require('dns');

var cors = require('cors');
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  url: { type: String, required: true },
  shortid: String,
});
const URL = mongoose.model("UrlSchema", urlSchema);

// Rout Url
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// API endpoint
app.post("/api/shorturl/new", (req, res) => {
  let urlToSearch = req.body.url.split("//").pop();
  dns.lookup(urlToSearch, async (err) => {
    if (err) {
      res.json({ "error": "invalid URL" })
    } else {
      try {
        let docs = await URL.find({ url: urlToSearch })
        if (docs.length != 0) {
          res.json({ "original_url": docs[0].url, "short_url": docs[0].shortid })
        } else {
          let data = new URL({ url: urlToSearch, shortid: shortid.generate() })
          data.save().then(saved => {
            res.json({ "original_url": saved.url, "short_url": saved.shortid })
          }).catch(err => {
            console.log("Not able to save data : " + err)
          })
        }
      } catch (err) {
        console.log("not found : " + err)
      }
    }
  })
})

app.get("/api/shorturl/:new", async (req, res) => {
  let dataFromURL = req.params.new;
  try {
    let docs = await URL.find({ shortid: dataFromURL })
    if (docs.length == 0) {
      res.json({ "error": "invalid URL" })
    } else {
      res.redirect(302, "http://" + docs[0].url);
    }
  } catch (err) {
    console.log("not found : " + err)
  }
})

app.listen(3000, () => {
  console.log('Node.js listening ...');
});