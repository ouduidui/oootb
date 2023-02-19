import { expect, it } from 'vitest'
import { saySomething } from '~/foo'

it('happy path', () => {
  expect(saySomething('world')).toMatchSnapshot('hello, world')
})
