const headers = {
    "x-rapidapi-host": "sportapi7.p.rapidapi.com",
    "x-rapidapi-key": "0d8326307cmsh035932457657b17p1c67c5jsn5f46de700547"
};

const players = ["Neymar", "Mbappe"];

async function run() {
    for (const player of players) {
        console.log(`Searching for ${player}...`);
        const res = await fetch(`https://sportapi7.p.rapidapi.com/api/v1/search/all?q=${encodeURIComponent(player)}`, { headers });
        const data = await res.json();
        const results = data.results || [];
        for (const item of results) {
            const e = item.entity;
            if (e && e.type === "player" || (e && e.name)) {
                console.log(`Found: ${e.name} (ID: ${e.id}) [Type: ${item.type}]`);
            }
        }
    }
}
run();
