import React, { useContext } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Button } from 'reactstrap';
import { ToastContext, ToastProvider } from '../../contexts/toast';

function TestComponent() {
  const { showToast } = useContext(ToastContext);

  return (
    <>
      <h1>Test Component</h1>
      <Button
        onClick={() =>
          showToast({
            title: 'Test',
            body: 'Toast Context',
          })
        }
      >
        Show toast
      </Button>
    </>
  );
}

describe('Toast Context', () => {
  beforeAll(() => jest.useFakeTimers());

  afterAll(() => jest.useRealTimers());

  it('should call showToast successfully', async () => {
    const spyTimeout = jest.spyOn(window, 'setTimeout');
    render(
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText(/Show toast/i));

    await waitFor(() => expect(spyTimeout).toHaveBeenCalled());
  });
});
