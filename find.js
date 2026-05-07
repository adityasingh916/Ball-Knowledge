const headers = {
    "x-rapidapi-host": "sportapi7.p.rapidapi.com",
    "x-rapidapi-key": "0d8326307cmsh035932457657b17p1c67c5jsn5f46de700547"
};

const teams = ["Argentina", "France", "Brazil", "England", "Portugal"];

async function run() {
    for (const team of teams) {
        const res = await fetch(`https://sportapi7.p.rapidapi.com/api/v1/search/all?q=${team}`, { headers });
        const data = await res.json();
        const results = data.results || [];
        for (const item of results) {
            const e = item.entity;
            if (e && e.name === team && e.national === true && e.sport?.name === "Football") {
                console.log(`${team} ID: ${e.id}`);
                break;
            }
        }
    }
}
run();
