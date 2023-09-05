
// // 监听来自popup.js的消息
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.action === 'displayText') {
//     console.log("Get File Success! File:"+text);
//     createTextDiv(request.text);  // 调用函数创建显示文本的div
//   }
// });

// // 创建显示文本的div并插入到页面左下角
// function createTextDiv(text) {
//   const div = document.createElement('div');
//   div.innerText = text;
//   div.style.position = 'fixed';
//   div.style.bottom = '10px';
//   div.style.left = '10px';
//   div.style.height = '20px';
//   div.style.width = '300px';
//   div.style.background = 'rgba(0,0,0,0.5)';
//   document.body.appendChild(div);
// }

