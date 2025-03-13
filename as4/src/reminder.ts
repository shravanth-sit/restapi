
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { ReminderService } from './ReminderService'

const app = new Hono()
const reminderService = new ReminderService()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/reminders', async (c) => {
  try {
    const { id, title, description, dueDate, isCompleted } = await c.req.json()
    const response = reminderService.createReminder(id, title, description, dueDate, isCompleted)
    return c.json(response, 201)
  } catch (error) {
    return c.json({ error: error.message }, 400)
  }
})

app.get('/reminders/:id', (c) => {
  try {
    const id = c.req.param('id')
    const reminder = reminderService.getReminder(id)
    return c.json(reminder, 200)
  } catch (error) {
    return c.json({ error: error.message }, 404)
  }
})

app.get('/reminders', (c) => {
  try {
    const reminders = reminderService.getAllReminders()
    return c.json(reminders, 200)
  } catch (error) {
    return c.json({ error: error.message }, 404)
  }
})

app.patch('/reminders/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const updates = await c.req.json()
    const response = reminderService.updateReminder(id, updates)
    return c.json(response, 200)
  } catch (error) {
    return c.json({ error: error.message }, 400)
  }
})

app.delete('/reminders/:id', (c) => {
  try {
    const id = c.req.param('id')
    const response = reminderService.deleteReminder(id)
    return c.json(response, 200)
  } catch (error) {
    return c.json({ error: error.message }, 404)
  }
})

app.post('/reminders/:id/mark-completed', (c) => {
  try {
    const id = c.req.param('id')
    const response = reminderService.markCompleted(id)
    return c.json(response, 200)
  } catch (error) {
    return c.json({ error: error.message }, 404)
  }
})

app.post('/reminders/:id/unmark-completed', (c) => {
  try {
    const id = c.req.param('id')
    const response = reminderService.unmarkCompleted(id)
    return c.json(response, 200)
  } catch (error) {
    return c.json({ error: error.message }, 404)
  }
})

app.get('/reminders/completed', (c) => {
  try {
    const reminders = reminderService.getCompletedReminders()
    return c.json(reminders, 200)
  } catch (error) {
    return c.json({ error: error.message }, 404)
  }
})

app.get('/reminders/not-completed', (c) => {
  try {
    const reminders = reminderService.getNotCompletedReminders()
    return c.json(reminders, 200)
  } catch (error) {
    return c.json({ error: error.message }, 404)
  }
})

app.get('/reminders/due-today', (c) => {
  try {
    const reminders = reminderService.getDueTodayReminders()
    return c.json(reminders, 200)
  } catch (error) {
    return c.json({ error: error.message }, 404)
  }
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})