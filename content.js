
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

document.addEventListener('DOMContentLoaded',function(){
  const textDiv = document.createElement('div');

  textDiv.style.id = 'textDiv';
  textDiv.style.position = 'fixed';
  textDiv.style.bottom = '-1px';
  textDiv.style.left = '0px';
  textDiv.style.height = '21px';
  textDiv.style.width = '500px';
  textDiv.style.background = 'rgb(222,225,230)';
  textDiv.style.border = '1px solid rgba(0,0,0,0.2)';
  textDiv.style.borderRadius = '4px';
  textDiv.style.lineHeight = '21px';
  textDiv.style.overflow = 'hidden';
  textDiv.style.whiteSpace = 'nowrap';
  textDiv.style.color = 'rgb(102,106,109)';
  textDiv.style.zIndex = '9999';
  // textDiv.style.display ='none';
  document.body.appendChild(textDiv);
})