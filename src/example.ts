type Task = {
  title: string
  priority: 'high' | 'middle' | 'low'
}

const task1: Task = {
  title: 'task1',
  priority: 'high',
}

const taskFoo: Task = {
  title: 'foo', // error
  priority: 'low',
}
