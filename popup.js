
// 监听上传按钮点击事件
document.getElementById('uploadButton').addEventListener('click', function () {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];  // 获取用户选择的文件
  console.log("File Name:" + file.name);

  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const text = event.target.result;  // 读取文件内容
      console.log("Read File Success! ");
      console.log("File Content:");
      console.log(text);
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // 向当前标签页的内容脚本发送消息
        console.log("Try to Send Message")
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: sendTextMessage,
          function: displayText,
          args: [text],  // 将文件内容作为参数传递
        });
      });
    };
    reader.readAsText(file);  // 以文本形式读取文件
  }
});

// 在标签页上执行的函数，用于显示文本内容
function sendTextMessage(text) {
  // 发送消息给content.js
  chrome.tabs.sendMessage({
    action: 'displayText',
    text: text,
  })
  console.log("Send Message Success!")
  console.log("Text:" + text)
}


//显示文本
function displayText(text) {
  const textDiv = document.createElement('div');
  textDiv.textContent = text;
  textDiv.innerText = text;
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
  textDiv.style.whiteSpace = 'nowrap'
  textDiv.style.color = 'rgb(102,106,109)'
  document.body.appendChild(textDiv);
}




document.addEventListener('DOMContentLoaded', function () {
  const fileInput = document.getElementById('fileInput');
  const uploadButton = document.getElementById('uploadButton');
  const statusMessage = document.getElementById('statusMessage');
  const fileList = document.getElementById('fileList');

  // 获取已上传的文件列表
  chrome.storage.local.get(['uploadedFiles'], function (result) {
    const uploadedFiles = result.uploadedFiles || [];
    displayFileList(uploadedFiles);
  });

  // 监听上传按钮的点击事件
  uploadButton.addEventListener('click', function () {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const fileContent = event.target.result;

        // 获取已上传的文件列表
        chrome.storage.local.get(['uploadedFiles'], function (result) {
          const uploadedFiles = result.uploadedFiles || [];

          // 查找并替换同名的已上传文件
          const existingFileIndex = uploadedFiles.findIndex(existingFile => existingFile.name === file.name);
          if (existingFileIndex !== -1) {
            uploadedFiles[existingFileIndex] = { name: file.name, content: fileContent };
          } else {
            uploadedFiles.push({ name: file.name, content: fileContent });
          }

          // 保存新的文件列表
          chrome.storage.local.set({ 'uploadedFiles': uploadedFiles }, function () {
            statusMessage.textContent = 'File uploaded and cached.';
            displayFileList(uploadedFiles);
          });
        });
      };
      reader.readAsText(file);
    }
  });

  // 显示已上传的文件列表
  function displayFileList(files) {
    fileList.innerHTML = '';
    files.forEach(function (file, index) {
      const listItem = document.createElement('li');
      listItem.textContent = file.name;
      fileList.appendChild(listItem);
    });
  }
});
