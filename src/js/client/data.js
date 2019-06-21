const xhr = new XMLHttpRequest();

/**
 * 通用函数
 */
function sendAjax() {
  let formData = new FormData();
  formData.append('username', '张飒');
  formData.append('pwd', '123456');

  let xhr = new XMLHttpRequest();
  xhr.timeout = 3000;
	xhr.responseType = 'text';
	//创建一个 post 请求，采用异步
	xhr.open('POST', '/server', true);
	//注册相关事件回调处理函数
	xhr.onload = function (e) {
		if (this.status == 200 || this.status == 304) {
			alert(this.responseText);
		}
	};
	xhr.ontimeout = function (e) {  };
	xhr.onerror = function (e) {  };
	xhr.upload.onprogress = function (e) {  };

	//发送数据
	xhr.send(formData);
}

/**
 * 统一处理ajax请求
 * @param {string} type 
 * @param {string} url 
 * @param {json} data 
 */
function doAjax(type, url, data) {
  if (type.toLocaleUpperCase() === 'GET') return doGet(url, data);
  if (type.toLocaleUpperCase() == 'POST') return doPost(url, data);
}

/**
 * 处理GET请求
 * @param {*} url 
 * @param {*} data 
 */
function doGet(url, data){
  let dataArr = [];
  for (let key in data) {
    dataArr.push(key + '=' + data[key]);
  }
  return new Promise((resolve, reject) => {
    xhr.open('GET', url + '?' + dataArr.join('&'));
    xhr.onreadystatechange = function (res) {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      }
      reject(xhr.status);
    }
    xhr.send();
  });
}

/**
 * 处理POST请求
 * @param {*} url 
 * @param {*} data 
 */
function doGet(url, data) {
  return new Promise((resolve, reject) => {
    xhr.open('POST', url);
    xhr.onreadystatechange = function (res) {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      }
      reject(xhr.status);
    }
    xhr.send(data);
  });
}