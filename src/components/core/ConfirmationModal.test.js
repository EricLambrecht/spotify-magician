import ConfirmationModal from './ConfirmationModal.vue'
import createTestRenderer from '../../utils/testing/createTestRenderer'

describe('ConfirmationModal', () => {
  const dummyConfirmation = {
    headline: 'headline',
    negative: 'negative',
    positive: 'positive',
  }

  const shallowMountWithVuex = createTestRenderer(
    ConfirmationModal,
    {
      app: {
        dummyConfirmation,
      },
    },
    {
      'app/pendingConfirmation': dummyConfirmation,
      'app/confirmationIsPending': true,
    },
    true,
    ['b-modal', 'b-text', 'b-button-group', 'b-button']
  )

  const mountWithVuex = createTestRenderer(
    ConfirmationModal,
    {
      app: {
        dummyConfirmation,
      },
    },
    {
      'app/pendingConfirmation': dummyConfirmation,
      'app/confirmationIsPending': true,
    },
    true,
    ['b-modal', 'b-text', 'b-button-group']
  )

  it("uses the pending confirmation's headline as the modal headline", () => {
    const testHeadline = 'test-headline'
    const { wrapper } = shallowMountWithVuex(
      {},
      {
        'app/pendingConfirmation': { headline: testHeadline },
      }
    )

    const modal = wrapper.find('b-modal-stub')
    expect(modal.attributes('headline')).toBe(testHeadline)
  })

  it("shows it's own modal as soon as pendingConfirmation is true", () => {
    const { wrapper } = shallowMountWithVuex(
      {},
      {
        'app/confirmationIsPending': true,
      }
    )

    const modal = wrapper.find('b-modal-stub')
    expect(modal.attributes('show')).toBe('true')
  })

  it("hides it's own modal as soon as pendingConfirmation is false", () => {
    const { wrapper } = shallowMountWithVuex(
      {},
      {
        'app/confirmationIsPending': false,
      }
    )

    const modal = wrapper.find('b-modal-stub')
    expect(modal.attributes('show')).toBeUndefined()
  })

  it('renders question into b-text element', () => {
    const testQuestion = 'Wazzup?'
    const { wrapper } = shallowMountWithVuex(
      {},
      {
        'app/pendingConfirmation': { question: testQuestion },
      }
    )

    const text = wrapper.find('b-text-stub')
    expect(text.text()).toBe(testQuestion)
  })

  it('renders primary button with accept text', () => {
    const testAcceptText = 'test-accept'
    const { wrapper } = shallowMountWithVuex(
      {},
      {
        'app/pendingConfirmation': { positive: testAcceptText },
      }
    )

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
    const { wrapper } = shallowMountWithVuex(
      {},
      {
        'app/pendingConfirmation': { negative: testDeclineText },
      }
    )

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
