// import $ from 'jquery'

import _sass from '@/css/main.scss'
console.log(_sass)

// var style = require('./css/app.css')
import style from '@/css/app.css'
console.log(style)
// const file_tpl = require('./tpl/file')
const file_tpl = require('@/tpl/file')

var file_html = file_tpl({
    data:['line1','line2','line3']
})
// console.log(file_html)
$("body").append(file_html)

var img = document.createElement('img')
img.src = require('./img/small.jpg')
document.body.appendChild(img)

var img2 = document.createElement("img");
img2.src = require("./img/big.jpg");
document.body.appendChild(img2);

var _html = [
    `<div class=${style.module}>`,
    '<p>Test CSS Module</p>',
    '</div>'
]
document.write(_html.join(''))

require.ensure([], function (require) {
    var list = require('./list')
    list.show();
}, 'list')
console.log(111,$)