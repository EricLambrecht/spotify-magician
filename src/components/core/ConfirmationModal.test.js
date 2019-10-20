import ConfirmationModal from './ConfirmationModal.vue'
import createTestRenderer from '../../utils/testing/createTestRenderer'

describe('ConfirmationModal', () => {
  const dummyConfirmation = {
    headline: 'headline',
    negative: 'negative',
    positive: 'positive',
  }

  const testState = {
    app: {
      dummyConfirmation,
    },
  }

  const testGetters = {
    'app/pendingConfirmation': dummyConfirmation,
    'app/confirmationIsPending': true,
  }

  const shallowMountWithVuex = createTestRenderer(ConfirmationModal, {
    state: testState,
    getters: testGetters,
    stubs: ['b-modal', 'b-text', 'b-button-group', 'b-button'],
    shallow: true,
  })

  const mountWithVuex = createTestRenderer(ConfirmationModal, {
    state: testState,
    getters: testGetters,
    stubs: ['b-modal', 'b-text', 'b-button-group'],
    shallow: false,
  })

  it("uses the pending confirmation's headline as the modal headline", () => {
    const testHeadline = 'test-headline'
    const { wrapper } = shallowMountWithVuex({
      getters: {
        'app/pendingConfirmation': { headline: testHeadline },
      },
    })

    const modal = wrapper.find('b-modal-stub')
    expect(modal.attributes('headline')).toBe(testHeadline)
  })

  it("shows it's own modal as soon as pendingConfirmation is true", () => {
    const { wrapper } = shallowMountWithVuex({
      getters: {
        'app/confirmationIsPending': true,
      },
    })

    const modal = wrapper.find('b-modal-stub')
    expect(modal.attributes('show')).toBe('true')
  })

  it("hides it's own modal as soon as pendingConfirmation is false", () => {
    const { wrapper } = shallowMountWithVuex({
      getters: {
        'app/confirmationIsPending': false,
      },
    })

    const modal = wrapper.find('b-modal-stub')
    expect(modal.attributes('show')).toBeUndefined()
  })

  it('renders question into b-text element', () => {
    const testQuestion = 'Wazzup?'
    const { wrapper } = shallowMountWithVuex({
      getters: {
        'app/pendingConfirmation': { question: testQuestion },
      },
    })

    const text = wrapper.find('b-text-stub')
    expect(text.text()).toBe(testQuestion)
  })

  it('renders primary button with accept text', () => {
    const testAcceptText = 'test-accept'
    const { wrapper } = shallowMountWithVuex({
      getters: {
        'app/pendingConfirmation': { positive: testAcceptText },
      },
    })

    const button = wrapper.find('b-button-stub[primary]')
    expect(button.text()).toBe(testAcceptText)
  })

  it('accepts confirmation on primary button click', () => {
    const { wrapper, mockStore } = mountWithVuex()

    const button = wrapper.find('.primary')
    button.trigger('click')
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      'app/acceptConfirmation',
      expect.anything()
    )
  })

  it('renders tertiary button with decline text', () => {
    const testDeclineText = 'test-decline'
    const { wrapper } = shallowMountWithVuex({
      getters: {
        'app/pendingConfirmation': { negative: testDeclineText },
      },
    })

    const button = wrapper.find('b-button-stub[tertiary]')
    expect(button.text()).toBe(testDeclineText)
  })

  it('declines confirmation on tertiary button click', () => {
    const { wrapper, mockStore } = mountWithVuex()

    const button = wrapper.find('.tertiary')
    button.trigger('click')
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      'app/declineConfirmation',
      expect.anything()
    )
  })
})
