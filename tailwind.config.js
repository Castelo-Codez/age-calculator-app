/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html"],
    theme: {
        extend: {
            colors: {
                "p-Purple": "hsl(259, 100%, 65%)",
                "p-Lightred": "hsl(0, 100%, 67%)",
                "N-White": " hsl(0, 0%, 100%)",
                "N-Offwhite": "hsl(0, 0%, 94%)",
                "N-Lightgrey": "hsl(0, 0%, 86%)",
                "N-Smokeygrey": "hsl(0, 1%, 44%)",
                "N-Offblack": "hsl(0, 0%, 8%)",
            },
            fontSize: {
                Inputsfont: "32px",
            },
            width: {
                "flex-width-lg": "calc(75% / 3)",
                "flex-width-sm": "calc(95% / 3)",
            },
        },
    },
    plugins: [],
};
