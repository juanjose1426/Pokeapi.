let pokemones = [];
let totalPokes = 1025;

async function conexionlista(filtrotipo) {
  try {
    let url = filtrotipo === "all"
      ? `https://pokeapi.co/api/v2/pokemon?limit=${totalPokes}`
      : `https://pokeapi.co/api/v2/type/${filtrotipo}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error HTTP ${res.status} en ${url}`);
    }

    const data = await res.json();

    return filtrotipo === "all"
      ? data.results
      : data.pokemon.map(p => ({
          name: p.pokemon.name,
          url: p.pokemon.url
        }));

  } catch (error) {
    console.error("❌ Error al conectar con la API:", error);
    alert("No se pudo conectar con la API. Revisa tu conexión o intenta más tarde.");
    return []; // Evita romper la app
  }
}

async function general() {
  if (pokemones.length === 0) {
    pokemones = await conexionlista("all");
  }
  home();
}

document.addEventListener("DOMContentLoaded",general);