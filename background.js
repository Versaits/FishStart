// 在插件启动时检查并加载已上传的文件
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.get(['uploadedFiles'], function (result) {
      const uploadedFiles = result.uploadedFiles || [];
      uploadedFiles.forEach(function (file, index) {
        const blob = new Blob([file.content], { type: 'text/plain' });
        const objectURL = URL.createObjectURL(blob);
  
        // 将文件保存到 web_accessible_resources，以便在浏览器关闭后也可以访问
        chrome.runtime.getPackageDirectoryEntry(function (root) {
          root.getFile(`uploaded_${index}.txt`, { create: true }, function (fileEntry) {
            fileEntry.createWriter(function (fileWriter) {
              fileWriter.onwriteend = function () {
                // 文件已保存
              };
              fileWriter.write(blob);
            }, console.error);
          }, console.error);
        });
      });
    });
  });
  