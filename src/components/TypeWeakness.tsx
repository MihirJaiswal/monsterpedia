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
    <div className="px-4 py-12 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100">
      <h2 className="text-xl font-bold mb-4">Type Effectiveness</h2>
      
      {/* Weaknesses */}
      <div className='flex items-center justify-center gap-4'>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Weaknesses:</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Type</th>
              <th className="border p-2">Multiplier</th>
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

      {/* Resistances */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Resistances:</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Type</th>
              <th className="border p-2">Multiplier</th>
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

      {/* Immunities */}
      <div>
        <h3 className="text-lg font-semibold">Immunities:</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Type</th>
              <th className="border p-2">Multiplier</th>
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
  );
};

export default TypeWeakness;
