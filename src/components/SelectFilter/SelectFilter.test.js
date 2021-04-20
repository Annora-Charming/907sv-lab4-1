import { makeTestStore, testRender } from '../../setupTests';
import { fireEvent, screen } from '@testing-library/react';
import SelectFilter from './SelectFilter';
import { ACTION_TYPES, initialState as originalState } from '../Store';

describe(' Тесты SelectFilter > checkbox фильтра выполненности всех дел', () => {
  test(' Отображение выбранного checkbox"а фильтра выполненности всех дел ', () => {
    const initialState = {
      ...originalState,
      isFilterDone: true
    };
    const store = makeTestStore({ initialState });
    testRender(<SelectFilter />, { store });
    const filterCheckbox = screen.getByTestId('filterCheckbox');
    expect(filterCheckbox).toBeInTheDocument();
    expect(filterCheckbox).toHaveAttribute('checked');
  });

  test(' Отображение не выбранного checkbox"а фильтра выполненности всех дел ', () => {
    const store = makeTestStore();
    testRender(<SelectFilter />, { store });
    const filterCheckbox = screen.getByTestId('filterCheckbox');
    expect(filterCheckbox).toBeInTheDocument();
    expect(filterCheckbox).not.toHaveAttribute('checked');
  });

  test(' Фильтр выполненности всех дел "работает" (filterAction вызывается в нужном месте) ', () => {
    const store = makeTestStore();
    testRender(<SelectFilter />, { store });
    const filterCheckbox = screen.getByTestId('filterCheckbox');
    expect(store.dispatch).not.toBeCalled();
    fireEvent.click(filterCheckbox);
    expect(store.dispatch).toBeCalledWith({
      type: ACTION_TYPES.IS_FILTER_DONE
    });
  });
});
