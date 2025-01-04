import { useState, FC, useLayoutEffect } from 'react';
type DynamicTokenIconProps = {
  token: string;
}

const DefaultIcon = <div className='bg-red-500 h-6 w-6 min-w-6 rounded-full p-0'></div>

const DynamicTokenIcon: FC<DynamicTokenIconProps> = ({ token }) => {
  const [Component, setComponent] = useState(DefaultIcon);

  useLayoutEffect(() => {
    const getToken = async () => {
      try {
        const importedSrc = await import(`../../assets/tokens/${token}.svg`)
        setComponent(<img className='w-6 h-6' src={importedSrc.default}></img>)
      } catch (error) {
        console.log('Error: Image not found', error);
      }
    }
    if (token) getToken()
  }, [token]);

  return Component;
};

export default DynamicTokenIcon;
