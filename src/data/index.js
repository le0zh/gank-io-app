import { NativeModules, AsyncStorage } from 'react-native';

exports.get = function get(api, params) {
  const opt = {
    method: 'GET',
  };

  return fetch(api, opt)
    .then(response => {
      // 如果请求的返回结果不是OK则返回空数组，UI显示无数据
      if (response.status !== 200) {
        return [];
      }

      return response.json();
    })
    .catch(e => {
      console.log(`[API][error] ${e}`);
    });
};

export function getNewsForCategory(category, page) {
  return fetch(`http://gank.io/api/data/${category}/10/${page}`).then(res => res.json());
}
