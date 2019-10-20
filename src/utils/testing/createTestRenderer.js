import { Store } from 'vuex-mock-store' // eslint-disable-line import/no-extraneous-dependencies
import { shallowMount, mount } from '@vue/test-utils' // eslint-disable-line import/no-extraneous-dependencies
import Button from '../../components/_base/Button'

// register some important modules that shouldn't be stubbed because of their functionality
const defaultStubs = {
  'b-button': Button,
}

export const createRenderer = (
  Component,
  defaultState = {},
  defaultGetters = {},
  shallow = true,
  customStubsArray = []
) => {
  const customStubs = customStubsArray.reduce((map, stub) => {
    map[stub] = true // eslint-disable-line no-param-reassign
    return map
  }, {})

  const mountWithVuex = (customState = {}, customGetters = {}) => {
    const state = {
      ...defaultState,
      ...customState,
    }

    const getters = {
      ...defaultGetters,
      ...customGetters,
    }

    const mockStore = new Store({
      state,
      getters,
    })

    const mocks = {
      $store: mockStore,
    }

    const stubs = {
      ...defaultStubs,
      ...customStubs,
    }

    const wrapper = shallow
      ? shallowMount(Component, { mocks, stubs })
      : mount(Component, { mocks, stubs })

    return { wrapper, mockStore }
  }
  return mountWithVuex
}

export default createRenderer
