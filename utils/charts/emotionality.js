import {
    Chart as ChartJS,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
} from "chart.js";
ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);
export function getChartType() {
    return "bar";
}
export function getChartConfig(rawData) {
    const emotionalityLut = {
        "1": "Freude/Humor",
        "2": "Trauer",
        "3": "Wut/Ärger",
        "4": "Anwiderung",
        "5": "Angst",
        "6": "Erstaunen",
        "7": "Nicht erkennbar"
    };
    const totalRows = rawData.length;
    // compute frequencies
    function computeFrequencies(fieldName, sourceLabel) {
        const counts = {};
        rawData.forEach((d) => {
            const value = d[fieldName];
            if (!counts[value]) {
                counts[value] = 0; // initialize count for new value
            }
            counts[value]++; // increment count for the current value
        });
        return Object
            .entries(counts)
            .map(([key, count]) => ({
                sentiment: emotionalityLut[key] || "Nicht erkennbar",
                relative_freq: (count / totalRows) * 100,
                source: sourceLabel
            }))
    }
    // map json keys to frequencies
    const postSentiment = computeFrequencies("post_sentiment", "Beitrag");
    const visualSentiment = computeFrequencies("visual_sentiment", "Visuelles Artefakt");
    const allSentiments = Object.values(emotionalityLut)
    // initialise dataset arrays with zero values
    const postData = allSentiments.map(label => postSentiment.find(d => d.sentiment === label)
        ?.relative_freq || 0);
    const visualData = allSentiments.map(label => visualSentiment.find(d => d.sentiment === label)
        ?.relative_freq || 0);
    return {
        data: {
            labels: allSentiments,
            datasets: [
                {
                    label: "Beitragsemotionalität",
                    data: postData,
                    backgroundColor: '#1ABC9C', // sea-green
                }, {
                    label: "Visuelles Artefakt",
                    data: visualData,
                    backgroundColor: '#E67E73', // rosy-brown
                }
            ]
        },
        options: {
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: "var(--color-text)",
                        maxRotation: 45,
                        minRotation: 45
                    },
                    title: {
                        display: true,
                        text: "Emotionalität",
                        color: "var(--color-text)"
                    },
                    stacked: false
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Relative Häufigkeit (%)",
                        color: "var(--color-text)"
                    },
                    ticks: {
                        color: "var(--color-text)",
                        callback: (val) => `${val}%`
                    }
                }
            }
        }
    }
}
export default { getChartType, getChartConfig };