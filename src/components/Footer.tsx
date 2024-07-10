import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-400 z-50 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 text-gray-200 py-10 border-t border-gray-400">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className='flex items-center justify-center md:justify-start'>
            <h3 className="text-lg font-bold text-center md:text-left">Monster Pedia</h3>
            <img src="/logo.png" alt="" className='w-12' />
            </div>
            <p className="text-gray-400">Your ultimate Pokémon resource.</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-xl hover:text-gray-500 transition duration-300" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-xl hover:text-gray-500 transition duration-300" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-xl hover:text-gray-500 transition duration-300" />
            </a>
            <a href="https://github.com/MihirJaiswal/MihirJaiswal" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-xl hover:text-gray-500 transition duration-300" />
            </a>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center md:mb-2">
          <div className="text-center md:text-left">
            <ul className="hidden gap-4 md:flex space-x-4 md:text-xs ">
              <li>
                <a href="/pokedex" className="hover:text-gray-500 transition duration-300">Pokédex</a>
              </li>
              <li>
                <a href="/calculator" className="hover:text-gray-500 transition duration-300">Type Calculator</a>
              </li>
              <li>
                <a href="/pokedex-maker" className="hover:text-gray-500 transition duration-300">Pokédex Maker</a>
              </li>
              <li>
                <a href="/team" className="hover:text-gray-500 transition duration-300">Team Builder</a>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-right  md:mt-0 text-xs">
            <p className="text-gray-400">&copy; 2024 Monster Pedia. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
