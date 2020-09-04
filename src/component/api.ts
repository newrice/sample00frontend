interface BaseApiPostProp {
  url: string
  params?: any
  headers: Headers | Record<string, string>
}

export const basePost = async ({ url, params, headers }: BaseApiPostProp): Promise<any> => {
  return fetch(url, {
    method: 'Post', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'include', // include, same-origin, *omit
    headers,
    redirect: 'follow', // manual, *follow, error
    body: JSON.stringify(params), // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
  }).then(response => response.json()) // レスポンスの JSON を解析
}