const headers = {
    "x-rapidapi-host": "sportapi7.p.rapidapi.com",
    "x-rapidapi-key": "0d8326307cmsh035932457657b17p1c67c5jsn5f46de700547"
};

const ids = [750, 12994, 121133, 826024];

async function run() {
    for (const id of ids) {
        const res = await fetch(`https://sportapi7.p.rapidapi.com/api/v1/player/${id}`, { headers });
        const data = await res.json();
        if (data.player) {
            console.log(`ID ${id} is: ${data.player.name}`);
        } else {
            console.log(`ID ${id} failed:`, data);
        }
    }
}
run();
