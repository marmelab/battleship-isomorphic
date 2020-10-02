module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: [
        './components/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'accent-1': '#333',
            },
            spacing: {
                full: '100%',
            },
            gridTemplateRows: {
                10: 'repeat(10, minmax(0, 1fr))',
            },
            height: {
                '1/2': '50%',
            },
            maxHeight: {
                lg: '32rem',
            },
        },
    },
    variants: {},
    plugins: [],
};
