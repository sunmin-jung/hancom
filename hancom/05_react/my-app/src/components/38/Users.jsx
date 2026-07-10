import { useState, useEffect } from 'react'

const Users = () => {
  // users: 받아온 목록 (초기값 빈 배열 — 도착 전엔 비어있음)
  const [users, setUsers] = useState([])

  useEffect(() => {
    // fetch(주소) 요청 → .then 응답을 JSON 변환 → .then 데이터를 state 저장 → .catch 에러 처리
    fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json()).then((data) => setUsers(data)).catch((error) => console.error('데이터 로딩 실패:', error))
  }, [])   // [] = 첫 렌더 1번만 요청

  return (
    <ul>
      {/* map: 배열 돌며 항목마다 li 생성 / key: 고유값(필수) */}
      {users.map((u) => (
        <li key={u.id}>{u.name} - {u.company.name}</li>
      ))}
    </ul>
  )
}
export default Users