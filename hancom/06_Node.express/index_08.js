const express = require('express') //1꺼내기
const app = express()//2aksemfrl

let users = [{id:1, name: '지니'},{id: 2, name: '철수'}]
//3규칙만들기

app.delete ('/api/users/:id', (req, res) => {
    users = users.filter (u => u.id !== Number(req.params.id))
    res.json({ok: true, 남은: users })
})

//4 문열기
app.listen(3000, async () => {
    const res = await fetch('http://localhost:3000/api/users/2', { method: 'DELETE' })
    console.log(await res.json())
})

