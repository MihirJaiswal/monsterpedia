interface TypeEffectivenessValues {
    [key: string]: number | string;
  }

  const typeEffectiveness: { [key: string]: TypeEffectivenessValues } = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5, fighting: 2, image: '/types/normal.png' },
  fire: { fire: 0.5, water: 2, grass: 0.5, ice: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5, ground: 2, image: '/types/fire.png' },
  water: { fire: 0.5, water: 0.5, grass: 2, ground: 0.5, rock: 0.5, dragon: 0.5, electric: 2, image: '/types/water.png' },
  electric: { water: 0.5, electric: 0.5, grass: 2, ground: 2, flying: 0.5, dragon: 0.5, image: '/types/electric.png' },
  grass: { fire: 2, water: 0.5, grass: 0.5, poison: 2, ground: 0.5, flying: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 0.5, ice: 2, image: '/types/grass.png' },
  ice: { fire: 2, ice: 0.5, fighting: 2, rock: 2, steel: 2, image: '/types/ice.png' },
  fighting: { flying: 2, poison: 2, bug: 0.5, psychic: 2, rock: 0.5, dark: 0.5, steel: 0.5, fairy: 2, image: '/types/fighting.png' },
  poison: { grass: 0.5, poison: 0.5, ground: 2, rock: 1, ghost: 1, steel: 1, fairy: 0.5, psychic: 2, image: '/types/poison.png' },
  ground: { water: 2, grass: 2, ice: 2, poison: 0.5, rock: 0.5, electric: 0, bug: 1, image: '/types/ground.png' },
  flying: { grass: 0.5, electric: 2, fighting: 0.5, bug: 0.5, rock: 2, steel: 1, ice: 2, image: '/types/flying.png' },
  psychic: { fighting: 0.5, psychic: 0.5, bug: 2, ghost: 2, dark: 2, image: '/types/psychic.png' },
  bug: { fire: 2, grass: 0.5, fighting: 0.5, poison: 2, flying: 2, psychic: 1, rock: 2, ghost: 1, steel: 1, fairy: 0.5, image: '/types/bug.png' },
  rock: { normal: 0.5, fire: 0.5, water: 2, grass: 2, fighting: 2, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, steel: 2, image: '/types/rock.png' },
  ghost: { normal: 0, fighting: 0, poison: 0.5, bug: 0.5, ghost: 2, dark: 2, image: '/types/ghost.png' },
  dragon: { fire: 0.5, water: 0.5, electric: 0.5, grass: 0.5, ice: 2, dragon: 2, fairy: 2, image: '/types/dragon.png' },
  dark: { fighting: 2, psychic: 0, bug: 2, ghost: 0.5, dark: 0.5, fairy: 2, image: '/types/dark.png' },
  steel: { normal: 0.5, fire: 2, grass: 0.5, ice: 0.5, fighting: 2, poison: 0, ground: 2, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 0.5, dragon: 0.5, steel: 0.5, fairy: 0.5, image: '/types/steel.png' },
  fairy: { fighting: 0.5, poison: 2, bug: 0.5, dragon: 0, dark: 0.5, steel: 2, image: '/types/fairy.png' },
};

export default typeEffectiveness;
