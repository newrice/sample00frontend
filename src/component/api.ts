interface BaseApiProp {
  url: string;
  qparam?: {
    [key: string]: string;
  };
  body?: any;
  headers?: Headers | Record<string, string>;
}

export const basePost = async ({
  url,
  qparam,
  body,
  headers,
}: BaseApiProp): Promise<any> => {
  return fetch(`${url}?${new URLSearchParams(qparam)}`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'include', // include, same-origin, *omit
    headers,
    redirect: "follow", // manual, *follow, error
    body: JSON.stringify(body), // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
  }).then((response) => response.json()); // レスポンスの JSON を解析
};

export const baseGet = async ({
  url,
  qparam,
  headers,
}: BaseApiProp): Promise<any> => {
  return fetch(`${url}?${new URLSearchParams(qparam)}`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'include', // include, same-origin, *omit
    headers,
    redirect: "follow", // manual, *follow, error
  }).then((response) => response.json()); // レスポンスの JSON を解析
};

export const baseDelete = async ({
  url,
  qparam,
  headers,
}: BaseApiProp): Promise<any> => {
  return fetch(`${url}?${new URLSearchParams(qparam)}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'include', // include, same-origin, *omit
    headers,
    redirect: "follow", // manual, *follow, error
  }).then((response) => response.json()); // レスポンスの JSON を解析
};

export const basePut = async ({
  url,
  qparam,
  body,
  headers,
}: BaseApiProp): Promise<any> => {
  return fetch(`${url}?${new URLSearchParams(qparam)}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'include', // include, same-origin, *omit
    headers,
    redirect: "follow", // manual, *follow, error
    body: JSON.stringify(body), // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
  }).then((response) => response.json()); // レスポンスの JSON を解析
};
