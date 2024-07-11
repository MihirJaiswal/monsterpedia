import Image from 'next/image';
import typeEffectiveness from './TypeEffectiveness';

interface TypeWeaknessProps {
  types: { type: { name: string } }[];
}

interface EffectivenessValues {
  [key: string]: number;
}

interface TypeData {
  effectiveness: EffectivenessValues;
  image: string;
}

const TypeWeakness = ({ types }: TypeWeaknessProps) => {
  const typeEffectivenessMap: { [key: string]: number } = {};

  types.forEach(({ type }) => {
    const effectiveness = typeEffectiveness[type.name];
    for (const [againstType, multiplier] of Object.entries(effectiveness)) {
      if (againstType !== 'image') {
        if (typeEffectivenessMap[againstType]) {
          typeEffectivenessMap[againstType] *= multiplier;
        } else {
          typeEffectivenessMap[againstType] = multiplier;
        }
      }
    }
  });

  const weaknesses = Object.entries(typeEffectivenessMap)
    .filter(([type, multiplier]) => multiplier > 1)
    .map(([type, multiplier]) => ({ type, multiplier }));

  const resistances = Object.entries(typeEffectivenessMap)
    .filter(([type, multiplier]) => multiplier < 1 && multiplier > 0)
    .map(([type, multiplier]) => ({ type, multiplier }));

  const immunities = Object.entries(typeEffectivenessMap)
    .filter(([type, multiplier]) => multiplier === 0)
    .map(([type, multiplier]) => ({ type, multiplier }));

  return (
    <div className="px-8 py-6 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100">
      <div className="flex flex-col gap-6 md:flex-row md:gap-8">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 md:mb-4">Weaknesses:</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-800">
                  <th className="border p-2 text-left">Type</th>
                  <th className="border p-2 text-left">Multiplier</th>
                </tr>
              </thead>
              <tbody>
                {weaknesses.length > 0 ? (
                  weaknesses.map(({ type, multiplier }) => (
                    <tr key={type}>
                      <td className="border p-2 flex items-center">
                        <Image src={typeEffectiveness[type].image} alt={type} width={24} height={24} />
                        <span className="capitalize ml-2">{type}</span>
                      </td>
                      <td className="border p-2 text-center">{multiplier}x</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="border p-2 text-center">None</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 md:mb-4">Resistances:</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-800">
                  <th className="border p-2 text-left">Type</th>
                  <th className="border p-2 text-left">Multiplier</th>
                </tr>
              </thead>
              <tbody>
                {resistances.length > 0 ? (
                  resistances.map(({ type, multiplier }) => (
                    <tr key={type}>
                      <td className="border p-2 flex items-center">
                        <Image src={typeEffectiveness[type].image} alt={type} width={24} height={24} />
                        <span className="capitalize ml-2">{type}</span>
                      </td>
                      <td className="border p-2 text-center">{multiplier}x</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="border p-2 text-center">None</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Immunities:</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="border p-2 text-left">Type</th>
                <th className="border p-2 text-left">Multiplier</th>
              </tr>
            </thead>
            <tbody>
              {immunities.length > 0 ? (
                immunities.map(({ type, multiplier }) => (
                  <tr key={type}>
                    <td className="border p-2 flex items-center">
                      <Image src={typeEffectiveness[type].image} alt={type} width={24} height={24} />
                      <span className="capitalize ml-2">{type}</span>
                    </td>
                    <td className="border p-2 text-center">{multiplier}x</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="border p-2 text-center">None</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TypeWeakness;
