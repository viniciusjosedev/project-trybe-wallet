import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Table from '../components/Table';
import mockData from './helpers/mockData';

afterEach(() => jest.clearAllMocks());

describe('ALL TESTS', () => {
  it('Todos os testes do Header.jsx', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const valueInput = 153;
    const priceActual = mockData.USD.ask;
    const TOTAL_FIELD = 'total-field';
    const VALUE_INPUT = 'value-input';
    const DESCRIPTION_INPUT = 'description-input';
    expect(screen.getByTestId(TOTAL_FIELD).innerHTML).toEqual('0');

    expect(screen.getByRole('heading', { name: /trybewallet/i })).toBeInTheDocument();
    userEvent.type(screen.getByTestId(VALUE_INPUT), `${valueInput}`);
    expect(screen.getByTestId(VALUE_INPUT).value).toEqual(`${valueInput}`);
    userEvent.type(screen.getByTestId(DESCRIPTION_INPUT), 'coxinha');
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));

    await waitFor(() => expect(screen.getByTestId(TOTAL_FIELD).innerHTML)
      .toEqual(`${(valueInput * priceActual).toFixed(2)}`), { timeout: 4000 });

    expect(screen.getByRole('heading', { name: /trybewallet/i })).toBeInTheDocument();
    userEvent.type(screen.getByTestId(VALUE_INPUT), `${valueInput}`);
    expect(screen.getByTestId(VALUE_INPUT).value).toEqual(`${valueInput}`);
    userEvent.type(screen.getByTestId(DESCRIPTION_INPUT), 'coxinha');
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));

    await waitFor(() => expect(screen.getByTestId(TOTAL_FIELD).innerHTML)
      .toEqual(`${((valueInput * priceActual) * 2).toFixed(2)}`), { timeout: 4000 });
  });

  it('Todos os testes do Table.jsx', () => {
    renderWithRouterAndRedux(<Table />);

    expect(screen.getByText(/Table/i)).toBeInTheDocument();
  });

  it('Todos os testes do WalletForm.jsx', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const VALUE_INPUT = 'value-input';

    expect(screen.getByTestId(VALUE_INPUT).id).toEqual('0');
    userEvent.type(screen.getByTestId(VALUE_INPUT), '153');
    userEvent.type(screen.getByTestId('description-input'), 'coxinha');
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));

    await waitFor(() => expect(screen.getByTestId(VALUE_INPUT).id)
      .toEqual('1'), { timeout: 4000 });

    // expect(screen.getByTestId('currency-input').onChange).not.toBeDefined();
  });

  it('Todos os teste Login.jsx', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId('email-input'), 'aaa');
    userEvent.type(screen.getByTestId('password-input'), 'ffff');
    expect(screen.getByTestId('password-input').value).toEqual('ffff');
    expect(screen.getByText(/entrar/i).disabled).toEqual(true);
  });
});
