module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST만 됨' })
  }
  const key = process.env.GROQ_API_KEY
  if (!key) return res.json({ reply: '(mock) ' + req.body.prompt })

  const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: req.body.prompt }]
    })
  })
  const data = await groqRes.json()
  res.json({ reply: data.choices?.[0]?.message?.content || '(응답 없음)' })
}
