import { serve } from "@hono/node-server";
import { Hono } from "hono";
import ReminderService from "./RemDB";

const app = new Hono();
const rs = new ReminderService();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/reminders", async (c) => {
  try {
    const { id, title, description, dueDate, isCompleted } = await c.req.json();
    const response = rs.createReminder(
      id,
      title,
      description,
      dueDate,
      isCompleted
    );
    return c.json(response, 201);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400);
  }
});

app.get("/reminders/:id", (c) => {
  try {
    const id = c.req.param("id");
    const reminder = rs.getReminder(id);
    return c.json(reminder, 200);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 404);
  }
});

app.get("/reminders", (c) => {
  try {
    const reminders = rs.getAllReminders();
    return c.json(reminders, 200);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 404);
  }
});

app.patch("/reminders/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const updates = await c.req.json();
    const response = rs.updateReminder(id, updates);
    return c.json(response, 200);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400);
  }
});

app.delete("/reminders/:id", (c) => {
  try {
    const id = c.req.param("id");
    const response = rs.deleteReminder(id);
    return c.json(response, 200);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 404);
  }
});

app.post("/reminders/:id/mark-completed", (c) => {
  try {
    const id = c.req.param("id");
    const response = rs.markCompleted(id);
    return c.json(response, 200);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 404);
  }
});

app.post("/reminders/:id/unmark-completed", (c) => {
  try {
    const id = c.req.param("id");
    const response = rs.unmarkCompleted(id);
    return c.json(response, 200);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 404);
  }
});

app.get("/remcompleted", (c) => {
  try {
    const reminders = rs.getCompletedReminders();
    return c.json(reminders, 200);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 404);
  }
});

app.get("/not-completed", (c) => {
  try {
    const reminders = rs.getNotCompletedReminders();
    return c.json(reminders, 200);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 404);
  }
});

app.get("/due-today", (c) => {
  try {
    const reminders = rs.getDueTodayReminders();
    return c.json(reminders, 200);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 404);
  }
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);