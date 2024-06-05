export function getUserInfo(id: string) {
  return fetch(`/api/users/${id}`)
    .then((response) => response.json());
}
