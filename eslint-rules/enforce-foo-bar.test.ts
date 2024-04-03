import { RuleTester } from '@typescript-eslint/rule-tester'
import { EnforceFooBar } from './enforce-foo-bar.js'
import * as vitest from 'vitest'

RuleTester.afterAll = vitest.afterAll
// if you are not using vitest with globals: true
RuleTester.it = vitest.it
RuleTester.itOnly = vitest.it.only
RuleTester.describe = vitest.describe

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
})

ruleTester.run('enforce-foo-bar', EnforceFooBar, {
  valid: [
    `const task1: Task = {
      title: 'task1',
      priority: 'high',
    }`,
    `const book1: Book = {
      title: 'foo',
    }`,
  ],

  invalid: [
    {
      code: `const taskFoo: Task = {
        title: 'foo',
        priority: 'low',
      }`,
      output: null,
      errors: [
        {
          messageId: 'enforce-foo-bar-message',
        },
      ],
    },
    {
      code: `const taskFoo: Task = {
        title: 'foo',
        priority: 'low',
      }`,
      output: `const taskFoo: Task = {
        title: 'bar',
        priority: 'low',
      }`,
      errors: [
        {
          messageId: 'enforce-foo-bar-message',
        },
      ],
    },
  ],
})
