
// 监听上传按钮点击事件
document.getElementById('uploadButton').addEventListener('click', function () {

  const statusMessage = document.getElementById('statusMessage');
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];  // 获取用户选择的文件
  let fileName = file.name;
  console.log("File Name:" + file.name);

  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const fileContent = event.target.result;  // 读取文件内容
      console.log("Read File Success! ");
      console.log("File Content:");
      console.log(fileName);
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: saveTextFile,
          function: displayText,
          args: [fileName, fileContent],  // 将文件内容作为参数传递
        });
      });

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
          statusMessage.textContent = '文件上传成功!';
          displayFileList(uploadedFiles);
        });
      });
    };
    reader.readAsText(file);  // 以文本形式读取文件
  }
  window.location.reload();
});


//加载选择的文件
document.getElementById('loadSavedButton').addEventListener('click', function () {
  const fileListSelect = document.getElementById('fileListSelect');
  const getSelectedOption = fileListSelect.options[fileListSelect.selectedIndex];
  const getSelectedOptionName = getSelectedOption.text;

  chrome.storage.local.get(['uploadedFiles'], function (result) {
    const uploadedFiles = result.uploadedFiles || [];
    const fileName = uploadedFiles.name;
    const fileContent = uploadedFiles.content;
    if (chrome.runtime.lastError) {
      console.error('Error retrieving data:', chrome.runtime.lastError);
    } else {
      if (uploadedFiles.length > 0) {
        uploadedFiles.forEach(function (file, index) {
          if (file.name == getSelectedOptionName) {

            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
              chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: displayText,
                args: [file.name, file.content],
              });
            });
          }
        })
      }
    }
  });
  
});



//保存文本到缓存文件
function saveTextFile(fileName, text) {

  // 创建一个包含要存储数据的对象
  const data = {
    saveName: fileName,
    uploadedFiles: text,

  };

  chrome.storage.local.set(data, function () {
    if (chrome.runtime.lastError) {
      console.error('Error storing data:', chrome.runtime.lastError);
    } else {
      console.log('Data stored successfully.');
    }
  });
};

//显示文本
function displayText(fileName, text) {
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
  const fileList = document.getElementById('fileList');


  // 获取已上传的文件列表
  chrome.storage.local.get(['uploadedFiles'], function (result) {
    const uploadedFiles = result.uploadedFiles || [];
    displayFileList(uploadedFiles);
  });

  // 显示已上传的文件列表
  function displayFileList(files) {
    fileList.innerHTML = '';
    const fileListSelect = document.getElementById('fileListSelect');
    files.forEach(function (file) {
      const option = document.createElement('option');
      const listItem = document.createElement('li');
      //插入选择栏
      option.value = file.name;
      option.textContent = file.name;
      fileListSelect.appendChild(option);

      //插入显示列表
      listItem.textContent = file.name;
      fileList.appendChild(listItem);



    });
  }
});
