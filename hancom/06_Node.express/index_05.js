const express = require("express") //1꺼내기
const app = express() //2만들기

const users = [
    {id: 1, name: "JUNG"},
    {id: 2, name: "SUN"},
    {id: 3, name: "MIN"}
] 

//3규칙 만들기

app.get('/api/users/:id', (req,res) => {
    const user = users.find(u => u.id === Number(req.params.id))

    if (!user) return res.status(404).json({ error: '없는 유저'})
    res.json(user) 
})
//4문열기
app.listen(4000, () => console.log('http://localhost:4000'))
