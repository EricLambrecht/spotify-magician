import Toast from './Toast.vue'
import createTestRenderer from '../../utils/testing/createTestRenderer'

describe('Toast', () => {
  const shallowMountWithVuex = createTestRenderer(Toast, {
    shallow: true,
    stubs: [
      'b-text',
      'b-button-group',
      'b-button',
      'b-paragraph',
      'b-headline',
    ],
    state: {
      app: {},
    },
  })

  const renderToast = ({ ...customProps }) => {
    return shallowMountWithVuex({
      props: {
        message: 'message',
        type: 'type',
        caption: 'caption',
        dismissible: 'dismissible',
        id: 'id',
        ...customProps,
      },
    })
  }

  it('adds type to class names', () => {
    const { wrapper } = renderToast({ type: 'test-type' })
    expect(wrapper.attributes('class')).toContain('test-type')
  })

  it('shows caption', () => {
    const { wrapper } = renderToast({ caption: 'foobar' })
    expect(wrapper.find('p.caption').text()).toBe('foobar')
  })

  it('caption falls back to capitalized type if caption is undefined', () => {
    const { wrapper } = renderToast({ caption: undefined, type: 'my-type' })
    expect(wrapper.find('p.caption').text()).toBe('My-type')
  })

  it('shows message', () => {
    const { wrapper } = renderToast({ message: 'Oh, hi Mark' })
    expect(wrapper.find('p.message').text()).toBe('Oh, hi Mark')
  })

  it('shows close button if dismissible is true', () => {
    const { wrapper } = renderToast({ dismissible: true })
    expect(wrapper.find('.close').exists()).toBe(true)
    wrapper.setProps({ dismissible: false })
    expect(wrapper.find('.close').exists()).toBe(false)
  })

  it('dispatches remove-action with given id if close is clicked', () => {
    const { wrapper, mockStore } = renderToast({
      dismissible: true,
      id: 'test-id',
    })
    wrapper.find('.close').trigger('click')
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      'app/removeToast',
      'test-id'
    )
  })
})
