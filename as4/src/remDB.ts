// filepath: c:\Users\msvar\OneDrive\Documents\developer\assignment-4\as4\src\ReminderService.ts
class ReminderService {
    private reminders = new Map<string, any>();
  
    createReminder(
      id: string,
      title: string,
      description: string,
      dueDate: string,
      isCompleted: boolean
    ) {
      if (
        !id ||
        !title ||
        !description ||
        !dueDate ||
        typeof isCompleted !== "boolean"
      ) {
        throw new Error("Invalid request body");
      }
  
      this.reminders.set(id, { id, title, description, dueDate, isCompleted });
      return { message: "Reminder created successfully" };
    }
  
    getReminder(id: string) {
      const reminder = this.reminders.get(id);
      if (!reminder) {
        throw new Error("Reminder not found");
      }
      return reminder;
    }
  
    getAllReminders() {
      if (this.reminders.size === 0) {
        throw new Error("No reminders found");
      }
      return Array.from(this.reminders.values());
    }
  
    updateReminder(
      id: string,
      updates: Partial<{
        title: string;
        description: string;
        dueDate: string;
        isCompleted: boolean;
      }>
    ) {
      const reminder = this.reminders.get(id);
      if (!reminder) {
        throw new Error("Reminder not found");
      }
  
      Object.assign(reminder, updates);
      this.reminders.set(id, reminder);
      return { message: "Reminder updated successfully" };
    }
  
    deleteReminder(id: string) {
      if (!this.reminders.delete(id)) {
        throw new Error("Reminder not found");
      }
      return { message: "Reminder deleted successfully" };
    }
  
    markCompleted(id: string) {
      const reminder = this.reminders.get(id);
      if (!reminder) {
        throw new Error("Reminder not found");
      }
  
      reminder.isCompleted = true;
      this.reminders.set(id, reminder);
      return { message: "Reminder marked as completed" };
    }
  
    unmarkCompleted(id: string) {
      const reminder = this.reminders.get(id);
      if (!reminder) {
        throw new Error("Reminder not found");
      }
  
      reminder.isCompleted = false;
      this.reminders.set(id, reminder);
      return { message: "Reminder unmarked as completed" };
    }
  
    getCompletedReminders() {
      const completedReminders = Array.from(this.reminders.values()).filter(
        (reminder) => reminder.isCompleted
      );
      if (completedReminders.length === 0) {
        throw new Error("No completed reminders found");
      }
      return completedReminders;
    }
  
    getNotCompletedReminders() {
      const notCompletedReminders = Array.from(this.reminders.values()).filter(
        (reminder) => !reminder.isCompleted
      );
      if (notCompletedReminders.length === 0) {
        throw new Error("No uncompleted reminders found");
      }
      return notCompletedReminders;
    }
  
    getDueTodayReminders() {
      const today = new Date().toISOString().split("T")[0];
      const dueTodayReminders = Array.from(this.reminders.values()).filter(
        (reminder) => reminder.dueDate === today
      );
      if (dueTodayReminders.length === 0) {
        throw new Error("No reminders due today");
      }
      return dueTodayReminders;
    }
  }
  
  export default ReminderService;