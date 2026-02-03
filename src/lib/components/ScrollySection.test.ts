import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import ScrollySection from './ScrollySection.svelte';
import type { StoryStep } from '$lib/types';

describe('ScrollySection', () => {
    const mockSteps: StoryStep[] = [
        {
            content: '<h1>Step 1</h1>',
            vizType: 'datawrapper',
            vizProps: { chartId: '123' }
        },
        {
            content: '<h1>Step 2</h1>',
            vizType: 'image',
            vizProps: { src: 'test.jpg' }
        }
    ];

    it('renders step content correctly', () => {
        render(ScrollySection, { props: { steps: mockSteps, format: 'standalone' } });

        expect(screen.getByText('Step 1')).toBeInTheDocument();
        expect(screen.getByText('Step 2')).toBeInTheDocument();
    });

    it('applies embed-mode classes when format is embed', () => {
        // This test mostly checks if the component mounts without crashing with embed props
        const { container } = render(ScrollySection, { props: { steps: mockSteps, format: 'embed' } });
        const mainDiv = container.querySelector('div.relative.w-full');
        expect(mainDiv).toHaveClass('h-full');
        expect(mainDiv).toHaveClass('overflow-y-scroll');
    });
});
