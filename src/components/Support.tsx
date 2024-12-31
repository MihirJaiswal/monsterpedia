import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import Note from './Note';
import { AlertDialogDemo } from './Alert';
import Image from 'next/image';
import { MotionDiv } from './MotionDiv';
import img from '../../public/thank.webp';

const SupportMe = () => {
  return (
    <MotionDiv
      className='bg-white container relative md:w-[90%] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-lg border-2 border-white text-center mb-12 px-0 md:p-6'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <section id="support-section" className="mx-auto my-12 flex flex-col items-center justify-center bg-gray-900 backdrop-filter backdrop-blur-sm bg-opacity-50">
        <MotionDiv
          className='flex flex-col items-center justify-center border p-8 rounded-md'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-100 bg-clip-padding mb-6">
            Support Me
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            If you enjoy visiting my website and would like to support the development, please consider making a donation or following me on social media. Your support helps me keep improving and adding new features!
          </p>
          <div className='flex flex-col gap-8 justify-center items-center'>
            <MotionDiv
              className="flex space-x-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <a href="https://www.linkedin.com/in/mihir-jaiswal-322898287/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                <FaLinkedin size={40} />
              </a>
              <a href="https://www.instagram.com/monty_draws_/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                <FaInstagram size={40} />
              </a>
              <a href="https://github.com/MihirJaiswal/MihirJaiswal" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900">
                <FaGithub size={40} className='text-white' />
              </a>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <AlertDialogDemo />
            </MotionDiv>
          </div>
        </MotionDiv>
      </section>
      <Note />
      <MotionDiv
        className="md:absolute md:bottom-0 md:left-0 md:block opacity-90 flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <Image src={img} alt="img" width={200} height={200} className='w-52 p-2' loading='lazy' quality={100} />
      </MotionDiv>
    </MotionDiv>
  );
};

export default SupportMe;
