const express = require("express")
const router = express.Router();
const request = require("request-promise");
const cheerio = require("cheerio");

router.route("/:barcode").get(async (req, res) => {
	let barcode = req.params.barcode;
	let no_of_result = 0;
	const url = `https://www.google.co.in/search?q=${barcode}`
	let data = [];
	const response = await request({
		uri: url,
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
			'accept-language': "en-GB,en-US;q=0.9,en;q=0.8"
		},
	})
	let $ = cheerio.load(response)
	$('h3[class="LC20lb DKV0Md"]').map((i, elem) => {
		data.push($(elem).text())
		no_of_result = i + 1;
	})
	res.send({
		"barcode": `${barcode}`,
		"no_of_results": no_of_result,
		"results": data
	})
});

module.exports = router;
