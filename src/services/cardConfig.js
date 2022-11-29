import request from './config/request';

/*
    前台展示控制
*/
// 测试前台返回内容
export const testQuery = options =>
  request('post', `/usher/web/testQuery/${options?.methodId}`, options);

// 通过methodId获取配置
export const usherQueryStyleGet = id =>
  request('get', `/usher/system/usherQueryStyle/getByMethodId/${id}`);

// 更新
export const usherQueryStyleUpdate = options =>
  request('post', '/usher/system/usherQueryStyle/update', options);
