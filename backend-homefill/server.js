const express = require("express")
const app = express();
require("dotenv").config();
var cors = require('cors')
app.use(cors())


var corsOptions = {
	origin: 'https://homefill.web.app',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get("/", (request, response) => {
	response.json({"msg" : "Hello"})
})

const barcodeRouter = require("./functions/api/getBarcode");
app.use("/api/barcode/",cors(corsOptions) , barcodeRouter);

let port = process.env.PORT || 3000;

let listener = app.listen(port, function () {
	console.log('App is listening on port ' + listener.address().port);
});
