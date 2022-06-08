const express = require('express');
const bodyParser = require('body-parser');
const { render } = require('ejs');

const app = express();
app.set('view engine', 'ejs');
let items = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
	let today = new Date();

	const option = {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
	};

	let day = today.toLocaleDateString('en-US', option);

	res.render('list', { kindOfDay: day, newItemList: items });

	app.post('/', (req, res) => {
		let item = req.body.newItem;
		if (items.length >= 6) {
			items.shift();
			return;
		}
		items.push(item);

		res.redirect('/');
	});
});

app.listen(8080, () => {
	console.log('[SERVER RUNNING]...[ON SERVER 8080]');
});
