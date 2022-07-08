import { configureStore } from "@reduxjs/toolkit";
import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { useUiStore } from "../../src/hooks/useUiStore";
import { uiSlice } from "../../src/store";

const getMockStore = ( initialState ) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer
    },
    preloadedState: {
      ui: { ...initialState }
    }
  });
};

describe('Test on useUiStore', () => {
  test('Should return default values', () => {

    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    expect(result.current).toEqual({
      isDateModalOpen: false,
      isModalClose: true,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
      toggleDateModal: expect.any(Function),
    });
  });

  test('isDateModalOpen should turn true or false when openDateModal is called', () => {

    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    const { openDateModal } = result.current;

    act(() => openDateModal());

    expect(result.current.isDateModalOpen).toBeTruthy();

  });

  test('isDateModalOpen should turn false or false when closeDateModal is called', () => {

    const mockStore = getMockStore({ isDateModalOpen: true });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    act(() => result.current.closeDateModal());

    expect(result.current.isDateModalOpen).toBeFalsy();

  });

  test('isDateModalOpen should toggle state when toggleDateModal is called', () => {

    const mockStore = getMockStore({ isDateModalOpen: true });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    act(() => result.current.toggleDateModal());

    expect(result.current.isDateModalOpen).toBeFalsy();

    act(() => result.current.toggleDateModal());

    expect(result.current.isDateModalOpen).toBeTruthy();
  });
});