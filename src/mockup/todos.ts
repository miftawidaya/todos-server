import { NewTodo, Todo } from 'types/todos';
import { v4 as uuid } from 'uuid';

let todosMockup: Todo[] = [
  {
    id: uuid(),
    title: 'Buy groceries',
    completed: false,
    date: new Date('2023-10-01'),
  },
  {
    id: uuid(),
    title: 'Walk the dog',
    completed: true,
    date: new Date('2023-10-02'),
  },
  {
    id: uuid(),
    title: 'Do laundry',
    completed: false,
    date: new Date('2023-10-03'),
  },
  {
    id: uuid(),
    title: 'Finish homework',
    completed: false,
    date: new Date('2023-10-04'),
  },
  {
    id: uuid(),
    title: 'Read a book',
    completed: true,
    date: new Date('2025-10-05'),
  },
  {
    id: uuid(),
    title: 'Call mom',
    completed: false,
    date: new Date('2023-10-06'),
  },
  {
    id: uuid(),
    title: 'Prepare dinner',
    completed: true,
    date: new Date('2023-10-07'),
  },
  {
    id: uuid(),
    title: 'Clean the kitchen',
    completed: false,
    date: new Date('2023-10-08'),
  },
  {
    id: uuid(),
    title: 'Pay bills',
    completed: false,
    date: new Date('2023-10-09'),
  },
  {
    id: uuid(),
    title: 'Exercise',
    completed: true,
    date: new Date('2023-10-10'),
  },
  {
    id: uuid(),
    title: 'Water the plants',
    completed: false,
    date: new Date('2023-10-11'),
  },
  {
    id: uuid(),
    title: 'Plan the weekend trip',
    completed: false,
    date: new Date('2023-10-12'),
  },
  {
    id: uuid(),
    title: 'Update the resume',
    completed: true,
    date: new Date('2023-10-13'),
  },
  {
    id: uuid(),
    title: 'Watch a tutorial',
    completed: false,
    date: new Date('2023-10-14'),
  },
  {
    id: uuid(),
    title: 'Fix the leaking tap',
    completed: false,
    date: new Date('2023-10-15'),
  },
  {
    id: uuid(),
    title: 'Meditate for 10 minutes',
    completed: true,
    date: new Date('2023-10-16'),
  },
  {
    id: uuid(),
    title: 'Reply to emails',
    completed: false,
    date: new Date('2023-10-17'),
  },
  {
    id: uuid(),
    title: 'Organize the closet',
    completed: false,
    date: new Date('2023-10-18'),
  },
  {
    id: uuid(),
    title: 'Schedule dentist appointment',
    completed: true,
    date: new Date('2023-10-19'),
  },
  {
    id: uuid(),
    title: 'Take out the trash',
    completed: true,
    date: new Date('2023-10-20'),
  },
  {
    id: uuid(),
    title: 'Make a to-do list for tomorrow',
    completed: false,
    date: new Date('2023-10-21'),
  },
  {
    id: uuid(),
    title: 'Check the car tire pressure',
    completed: false,
    date: new Date('2023-10-22'),
  },
  {
    id: uuid(),
    title: 'Research on coding bootcamps',
    completed: false,
    date: new Date('2023-10-23'),
  },
  {
    id: uuid(),
    title: 'Backup the laptop data',
    completed: true,
    date: new Date('2023-10-24'),
  },
  {
    id: uuid(),
    title: 'Organize photo albums',
    completed: false,
    date: new Date('2023-10-25'),
  },
  {
    id: uuid(),
    title: 'Go for a jog',
    completed: true,
    date: new Date('2023-10-26'),
  },
  {
    id: uuid(),
    title: 'Buy a birthday gift',
    completed: false,
    date: new Date('2023-10-27'),
  },
  {
    id: uuid(),
    title: 'Cook lunch for the week',
    completed: false,
    date: new Date('2023-10-28'),
  },
  {
    id: uuid(),
    title: 'Take a coding test',
    completed: true,
    date: new Date('2023-10-29'),
  },
  {
    id: uuid(),
    title: 'Write a blog post',
    completed: false,
    date: new Date('2023-10-30'),
  },
  {
    id: uuid(),
    title: 'Attend yoga class',
    completed: true,
    date: new Date('2023-10-31'),
  },
  {
    id: uuid(),
    title: 'Shop for new shoes',
    completed: false,
    date: new Date('2023-11-01'),
  },
  {
    id: uuid(),
    title: 'Send postcards',
    completed: false,
    date: new Date('2023-11-02'),
  },
  {
    id: uuid(),
    title: 'Wash the car',
    completed: true,
    date: new Date('2023-11-03'),
  },
  {
    id: uuid(),
    title: 'Install software updates',
    completed: true,
    date: new Date('2023-11-04'),
  },
  {
    id: uuid(),
    title: 'Buy dog food',
    completed: false,
    date: new Date('2023-11-05'),
  },
  {
    id: uuid(),
    title: 'Plan a movie night',
    completed: false,
    date: new Date('2023-11-06'),
  },
  {
    id: uuid(),
    title: 'Research online courses',
    completed: false,
    date: new Date('2023-11-07'),
  },
  {
    id: uuid(),
    title: 'Meet a friend for coffee',
    completed: true,
    date: new Date('2023-11-08'),
  },
  {
    id: uuid(),
    title: 'Tidy up the living room',
    completed: false,
    date: new Date('2023-11-09'),
  },
  {
    id: uuid(),
    title: 'Make a dentist follow-up',
    completed: false,
    date: new Date('2023-11-10'),
  },
  {
    id: uuid(),
    title: 'Buy new notebooks',
    completed: true,
    date: new Date('2023-11-11'),
  },
  {
    id: uuid(),
    title: 'Design a mood board',
    completed: false,
    date: new Date('2023-11-12'),
  },
  {
    id: uuid(),
    title: 'Take medication',
    completed: true,
    date: new Date('2023-11-13'),
  },
  {
    id: uuid(),
    title: 'Order new supplies',
    completed: false,
    date: new Date('2023-11-14'),
  },
  {
    id: uuid(),
    title: 'Set a budget plan',
    completed: false,
    date: new Date('2023-11-15'),
  },
  {
    id: uuid(),
    title: 'Repair the garden fence',
    completed: true,
    date: new Date('2023-11-16'),
  },
  {
    id: uuid(),
    title: 'Create a workout plan',
    completed: false,
    date: new Date('2023-11-17'),
  },
  {
    id: uuid(),
    title: 'Write a thank-you letter',
    completed: false,
    date: new Date('2023-11-18'),
  },
  {
    id: uuid(),
    title: 'Visit the library',
    completed: true,
    date: new Date('2023-11-19'),
  },
  {
    id: uuid(),
    title: 'Organize a study session',
    completed: false,
    date: new Date('2023-11-20'),
  },
  {
    id: uuid(),
    title: 'Send out invitations',
    completed: true,
    date: new Date('2023-11-21'),
  },
  {
    id: uuid(),
    title: 'Get a haircut',
    completed: false,
    date: new Date('2023-11-22'),
  },
  {
    id: uuid(),
    title: 'Refill prescriptions',
    completed: true,
    date: new Date('2023-11-23'),
  },
  {
    id: uuid(),
    title: 'Learn to cook a new recipe',
    completed: false,
    date: new Date('2023-11-24'),
  },
  {
    id: uuid(),
    title: 'Host a game night',
    completed: true,
    date: new Date('2023-11-25'),
  },
  {
    id: uuid(),
    title: 'Attend a webinar',
    completed: false,
    date: new Date('2023-11-26'),
  },
  {
    id: uuid(),
    title: 'Organize kitchen cabinets',
    completed: false,
    date: new Date('2023-11-27'),
  },
  {
    id: uuid(),
    title: 'Create a meal plan',
    completed: true,
    date: new Date('2023-11-28'),
  },
  {
    id: uuid(),
    title: 'Take a photography walk',
    completed: false,
    date: new Date('2023-11-29'),
  },
  {
    id: uuid(),
    title: 'Test a new app',
    completed: false,
    date: new Date('2023-11-30'),
  },
  {
    id: uuid(),
    title: 'Make a holiday shopping list',
    completed: true,
    date: new Date('2023-12-01'),
  },
  {
    id: uuid(),
    title: 'Donate old clothes',
    completed: false,
    date: new Date('2023-12-02'),
  },
  {
    id: uuid(),
    title: 'Decorate for the holidays',
    completed: false,
    date: new Date('2023-12-03'),
  },
  {
    id: uuid(),
    title: 'Research pet insurance',
    completed: true,
    date: new Date('2023-12-04'),
  },
  {
    id: uuid(),
    title: 'Practice public speaking',
    completed: false,
    date: new Date('2023-12-05'),
  },
  {
    id: uuid(),
    title: 'Start a new hobby',
    completed: false,
    date: new Date('2023-12-06'),
  },
  {
    id: uuid(),
    title: 'Organize email inbox',
    completed: true,
    date: new Date('2023-12-07'),
  },
  {
    id: uuid(),
    title: 'Send holiday cards',
    completed: false,
    date: new Date('2023-12-08'),
  },
  {
    id: uuid(),
    title: 'Book travel tickets',
    completed: true,
    date: new Date('2023-12-09'),
  },
  {
    id: uuid(),
    title: 'Create a vision board',
    completed: false,
    date: new Date('2023-12-10'),
  },
  {
    id: uuid(),
    title: 'Make homemade gifts',
    completed: true,
    date: new Date('2023-12-11'),
  },
  {
    id: uuid(),
    title: 'Research stocks',
    completed: false,
    date: new Date('2023-12-12'),
  },
  {
    id: uuid(),
    title: 'Host a potluck dinner',
    completed: false,
    date: new Date('2023-12-13'),
  },
  {
    id: uuid(),
    title: 'Practice coding challenges',
    completed: true,
    date: new Date('2023-12-14'),
  },
  {
    id: uuid(),
    title: 'Organize a volunteer event',
    completed: false,
    date: new Date('2023-12-15'),
  },
  {
    id: uuid(),
    title: 'Buy concert tickets',
    completed: true,
    date: new Date('2023-12-16'),
  },
  {
    id: uuid(),
    title: 'Try a new restaurant',
    completed: false,
    date: new Date('2023-12-17'),
  },
  {
    id: uuid(),
    title: 'Organize work documents',
    completed: false,
    date: new Date('2023-12-18'),
  },
  {
    id: uuid(),
    title: 'Read financial news',
    completed: true,
    date: new Date('2023-12-19'),
  },
  {
    id: uuid(),
    title: 'Make a donation',
    completed: false,
    date: new Date('2023-12-20'),
  },
  {
    id: uuid(),
    title: 'Complete tax forms',
    completed: false,
    date: new Date('2023-12-21'),
  },
  {
    id: uuid(),
    title: 'Prepare for a job interview',
    completed: true,
    date: new Date('2023-12-22'),
  },
  {
    id: uuid(),
    title: 'Plan a weekend hike',
    completed: false,
    date: new Date('2023-12-23'),
  },
  {
    id: uuid(),
    title: 'Learn a musical instrument',
    completed: false,
    date: new Date('2023-12-24'),
  },
  {
    id: uuid(),
    title: 'Attend a networking event',
    completed: true,
    date: new Date('2023-12-25'),
  },
  {
    id: uuid(),
    title: 'Prepare for New Year’s Eve',
    completed: false,
    date: new Date('2023-12-26'),
  },
  {
    id: uuid(),
    title: 'Organize photo backups',
    completed: false,
    date: new Date('2023-12-27'),
  },
  {
    id: uuid(),
    title: 'Send feedback to coworkers',
    completed: true,
    date: new Date('2023-12-28'),
  },
  {
    id: uuid(),
    title: 'Write in a gratitude journal',
    completed: false,
    date: new Date('2023-12-29'),
  },
  {
    id: uuid(),
    title: 'Evaluate yearly goals',
    completed: true,
    date: new Date('2023-12-30'),
  },
  {
    id: uuid(),
    title: 'Celebrate New Year’s Eve!',
    completed: false,
    date: new Date('2023-12-31'),
  },
];

export const getTodos = () => todosMockup;

export const addTodo = (newTodo: NewTodo) => {
  const todoWithDate: Todo = {
    id: uuid(),
    date: new Date(),
    ...newTodo,
  };

  todosMockup.push(todoWithDate);
  return todoWithDate;
};

export const deleteTodo = (todoId: string) => {
  todosMockup = todosMockup.filter((todo) => todo.id !== todoId);
};
export const getTodo = (todoId: string) => {
  return todosMockup.find((todo) => todo.id === todoId);
};
export const setTodos = (todoId: string, updatedTodo: Todo) => {
  todosMockup = todosMockup.map((todo) => {
    if (todo.id === todoId) {
      return updatedTodo;
    }
    return todo;
  });
};
