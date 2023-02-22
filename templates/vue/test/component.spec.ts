import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TodoItem from '../src/components/TodoItem.vue'

describe('TodoItem.vue', () => {
  it('should render', () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: {
          id: 1,
          content: 'Test Todo',
        },
      },
    })
    expect(wrapper.text()).toContain('Test Todo')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
