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
    const actorTypeLut = {
        "1": "Privatperson/Individuum",
        "2": "Kollektivakteur",
        "9": "Nicht erkennbar"
    }

    const actorRoleLut = {
        "1": "Politik",
        "2": "Journalismus",
        "3": "Wissenschaft",
        "4": "Gesundheit",
        "5": "Sport",
        "6": "Kultur",
        "7": "Wirtschaft",
        "8": "Bildung",
        "9": "Weitere",
        "99": "Nicht erkennbar"
    }

    // color palette
    const palette = [
        '#34A85A', // teal
        '#E74C3C', // firebrick
        '#9B59B6', // plum
        '#1ABC9C', // sea-green
        '#2ECC71', // sage
        '#3498DB', // sky-blue
        '#F1C40F', // golden-rod
        '#E67E73', // rosy-brown
        '#95A5A6', // slate-gray
        "#8C8C8C", // Nicht erkennbar
    ];

    // build counts per (type, role) and track totals per type
    const counts = {};     // number of posts with this type and role
    const totals = {};     // sum over roles (total number of posts with this type)
    rawData.forEach((d) => {
        const type = actorTypeLut[d.source_actor] ?? "Andere";
        const role = actorRoleLut[d.source_role] ?? "Andere";
        counts[type] = counts[type] || {};
        counts[type][role] = (counts[type][role] || 0) + 1;
        totals[type] = (totals[type] || 0) + 1;
    });

    // map overall percentage
    const overall = rawData.length;
    const types = Object.keys(actorTypeLut).map((key) => actorTypeLut[key]);
    const roles = Object.keys(actorRoleLut).map((key) => actorRoleLut[key]);

    // build datasets per role with value per type
    // each value is the relative frequency of posts with that type and role
    const datasets = roles.map((role, index) => ({
        label: role,
        backgroundColor: palette[index],
        data: types.map((type) => {
            const n = counts[type]?.[role] || 0;
            return (n / overall) * 100
        })
    }))


    return {
        data: {
            labels: types,
            datasets
        },
        options: {
            indexAxis: "y", // make bar chart display horizontal bars
            plugins: {
                legend: {
                    display: true,
                    position: "right",
                    labels: {
                        color: "var(--color-text)",
                    }

                }
            },
            scales: {
                x: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => `${value}%`,
                        color: "var(--color-text)",
                    },
                    title: {
                        display: true,
                        text: "Relative Häufigkeit",
                        color: "var(--color-text)",
                    },
                },
                y: {
                    beginAtZero: true,
                    stacked: true,
                    title: {
                        text: "Akteurstyp",
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