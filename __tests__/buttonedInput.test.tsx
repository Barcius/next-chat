import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonedInput from '@/src/shared/ui/ButtonedInput/ButtonedInput';

it('calls onSubmit when button is clicked', async () => {
  const mockHandleSubmit = jest.fn();
  const user = userEvent.setup();

  render(
    <ButtonedInput
      buttonText="asdf"
      value="hello"
      onChange={() => {}}
      onSubmit={mockHandleSubmit}
    />,
  );

  const button = screen.getByRole('button', { name: 'asdf' });
  await user.click(button);

  expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
});

it('calls onChange when typing', async () => {
  const mockHandleChange = jest.fn();
  const user = userEvent.setup();

  render(
    <ButtonedInput buttonText="asdf" value="" onChange={mockHandleChange} onSubmit={() => {}} />,
  );

  const input = screen.getByRole('textbox');
  await user.type(input, 'hello');

  expect(mockHandleChange).toHaveBeenCalledTimes(5);
  expect(mockHandleChange).toHaveBeenLastCalledWith('hello');
});
