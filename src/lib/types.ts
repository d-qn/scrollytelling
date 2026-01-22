export interface VizState {
    [key: string]: any;
}

export interface StoryStep {
    content: string; // HTML string or text
    vizType: 'datawrapper' | 'custom' | 'image' | 'none';
    vizProps: {
        chartId?: string; // For Datawrapper
        component?: string; // For custom components mapping
        src?: string; // For images
        state?: VizState; // For interactivity (postMessage etc)
        [key: string]: any;
    };
}

export interface StoryData {
    title: string;
    intro: string;
    steps: StoryStep[];
}
