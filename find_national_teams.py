import urllib.request
import json

headers = {
    "x-rapidapi-host": "sportapi7.p.rapidapi.com",
    "x-rapidapi-key": "0d8326307cmsh035932457657b17p1c67c5jsn5f46de700547"
}

teams = ["Argentina", "France", "Brazil", "England", "Portugal"]

for team in teams:
    req = urllib.request.Request(f"https://sportapi7.p.rapidapi.com/api/v1/search/all?q={team}", headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            found = False
            for result in data.get("results", []):
                entity = result.get("entity", {})
                if entity.get("name") == team and entity.get("national") == True and entity.get("sport", {}).get("name") == "Football":
                    print(f"{team} ID: {entity.get('id')}")
                    found = True
                    break
            if not found:
                print(f"Could not find exact match for {team}")
    except Exception as e:
        print(f"Error searching {team}: {e}")
