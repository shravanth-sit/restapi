import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// In-memory storage for reminders
const reminders = new Map<string, any>()

app.post('/reminders', async (c) => {
  const { id, title, description, dueDate, isCompleted } = await c.req.json()

  if (!id || !title || !description || !dueDate || typeof isCompleted !== 'boolean') {
    return c.json({ error: 'Invalid request body' }, 400)
  }

  reminders.set(id, { id, title, description, dueDate, isCompleted })
  return c.json({ message: 'Reminder created successfully' }, 201)
})

app.get('/reminders/:id', (c) => {
  const id = c.req.param('id')
  const reminder = reminders.get(id)

  if (!reminder) {
    return c.json({ error: 'Reminder not found' }, 404)
  }

  return c.json(reminder, 200)
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})