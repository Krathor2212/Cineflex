
const SectionWrapper = (Component,idName) =>
    function HOC() {
        return (
          <>
            <span className='hash-span' id={idName}>
              &nbsp;
            </span>
    
            <Component />
          </>
        );
      };

export default SectionWrapper