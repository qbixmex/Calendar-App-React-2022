import { render, fireEvent } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";
import { useUiStore } from "../../../src/hooks/useUiStore";

jest.mock('../../../src/hooks/useCalendarStore');
jest.mock('../../../src/hooks/useUiStore');

describe('Test on <FabDelete />', () => {

  const mockStartDeletingEvent = jest.fn();
  const mockCloseDateModal = jest.fn();

  beforeEach(() => jest.clearAllMocks() );
  beforeEach(() => jest.clearAllTimers() );
  
  test('Should render with default values', () => {

    useCalendarStore.mockReturnValue({
      hasEventSelected: false
    });
  
    useUiStore.mockReturnValue({
      isModalClose: false,
    });
    
    const { container } = render(
      <FabDelete />
    );

    const btn = container.querySelector('#delete-btn');
    
    expect( btn.classList ).toContain('btn');
    expect( btn.classList ).toContain('btn-danger');
    expect( btn.classList ).toContain('fab-danger');
    expect( btn.style.display ).toBe('none');

  });

  test('Should show if active event set', () => {

    useCalendarStore.mockReturnValue({
      hasEventSelected: true
    });
  
    useUiStore.mockReturnValue({
      isModalClose: true,
    });
    
    const { container } = render(
      <FabDelete />
    );

    const btn = container.querySelector('#delete-btn');

    expect( btn.style.display ).toBe('');

  });

  test('Should call startDeletingEvent and closeDateModal actions', () => {

    useCalendarStore.mockReturnValue({
      startDeletingEvent: mockStartDeletingEvent,
      hasEventSelected: true
    });
  
    useUiStore.mockReturnValue({
      closeDateModal: mockCloseDateModal,
      isModalClose: true,
    });
    
    const { container, debug } = render(
      <FabDelete />
    );

    const btn = container.querySelector('#delete-btn');

    fireEvent.click(btn);

    expect( mockStartDeletingEvent ).toHaveBeenCalled();
    expect( mockCloseDateModal ).toHaveBeenCalled();

  });

});
