// // 监听来自插件的消息
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === 'loadTextFile') {
//     // 将文本文件内容存储在localStorage中
//     localStorage.setItem('selectedTextFile', message.textContent);
//     console.log("Read File Success!")
//     // 刷新页面或执行其他操作以显示内容
//     // 将文本内容置入div中
//     floatingDiv.innerHTML = textContent;
//   }
// });
// // 从本地存储中获取文本内容
// const textContent = localStorage.getItem('selectedTextFile');
// console.log(textContent);

// // 创建一个div元素并设置样式
// const floatingDiv = document.createElement('div');
// floatingDiv.style.position = 'fixed';
// floatingDiv.style.bottom = '0';
// floatingDiv.style.left = '0';
// floatingDiv.style.width = '500px';
// floatingDiv.style.height = '30px';
// floatingDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
// floatingDiv.style.color = 'white';
// floatingDiv.style.overflow = 'hidden';
// floatingDiv.style.textOverflow = 'ellipsis';
// floatingDiv.style.whiteSpace = 'nowrap';
// floatingDiv.style.padding = '5px';

// // 将div插入到页面中
// document.body.appendChild(floatingDiv);
// console.log("Div Inner Success")


// 监听来自popup.js的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'displayText') {
    console.log("Get File Success! File:"+text);
    createTextDiv(request.text);  // 调用函数创建显示文本的div
  }
});

// 创建显示文本的div并插入到页面左下角
function createTextDiv(text) {
  const div = document.createElement('div');
  div.innerText = text;
  div.style.position = 'fixed';
  div.style.bottom = '10px';
  div.style.left = '10px';
  div.style.height = '20px';
  div.style.width = '300px';
  div.style.background = 'rgba(0,0,0,0.5)';
  document.body.appendChild(div);
}

