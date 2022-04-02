import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HelloWorld from '../src/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('should render', () => {
    const wrapper = mount(HelloWorld, { props: { initial: 10 } })
    expect(wrapper.text()).toContain('10')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be interactive', async() => {
    const wrapper = mount(HelloWorld, { props: { initial: 0 } })
    expect(wrapper.text()).toContain('0')

    expect(wrapper.find('.inc').exists()).toBe(true)

    await wrapper.get('button').trigger('click')

    expect(wrapper.text()).toContain('1')
  })
})
