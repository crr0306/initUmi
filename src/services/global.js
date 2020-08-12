import  request  from '../utils/request';
export function logout() {
  return request('/logout', {
    method: 'GET',
  });
}
export function getSysInfo(payload) {
  console.log("getSysInfo in services");
  return request('/getSysInfo', {
    method: 'POST',
    body: JSON.stringify({
      ...payload,
    }),
  });
}
export function getMessage(payload) {
  console.log("getMessage in services");
  return request('/getMessage', {
    method: 'POST',
    body: JSON.stringify({
      ...payload,
    }),
  });
}