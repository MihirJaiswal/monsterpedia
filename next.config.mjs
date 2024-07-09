const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: 'raw.githubusercontent.com',
        },{
          hostname: 'picsum.photos',
        },
        {
          hostname: 'randomuser.me',
        },
      ],
    },
  };
  
  export default nextConfig;