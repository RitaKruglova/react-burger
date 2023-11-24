import preloaderStyles from './preloader.module.css';

function Preloader() {
  return (
    <div className={preloaderStyles.preloader}>
      <div className={preloaderStyles.container}>
        <span className={preloaderStyles.round}></span>
      </div>
    </div>
  )
}

export default Preloader;