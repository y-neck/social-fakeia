import {
    Chart as ChartJS,
    BubbleController,
    TimeScale,
    CategoryScale,
    PointElement,
    Tooltip,
    Legend,
    Title
} from "chart.js";
import { timeParse } from "d3-time-format";
import "chartjs-adapter-date-fns";
ChartJS.register(BubbleController, TimeScale, CategoryScale, PointElement, Tooltip, Legend, Title);
export function getChartType() {
    return "bubble";
}
export function getChartConfig(rawData) {
    const postTopicLut = {
        "1": "Politik",
        "2": "Journalismus",
        "3": "Wissenschaft",
        "4": "Gesundheit",
        "5": "Identität",
        "6": "Sport/Kultur",
        "7": "Wirtschaft",
        "8": "Sonstige",
        "9": "Nicht erkennbar"
    };
    const topicColorLut = {
        "1": '#34A85A', // teal
        "2": '#E74C3C', // firebrick
        "3": '#9B59B6', // plum
        "4": '#1ABC9C', // sea-green
        "5": '#2ECC71', // sage
        "6": '#3498DB', // sky-blue
        "7": '#F1C40F', // golden-rod
        "8": '#E67E73', // rosy-brown
        "9": '#95A5A6', // slate-gray
    };
    const parseDate = timeParse("%d.%m.%Y");
    // first, group posts by (date, topic)
    /** Map<key, { count: number, titles: string[] }> */
    const group = new Map();
    rawData.forEach((d) => {
        const dt = parseDate(d.date);
        if (!dt || dt <= parseDate("01.01.2020"))
            return;
        const topic = postTopicLut[d.post_topic] || "Nicht erkennbar";
        const key = dt.getTime() + "|" + topic;
        if (!group.has(key))
            group.set(key, {
                count: 0,
                titles: []
            });
        const rec = group.get(key);
        rec.count++;
        // collect each article_title
        rec
            .titles
            .push(d.article_title || "(kein Titel)");
    });
    // build points & colors
    const points = [];
    const colors = [];
    for (const [key, {
        count,
        titles
    }
    ] of group.entries()) {
        const [tms,
            topic] = key.split("|");
        points.push({
            x: new Date(+ tms),
            y: topic,
            r: Math.sqrt(count) * 3,
            // stash titles on each point:
            titles
        });
        // pick color by topic key:
        const topicKey = Object
            .entries(postTopicLut)
            .find(([, name]) => name === topic)
            ?.[0];
        colors.push(topicColorLut[topicKey] || "#888");
    }
    const topicLabels = Object.values(postTopicLut);
    return {
        data: {
            datasets: [
                {
                    label: "Beiträge nach Thema über Zeit",
                    data: points,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: "time",
                    time: {
                        unit: "year",
                        tooltipFormat: "dd.MM.yyyy",
                        displayFormats: {
                            month: "MMM yyyy"
                        }
                    },
                    bounds: "ticks",
                    min: "2020-01-01",
                    max: "2025-05-30",
                    ticks: {
                        color: "var(--color-text)"
                    },
                    title: {
                        display: true,
                        text: "Datum",
                        color: "var(--color-text)"
                    }
                },
                y: {
                    type: "category",
                    labels: topicLabels,
                    ticks: {
                        color: "var(--color-text)"
                    },
                    title: {
                        display: true,
                        text: "Thema des Beitrags",
                        color: "var(--color-text)"
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: "Inhaltsverteilung der Beiträge über Zeit"
                },
                tooltip: {
                    callbacks: {
                        // show date & then list of titles
                        title: (ctx) => {
                            const d = ctx[0].parsed.x;
                            return new Date(d).toLocaleDateString("de-CH");
                        },
                        label: (ctx) => {
                            const p = ctx.raw;
                            return [
                                `Thema: ${p.y}`, `Anzahl Beiträge: ${Math.round((p.r / 3) ** 2)}`
                            ];
                        },
                        afterLabel: (ctx) => {
                            // show each title on a new line
                            return ctx
                                .raw
                                .titles
                                .map((t) => `– ${t}`);
                        }
                    }
                },
                legend: {
                    display: false
                }
            },
            elements: {
                point: {
                    hoverRadius: 6,
                    hoverBorderWidth: 1,
                    hoverBorderColor: "var(--color-text)"
                }
            }
        }
    };
}
export default { getChartType, getChartConfig };