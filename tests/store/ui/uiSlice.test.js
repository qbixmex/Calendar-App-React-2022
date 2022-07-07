import {
  uiSlice,
  onOpenDateModal,
  onCloseDateModal
} from "../../../src/store/ui/uiSlice";

describe('Test on uiSlice', () => {
  test('Should back to initial state named "ui"', () => {
    expect(uiSlice.name).toBe('ui');
    expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false });
  });

  test('Should change isDateModalOpen', () => {

    let state = uiSlice.getInitialState();

    state = uiSlice.reducer( state, onOpenDateModal() );
    expect( state.isDateModalOpen ).toBeTruthy();

    state = uiSlice.reducer( state, onCloseDateModal() );
    expect( state.isDateModalOpen ).toBeFalsy();

  });
})
