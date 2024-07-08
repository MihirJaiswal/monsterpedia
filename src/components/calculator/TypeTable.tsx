import React from 'react';

interface TypeData {
  weaknesses: string[];
  resistances: string[];
  immunities: string[];
}

interface TypeTableProps {
  pokemonTypes: { type1: number; type2: number }[];
  typeOptions: string[];
  handleTypeChange: (index: number, type: 'type1' | 'type2', value: string) => void;
  weaknesses: string[];
  resistances: string[];
  immunities: string[];
  recommended: string[];
  getTypeData: (type1: number, type2: number) => TypeData;
}

const TypeTable: React.FC<TypeTableProps> = ({
  pokemonTypes,
  typeOptions,
  handleTypeChange,
  weaknesses,
  resistances,
  immunities,
  recommended,
  getTypeData
}) => {
  return (
    <div className="p-6 rounded-lg shadow-lg mx-auto w-full max-w-7xl mt-20">
        <div className="overflow-hidden bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100 shadow-xl md:hidden">
        {pokemonTypes.map((pokemonType, index) => {
          const typeData = getTypeData(pokemonType.type1, pokemonType.type2);

          return (
            <div key={index} className="border-b border-gray-300 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div className="flex items-center mb-4 sm:mb-0">
                  <img
                    src={`/types/${typeOptions[pokemonType.type1].toLowerCase()}.png`}
                    alt={typeOptions[pokemonType.type1]}
                    className="w-6 h-6 sm:w-8 sm:h-8 object-cover"
                  />
                  <select
                    onChange={(e) => handleTypeChange(index, 'type1', e.target.value)}
                    value={pokemonType.type1}
                    className="ml-2 w-20 sm:w-28 p-1 border border-gray-300 rounded bg-gray-50"
                  >
                    {typeOptions.map((type, i) => (
                      <option key={i} value={i}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <img
                    src={`/types/${typeOptions[pokemonType.type2].toLowerCase()}.png`}
                    alt={typeOptions[pokemonType.type2]}
                    className="ml-4 w-6 h-6 sm:w-8 sm:h-8 object-cover"
                  />
                  <select
                    onChange={(e) => handleTypeChange(index, 'type2', e.target.value)}
                    value={pokemonType.type2}
                    className="ml-2 w-20 sm:w-28 p-1 border border-gray-300 rounded bg-gray-50"
                  >
                    {typeOptions.map((type, i) => (
                      <option key={i} value={i}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <div className="mb-4 sm:mb-0 sm:w-1/4">
                  <h3 className="text-md font-semibold text-gray-800 mb-2">Weaknesses</h3>
                  <div className="flex flex-wrap gap-2">
                    {typeData.weaknesses.map((weakness, i) => (
                      <div key={i} className="flex items-center space-x-2 bg-red-100 text-red-700 rounded-full px-2 py-1 text-sm">
                        <img
                          src={`/types/${weakness.toLowerCase()}.png`}
                          alt={weakness}
                          className="w-4 h-4 sm:w-6 sm:h-6 object-cover"
                        />
                        <span>{weakness}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-4 sm:mb-0 sm:w-1/4">
                  <h3 className="text-md font-semibold text-gray-800 mb-2">Resistances</h3>
                  <div className="flex flex-wrap gap-2">
                    {typeData.resistances.map((resistance, i) => (
                      <div key={i} className="flex items-center space-x-2 bg-green-100 text-green-700 rounded-full px-2 py-1 text-sm">
                        <img
                          src={`/types/${resistance.toLowerCase()}.png`}
                          alt={resistance}
                          className="w-4 h-4 sm:w-6 sm:h-6 object-cover"
                        />
                        <span>{resistance}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sm:w-1/4">
                  <h3 className="text-md font-semibold text-gray-800 mb-2">Immunities</h3>
                  <div className="flex flex-wrap gap-2">
                    {typeData.immunities.map((immunity, i) => (
                      <div key={i} className="flex items-center space-x-2 bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-sm">
                        <img
                          src={`/types/${immunity.toLowerCase()}.png`}
                          alt={immunity}
                          className="w-4 h-4 sm:w-6 sm:h-6 object-cover"
                        />
                        <span>{immunity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <table className="w-full bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100 shadow-xl border-collapse overflow-hidden hidden md:block">
        <thead className="bg-gray-200 border-b border-gray-300">
          <tr>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold border-b border-gray-300">Pokemon Types</th>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold border-b border-gray-300">Weaknesses</th>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold border-b border-gray-300">Resistances</th>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold border-b border-gray-300">Immunities</th>
          </tr>
        </thead>
        <tbody>
          {pokemonTypes.map((pokemonType, index) => {
            const typeData = getTypeData(pokemonType.type1, pokemonType.type2);

            return (
              <tr key={index} className="transition-colors border-b border-gray-300">
                <td className="py-3 px-4 border-r border-gray-300">
                  <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 items-center space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-2">
                      <img
                        src={`/types/${typeOptions[pokemonType.type1].toLowerCase()}.png`}
                        alt={typeOptions[pokemonType.type1]}
                        className="w-6 h-6 sm:w-8 sm:h-8 object-cover"
                      />
                      <select
                        onChange={(e) => handleTypeChange(index, 'type1', e.target.value)}
                        value={pokemonType.type1}
                        className="w-20 sm:w-28 p-1 border border-gray-300 rounded bg-gray-50"
                      >
                        {typeOptions.map((type, i) => (
                          <option key={i} value={i}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <img
                        src={`/types/${typeOptions[pokemonType.type2].toLowerCase()}.png`}
                        alt={typeOptions[pokemonType.type2]}
                        className="w-6 h-6 sm:w-8 sm:h-8 object-cover"
                      />
                      <select
                        onChange={(e) => handleTypeChange(index, 'type2', e.target.value)}
                        value={pokemonType.type2}
                        className="w-20 sm:w-28 p-1 border border-gray-300 rounded bg-gray-50"
                      >
                        {typeOptions.map((type, i) => (
                          <option key={i} value={i}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 border-r border-gray-300">
                  <div className="flex flex-wrap gap-2">
                    {typeData.weaknesses.map((weakness, i) => (
                      <div key={i} className="flex items-center space-x-2 bg-red-100 text-red-700 rounded-full px-2 py-1 text-sm">
                        <img
                          src={`/types/${weakness.toLowerCase()}.png`}
                          alt={weakness}
                          className="w-4 h-4 sm:w-6 sm:h-6 object-cover"
                        />
                        <span>{weakness}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4 border-r border-gray-300">
                  <div className="flex flex-wrap gap-2">
                    {typeData.resistances.map((resistance, i) => (
                      <div key={i} className="flex items-center space-x-2 bg-green-100 text-green-700 rounded-full px-2 py-1 text-sm">
                        <img
                          src={`/types/${resistance.toLowerCase()}.png`}
                          alt={resistance}
                          className="w-4 h-4 sm:w-6 sm:h-6 object-cover"
                        />
                        <span>{resistance}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4 border-r border-gray-300">
                  <div className="flex flex-wrap gap-2">
                    {typeData.immunities.map((immunity, i) => (
                      <div key={i} className="flex items-center space-x-2 bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-sm">
                        <img
                          src={`/types/${immunity.toLowerCase()}.png`}
                          alt={immunity}
                          className="w-4 h-4 sm:w-6 sm:h-6 object-cover"
                        />
                        <span>{immunity}</span>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Team Overview Section */}
      <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4'>
        <div className="w-full bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100 p-4 shadow-xl border-collapse overflow-hidden">
          <div className="flex flex-col space-y-4">
            <div className="border-b border-gray-300 pb-4">
              <h3 className="text-md font-semibold text-gray-800 mb-2">Weaknesses</h3>
              <div className="flex flex-wrap gap-2">
                {weaknesses.map((weakness, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-red-100 text-red-700 rounded-full px-3 py-1 text-sm">
                    <img
                      src={`/types/${weakness.toLowerCase()}.png`}
                      alt={weakness}
                      className="w-4 h-4 sm:w-6 sm:h-6 object-cover"
                    />
                    <span>{weakness}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resistances Section */}
            <div className="border-b border-gray-300 pb-4">
              <h3 className="text-md font-semibold text-gray-800 mb-2">Resistances</h3>
              <div className="flex flex-wrap gap-2">
                {resistances.map((resistance, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm">
                    <img
                      src={`/types/${resistance.toLowerCase()}.png`}
                      alt={resistance}
                      className="w-4 h-4 sm:w-6 sm:h-6 object-cover"
                    />
                    <span>{resistance}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Immunities Section */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-2">Immunities</h3>
              <div className="flex flex-wrap gap-2">
                {immunities.map((immunity, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm">
                    <img
                      src={`/types/${immunity.toLowerCase()}.png`}
                      alt={immunity}
                      className="w-4 h-4 sm:w-6 sm:h-6 object-cover"
                    />
                    <span>{immunity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Additions Section */}
        <div className="bg-yellow-100 p-4 border border-gray-300 w-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Recommended Additions</h2>
          <div className="flex flex-wrap gap-2">
            {recommended.map((type, index) => (
              <div key={index} className="flex items-center space-x-2 bg-yellow-200 text-yellow-800 rounded-full px-3 py-1 text-sm">
                <img
                  src={`/types/${type.toLowerCase()}.png`}
                  alt={type}
                  className="w-4 h-4 sm:w-6 sm:h-6 object-cover"
                />
                <span>{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeTable;
