import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonedInput from '@/src/shared/ui/ButtonedInput/ButtonedInput';

it('does nothing on button click when the input is empty', async () => {
  const mockHandleClick = jest.fn();

  render(<ButtonedInput onButtonClick={mockHandleClick} buttonText="asdf" />);

  const button = screen.getByRole('button', { name: 'asdf' });
  const user = userEvent.setup();

  await user.click(button);

  expect(mockHandleClick).not.toHaveBeenCalled();
});
