import { Store } from 'vuex-mock-store' // eslint-disable-line import/no-extraneous-dependencies
import merge from 'lodash/fp/merge'
import { shallowMount, mount } from '@vue/test-utils' // eslint-disable-line import/no-extraneous-dependencies
import Button from '../../components/_base/Button'

// register some important modules that shouldn't be stubbed because of their functionality
const specialStubs = {
  'b-button': Button,
}

const defaultOptions = {
  props: {},
  state: {},
  getters: {},
  stubs: [],
  shallow: true,
}

export const createRenderer = (Component, options = defaultOptions) => {
  const mergedOptions = merge(defaultOptions, options)
  const {
    props: defaultProps,
    state: defaultState,
    getters: defaultGetters,
    stubs: defaultStubs,
    shallow,
  } = mergedOptions

  const customStubsMap = defaultStubs.reduce((map, stub) => {
    map[stub] = true // eslint-disable-line no-param-reassign
    return map
  }, {})

  const defaultCustoms = {
    props: {},
    state: {},
    getters: {},
  }

  const mountWithVuex = (mountOptions = defaultCustoms) => {
    const mergedCustoms = merge(defaultCustoms, mountOptions)
    const {
      state: customState,
      getters: customGetters,
      props: customProps,
    } = mergedCustoms

    const state = merge(defaultState, customState)
    const getters = merge(defaultGetters, customGetters)

    const mockStore = new Store({
      state,
      getters,
    })

    const mocks = {
      $store: mockStore,
    }

    const stubs = merge(specialStubs, customStubsMap)
    const propsData = merge(defaultProps, customProps)

    const wrapper = shallow
      ? shallowMount(Component, { mocks, stubs, propsData })
      : mount(Component, { mocks, stubs, propsData })

    return { wrapper, mockStore }
  }
  return mountWithVuex
}

export default createRenderer
