import { render, screen } from '@testing-library/react';
import Avatar from '../components/Avatar/index.tsx';

describe('Avatar component', () => {
    test('renders image with alt text', () => {
        const altText = 'avatar image';
        const imageUrl = 'https://example.com/avatar.jpg';
        render(<Avatar src={imageUrl} alt={altText} />);
        const avatarImage = screen.getByAltText(altText);
        expect(avatarImage).toBeInTheDocument();
        expect(avatarImage).toHaveAttribute('src', imageUrl);
    });

    test('sets data attributes correctly', () => {
        const dataAttributes = {
            theme: 'light',
            size: 'medium',
            type: 'square',
        };
        render(<Avatar {...dataAttributes} />);
        const avatarContainer = screen.getByTestId('avatar-container');
        expect(avatarContainer).toHaveAttribute('data-theme', dataAttributes.theme);
        expect(avatarContainer).toHaveAttribute('data-size', dataAttributes.size);
        expect(avatarContainer).toHaveAttribute('data-type', dataAttributes.type);
    });
});
