import { useState, useEffect, FC } from 'react';
type DynamicTokenIconProps = {
  token: string;
}

const DynamicTokenIcon: FC<DynamicTokenIconProps> = ({ token }) => {
  const [Component, setComponent] = useState(<></>);

  useEffect(() => {
    const getToken = async () => {
      try {
        const importedSrc = await import(`../../assets/tokens/${token}.svg`)
        console.log('importedSrc:', importedSrc)
        setComponent(<img src={importedSrc.default}></img>)
        // return importedSrc
      } catch (error) {
        console.log('Error: Image not found', error);
        // return <></>
      }
    }
    if (token) getToken()
    // if (token) {
    //   try {
    //   import(`../../assets/tokens/${token}.svg`)
    //     .then((module) => {
    //       console.log('module:', module.default)
    //       if (module.default)
    //       setComponent(<img src={module.default}></img>)
    //     })
    //     .catch((err) => console.error(`Error loading ${token}:`, err));
    //   } catch (error) {
    //     console.log('Error: Image not found', error);
    //   }
    // }
  }, [token]);
  console.log('Component:', Component)
  if (!Component) return <div>Loading...</div>;

  return Component;
};

export default DynamicTokenIcon;
