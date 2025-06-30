import {
    Chart as ChartJS,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
    plugins,
} from "chart.js";


ChartJS.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title
);

export function getChartType() {
    return "bar";
}

export function getChartConfig(rawData) {
    const complexityLut = {
        "11": "Bild ohne Bearbeitung",
        "12": "Bild tiefer Komplexität",
        "13": "Bild hoher Komplexität",
        "14": "Irreführende Visualisierung",
        "15": "Eigens erstellte Grafik",
        "21": "Video ohne Bearbeitung",
        "22": "Video tiefer Komplexität",
        "23": "Video mittlerer Komplexität",
        "24": "Video hoher Komplexität",
        "99": "Nicht erkennbar",
    };

    // count occurences
    const counts = {};
    rawData.forEach((d) => {
        const key = String(d.visual_disinformation_category);
        counts[key] = (counts[key] || 0) + 1; // increment count for the current value
    });

    const total = rawData.length;

    // compute relative frequencies
    const entries = Object.keys(complexityLut).map((key) => {
        const label = complexityLut[key];
        const n = counts[key] || 0;
        const rel = (n / total) * 100;
        // distinguish between image and video
        const colorGroup = key.charAt(0);
        return { label, n, rel, colorGroup };
    });

    // assign color per group
    const groupColorLut = {
        "1": "#1ABC9C", // images
        "2": "#3498DB", // videos
        "9": "#A8A8A8", // nicht erkennbar
    }

    // mappings
    const labels = entries.map((d) => d.label);
    const data = entries.map((d) => d.rel);
    const colors = entries.map((d) => groupColorLut[d.colorGroup]);


    return {
        data: {
            labels,
            datasets: [
                {
                    label: "Relative Häufigkeit (%)",
                    data,
                    backgroundColor: colors.map((d) => d),
                },
            ],
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: "var(--color-text)",
                        maxRotation: 45,
                        minRotation: 45,
                    },
                    title: {
                        display: true,
                        text: "Technische Komplexität",
                        color: "var(--color-text)",
                    },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Relative Häufigkeit (%)",
                        color: "var(--color-text)",
                    },
                    ticks: {
                        color: "var(--color-text)",
                    },
                },
            }
        }
    }
}

export default { getChartType, getChartConfig };