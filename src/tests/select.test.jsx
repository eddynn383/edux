// import { render, screen, fireEvent } from '@testing-library/react';
// import Select from './index';

// const options = [
//     { value: 1, label: 'Option 1' },
//     { value: 2, label: 'Option 2' },
//     { value: 3, label: 'Option 3' },
//     { value: 4, label: 'Option 4' },
//     { value: 5, label: 'Option 5' },
// ];

// describe('Select component', () => {
//     test('renders with placeholder', () => {
//         render(<Select placeholder="Select an option" options={options} />);
//         const placeholderText = screen.getByText('Select an option');
//         expect(placeholderText).toBeInTheDocument();
//     });

//     test('renders selected option', () => {
//         render(<Select options={options} selectedValue={options[1]} />);
//         const selectedOptionText = screen.getByText('Option 2');
//         expect(selectedOptionText).toBeInTheDocument();
//     });

//     test('opens dropdown on click', () => {
//         render(<Select options={options} />);
//         const selectContainer = screen.getByRole('button', { name: /select/i });
//         fireEvent.click(selectContainer);
//         const dropdown = screen.getByTestId('dropdown');
//         expect(dropdown).toBeInTheDocument();
//     });

//     test('filters options based on search input', () => {
//         render(<Select options={options} isSearchable />);
//         const selectContainer = screen.getByRole('button', { name: /select/i });
//         fireEvent.click(selectContainer);
//         const searchInput = screen.getByRole('textbox');
//         fireEvent.change(searchInput, { target: { value: 'option 1' } });
//         const filteredOption = screen.getByText('Option 1');
//         expect(filteredOption).toBeInTheDocument();
//     });

//     test('calls onChange with selected option', () => {
//         const onChange = jest.fn();
//         render(<Select options={options} onChange={onChange} />);
//         const selectContainer = screen.getByRole('button', { name: /select/i });
//         fireEvent.click(selectContainer);
//         const option = screen.getByText('Option 1');
//         fireEvent.click(option);
//         expect(onChange).toHaveBeenCalledWith(options[0]);
//     });
// });
