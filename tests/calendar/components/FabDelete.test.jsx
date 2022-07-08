import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { store } from "../../../src/store";

describe('Test on <FabDelete />', () => {
  test('Should render with defaults', () => {
    const { container, debug } = render(
      <Provider store={ store }>
        <MemoryRouter>
          <FabDelete />
        </MemoryRouter>
      </Provider>
    );

    const btn = container.querySelector('#delete-btn');
    btn.style.display = '';

    debug();
  });
});