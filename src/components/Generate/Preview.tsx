"use client";
import Image from "next/image";
import React, { forwardRef } from "react";
import { CardContainer, CardBody, CardItem } from "../ui/3d-card";
import clsx from "clsx";
import { FaDownload } from "react-icons/fa";

interface PokemonCardProps {
  name: string;
  hp: string;
  attack: string;
  defense: string;
  spAttack: string;
  spDefense: string;
  speed: string;
  ability: string;
  abilityDescription: string;
  type1: string;
  type2: string;
  previewImage: string;
  onDownload: () => void;
}

const getColorForStat = (statValue: number) => {
  if (statValue >= 120) return "bg-green-600";
  if (statValue >= 100) return "bg-green-500";
  if (statValue >= 80) return "bg-yellow-500";
  if (statValue >= 40) return "bg-orange-500";
  if (statValue >= 0) return "bg-red-500";
  return "bg-blue-500";
};

const Preview = forwardRef<HTMLDivElement, PokemonCardProps>(
  (
    {
      name,
      hp,
      attack,
      defense,
      spAttack,
      spDefense,
      speed,
      ability,
      abilityDescription,
      type1,
      type2,
      previewImage,
      onDownload
    },
    ref
  ) => {
    const imageSrc = previewImage;

    const stats = [
      { label: "HP", value: parseInt(hp, 10) },
      { label: "Attack", value: parseInt(attack, 10) },
      { label: "Defense", value: parseInt(defense, 10) },
      { label: "Special Attack", value: parseInt(spAttack, 10) },
      { label: "Special Defense", value: parseInt(spDefense, 10) },
      { label: "Speed", value: parseInt(speed, 10) },
    ];

    const totalStats = stats.reduce((acc, stat) => acc + stat.value, 0);

    return (
      <div className="flex flex-col items-center justify-center gap-8" ref={ref}>
        <CardContainer className="">
          <CardBody
            className={clsx(
              "border-4 bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border-gray-300 rounded-xl shadow-lg max-w-lg flex flex-col gap-2 items-center"
            )}
          >
            <div className="flex flex-col md:flex-row justify-center border-b border-gray-300 p-8  items-center gap-8">
              <CardItem
                translateZ="30"
                className="relative flex flex-col items-center justify-center gap-2"
              >
                <Image
                  src={imageSrc}
                  alt={`${name} image`}
                  height={200}
                  width={200}
                  className="w-56 h-56 object-cover rounded-xl mx-auto"
                />
                <CardItem translateZ="20">
                  <h2 className="text-2xl font-bold text-center text-gray-100 dark:text-gray-100">
                    {name}
                  </h2>
                </CardItem>
                <div className="flex items-center justify-center gap-4">
                  {type1 && (
                    <Image
                      src={`/types/${type1}.png`}
                      alt={`${type1} type`}
                      width={50}
                      height={50}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  )}
                  {type2 && (
                    <Image
                      src={`/types/${type2}.png`}
                      alt={`${type2} type`}
                      width={50}
                      height={50}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  )}
                </div>
              </CardItem>
              <div className="flex flex-1 flex-col items-start  gap-2">
                <CardItem translateZ="10">
                  <div className="">
                    {stats.map((stat, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex justify-between items-center gap-8 text-gray-200 dark:text-gray-100">
                          <span className="">{stat.label}:</span>
                          <span>{stat.value}</span>
                        </div>
                        <div className="w-full bg-gray-300 rounded h-2">
                          <div
                            className={`h-2 ${getColorForStat(
                              stat.value
                            )} rounded`}
                            style={{
                              width: `${(stat.value / 255) * 100}%`,
                              maxWidth: "100%",
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between text-gray-200 font-medium mt-4 ">
                      <span>Total:</span>
                      <span>{totalStats}</span>
                    </div>
                  </div>
                </CardItem>
              </div>
            </div>
            <div>
              <div className="py-8 rounded-lg flex flex-col w-full max-w-96">
                <p className="text-gray-100 dark:text-gray-100 mb-2">
                  <span className="font-semibold">Ability:</span> {ability}
                </p>
                <p className="text-gray-300 dark:text-gray-100 break-words w-full">
                  {abilityDescription}
                </p>
              </div>
            </div>
          </CardBody>
        </CardContainer>
        <div className="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none">
          <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
          <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
          <span className="relative z-20 flex items-center text-sm">
           <div className="flex items-center justify-between gap-2">
           <FaDownload/>
            <button onClick={onDownload} className="z-30">
              Download Pokémon
            </button>
           </div>
          </span>
        </div>
      </div>
    );
  }
);

Preview.displayName = "Preview";

export default Preview;
