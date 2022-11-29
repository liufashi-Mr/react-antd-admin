import request from './config/request';

/*
    接入配置
*/
// 获取服务列表
export const getList = () => request('get', '/usher/system/usherService/getList');
// 接入的机构列表 CRUD  上下线
// 分页查询
export const getPageList = options =>
  request('post', '/usher/system/usherQueryMethod/getPageList', {
    ...options,
    searchCount: true,
  });

export const usherQueryMethodAdd = options =>
  request('post', '/usher/system/usherQueryMethod/add', options);

export const usherQueryMethodUpdate = options =>
  request('post', '/usher/system/usherQueryMethod/update', options);

export const usherQueryMethodDelete = id =>
  request('delete', `/usher/system/usherQueryMethod/deleteAllConfigById/${id}`);

export const usherQueryMethodOnline = options =>
  request('post', `/usher/system/usherQueryMethod/online/${options?.methodId}`, options);

export const usherQueryMethodOffline = id =>
  request('post', `/usher/system/usherQueryMethod/offline/${id}`);

// 获取接入机构配置详情
export const usherQueryMethodDetail = id =>
  request('get', `/usher/system/usherQueryMethod/detail/${id}`);

// 入参配置 CRUD
export const usherQueryParamAdd = options =>
  request('post', '/usher/system/usherQueryParam/add', options);

export const usherQueryParamDelete = id =>
  request('delete', `/usher/system/usherQueryParam/deleteById/${id}`);

export const usherQueryParamUpdate = options =>
  request('post', '/usher/system/usherQueryParam/update', options);

export const usherQueryParamGet = id =>
  request('get', `/usher/system/usherQueryParam/getByMethodId/${id}`);

// 出参配置 CRUD
export const usherQueryResultAdd = options =>
  request('post', '/usher/system/usherQueryResult/add', options);

export const usherQueryResultDelete = id =>
  request('delete', `/usher/system/usherQueryResult/deleteById/${id}`);

export const usherQueryResultUpdate = options =>
  request('post', '/usher/system/usherQueryResult/update', options);

export const usherQueryResultGet = id =>
  request('get', `/usher/system/usherQueryResult/getByMethodId/${id}`);

// 异常处理CRUD
export const usherQueryPreprocessAdd = options =>
  request('post', '/usher/system/usherQueryPreprocess/add', options);

// export const usherQueryPreprocessDelete = id =>
//   request('delete', `/usher/system/usherQueryPreprocess/deleteById/${id}`);

export const usherQueryPreprocessUpdate = options =>
  request('post', '/usher/system/usherQueryPreprocess/update', options);

export const usherQueryPreprocessGet = id =>
  request('get', `/usher/system/usherQueryPreprocess/getByMethodId/${id}`);

// 替换内容 CRUD
export const usherQueryReplaceAdd = options =>
  request('post', '/usher/system/usherQueryReplace/add', options);

export const usherQueryReplaceDelete = id =>
  request('delete', `/usher/system/usherQueryReplace/deleteById/${id}`);

export const usherQueryReplaceUpdate = options =>
  request('post', '/usher/system/usherQueryReplace/update', options);

export const usherQueryReplaceGet = id =>
  request('get', `/usher/system/usherQueryReplace/getByMethodId/${id}`);

// 过滤条件 CRUD
export const usherQueryFilterAdd = options =>
  request('post', '/usher/system/usherQueryFilter/add', options);

export const usherQueryFilterDelete = id =>
  request('delete', `/usher/system/usherQueryFilter/deleteById/${id}`);

export const usherQueryFilterUpdate = options =>
  request('post', '/usher/system/usherQueryFilter/update', options);

export const usherQueryFilterGet = id =>
  request('get', `/usher/system/usherQueryFilter/getByMethodId/${id}`);
