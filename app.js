// 读取文件夹并生成首页文件

var fs = require('fs');
var templateEngine = require('./utils/template_engine');

var pageList = fs.readdirSync('./src');
var css = fs.readFileSync('./template/index.css');
var pages = [];
var htmlTemplate = String(fs.readFileSync('./template/index.html'));

pageList.forEach(function (dirName) {
  var path = './src/' + dirName;
  var htmlContent = fs.readFileSync(path + '/index.html');
  var cssContent = fs.readFileSync(path + '/index.css');

  css += cssContent;

  // 获取title
  var reg = /<!--title:(.+?)-->/;
  var match = reg.exec(String(htmlContent).trim().replace(/ /g, ''));
  pages.push({
    title: (match && match[1]) || 'NO TITLE',
    content: String(htmlContent),
  });
});

if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist');
}

// 处理js
fs.writeFileSync('./dist/index.js', fs.readFileSync('./template/index.js'));

// 处理css
fs.writeFileSync('./dist/index.css', css);

// 处理html
var html = templateEngine(htmlTemplate, {
  pages: pages
});
fs.writeFileSync('./index.html', html);
