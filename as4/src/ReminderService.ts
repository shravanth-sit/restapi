export class ReminderService {
    private reminders = new Map<string, any>()
  
    // Create a reminder
    async createReminder(id: string, title: string, description: string, dueDate: string, isCompleted: boolean) {
      if (!id || !title || !description || !dueDate || typeof isCompleted !== 'boolean') {
        throw new Error('Invalid request body')
      }
  
      this.reminders.set(id, { id, title, description, dueDate, isCompleted })
      return { message: 'Reminder created successfully' }
    }
  
    // Get a reminder by ID
    async getReminder(id: string) {
      const reminder = this.reminders.get(id)
      if (!reminder) {
        throw new Error('Reminder not found')
      }
      return reminder
    }
  
    // Get all reminders
    async getAllReminders() {
      if (this.reminders.size === 0) {
        throw new Error('No reminders found')
      }
      return Array.from(this.reminders.values())
    }
  
    // Update a reminder
    async updateReminder(id: string, updates: Partial<{ title: string, description: string, dueDate: string, isCompleted: boolean }>) {
      const reminder = this.reminders.get(id)
      if (!reminder) {
        throw new Error('Reminder not found')
      }
  
      Object.assign(reminder, updates)
      this.reminders.set(id, reminder)
      return { message: 'Reminder updated successfully' }
    }
  
    // Delete a reminder
    async deleteReminder(id: string) {
      if (!this.reminders.delete(id)) {
        throw new Error('Reminder not found')
      }
      return { message: 'Reminder deleted successfully' }
    }
  
    // Mark a reminder as completed
    async markCompleted(id: string) {
      const reminder = this.reminders.get(id)
      if (!reminder) {
        throw new Error('Reminder not found')
      }
  
      reminder.isCompleted = true
      this.reminders.set(id, reminder)
      return { message: 'Reminder marked as completed' }
    }
  
    // Unmark a reminder as completed
    async unmarkCompleted(id: string) {
      const reminder = this.reminders.get(id)
      if (!reminder) {
        throw new Error('Reminder not found')
      }
  
      reminder.isCompleted = false
      this.reminders.set(id, reminder)
      return { message: 'Reminder unmarked as completed' }
    }
  
    // Get all completed reminders
    async getCompletedReminders() {
      const completedReminders = Array.from(this.reminders.values()).filter(reminder => reminder.isCompleted)
      if (completedReminders.length === 0) {
        throw new Error('No completed reminders found')
      }
      return completedReminders
    }
  
    // Get all not completed reminders
    async getNotCompletedReminders() {
      const notCompletedReminders = Array.from(this.reminders.values()).filter(reminder => !reminder.isCompleted)
      if (notCompletedReminders.length === 0) {
        throw new Error('No uncompleted reminders found')
      }
      return notCompletedReminders
    }
  
    // Get reminders due today
    async getDueTodayReminders() {
      const today = new Date().toISOString().split('T')[0]  // Extract only the date part (YYYY-MM-DD)
      const dueTodayReminders = Array.from(this.reminders.values()).filter(reminder => reminder.dueDate === today)
      if (dueTodayReminders.length === 0) {
        throw new Error('No reminders due today')
      }
      return dueTodayReminders
    }
  }
  