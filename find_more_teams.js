const headers = {
    "x-rapidapi-host": "sportapi7.p.rapidapi.com",
    "x-rapidapi-key": "2e5bec3cabmshf2baedca53add5fp17550djsnce64ff731f17"
};

const teams = ["Spain", "Germany", "Italy", "Netherlands", "Uruguay", "Croatia", "Belgium", "USA"];

async function run() {
    for (const team of teams) {
        const res = await fetch(`https://sportapi7.p.rapidapi.com/api/v1/search/all?q=${team}`, { headers });
        const data = await res.json();
        const results = data.results || [];
        for (const item of results) {
            const e = item.entity;
            if (e && e.name === team && e.national === true && e.sport?.name === "Football") {
                console.log(`${team}: ${e.id}`);
                break;
            }
        }
    }
}
run();
