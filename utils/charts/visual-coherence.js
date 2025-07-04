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
    const postTopicLut = {
        1: "Politik",
        2: "Journalismus",
        3: "Wissenschaft",
        4: "Gesundheit",
        5: "Identität",
        6: "Sport/Kultur",
        7: "Wirtschaft",
        8: "Sonstige",
        9: "Nicht erkennbar",
    };
    const visualTopicLut = {
        11: "Personen der Politik",
        12: "Eigenes Statement …",
        13: "Politische Medienmitteilung",
        14: "Politisches/juristisches Dokument",
        19: "Weitere politische Abb.",
        21: "Journalistischer Artikel",
        22: "Nachrichtenmoderation",
        23: "Weitere journalist. Produkt",
        29: "Weitere Journalismus Abb.",
        30: "Wissenschaftliche/Technik-Komm.",
        31: "… mit Quelle",
        32: "… ohne Quelle",
        40: "Gesundheit/Medizin",
        41: "Klinikpersonal",
        42: "Gesundheits-Expert*innen",
        49: "Weitere Gesundheitsthemen",
        51: "Gender",
        52: "Race/Ethnien",
        53: "Migration",
        61: "Sport",
        62: "Kultur",
        71: "Werbung",
        72: "Wirtschaftliche Kommunikation",
        79: "Weitere Wirtschafts Abb.",
        80: "Sonstige",
        99: "Nicht bestimmbar",
    };
    const superLut = {
        "Politische Komm.": ["11", "12", "13", "14", "19"],
        "Journalistisches Produkt": ["21", "22", "23", "29"],
        "Wissenschaftskomm.": ["30", "31", "32"],
        "Gesundheits-Abb.": ["40", "41", "42", "49"],
        "Gesellschafts-Abb.": ["51", "52", "53"],
        "Kulturbezogene Abb.": ["61", "62"],
        "Wirtschaftskomm.": ["71", "72", "79"],
        "Weitere": ["80"],
        "Nicht erkennbar": ["99"],
    };

    const total = rawData.length;

    // build counts of postTopics and visualTopics
    const counts = {};
    rawData.forEach((d) => {
        const postLabel = postTopicLut[d.post_topic] ?? "Nicht erkennbar";
        const visualLabel = visualTopicLut[d.visual_disinformation_topic] ?? "Nicht erkennbar";
        const key = `${postLabel}||${visualLabel}`;
        counts[key] = (counts[key] || 0) + 1; // increment count for the current value
    });

    // for each postTopic, accumulate per super_topic and build matrix

    const postTopics = Object.values(postTopicLut);
    const superTopics = Object.keys(superLut);
    const matrix = {};
    postTopics.forEach((postTopic) => {
        matrix[postTopic] = {};
        superTopics.forEach((superTopic) => {
            matrix[postTopic][superTopic] = 0;
        });
    })

    // distribute counts to matrix
    Object.entries(counts).forEach(([key, count]) => {
        // find which postTopic this visualTopic belongs to
        const [postLabel, visualLabel] = key.split("||");
        // find code ov visualLabel
        const visualCode = Object.entries(visualTopicLut)
            .find(([, vl]) => vl === visualLabel)?.[0];
        // find super_topic of visualCode
        const supLabel = Object.entries(superLut)
            .find(([, codes]) =>
                codes.includes(visualCode))?.[0] ?? "Nicht erkennbar";
        matrix[postLabel][supLabel] += count;
    });

    const colors = [
        '#34A85A', // teal
        '#E74C3C', // firebrick
        '#9B59B6', // plum
        '#1ABC9C', // sea-green
        '#2ECC71', // sage
        '#3498DB', // sky-blue
        '#F1C40F', // golden-rod
        '#E67E73', // rosy-brown
        '#95A5A6', // slate-gray
    ]

    const datasets = superTopics.map((sup, i) => ({
        label: sup,
        data: postTopics.map((postTopic) => {
            // row total for this post-topic
            const rowTotal = Object.values(matrix[postTopic]).reduce(
                (a, b) => a + b,
                0
            );
            // percent of overall (or you could do percent-of-row only)
            const percent =
                rowTotal === 0
                    ? 0
                    : (matrix[postTopic][sup] / total) * 100;
            return +percent.toFixed(1);
        }),
        backgroundColor: colors[i % colors.length],
    }));

    return {
        data: {
            labels: postTopics,
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
                        text: "Beitragsthema",
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