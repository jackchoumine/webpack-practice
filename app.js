let index = require('./src/index/index.js'); //commonJS 模块
import b from './src/b.js'; // es6 模块
import './src/index.css';
import iAmJavascriptES6 from './src/es6';
import $ from 'jquery';
iAmJavascriptES6();
index();
b();
let button = document.querySelector('button');
console.log(button1);
console.log($(button));
$(button).on('click', get);
function get() {
	$.get('/getDomainCategory')
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			console.error(err);
		});
}
