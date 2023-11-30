import { MagnifyingGlass } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => (
  <div className={css.Loader}>
    <MagnifyingGlass
      visible={true}
      height={280}
      width={280}
      ariaLabel="MagnifyingGlass-loading"
      glassColor="#c0efff"
      color="#e15b64"
    />
  </div>
);

export { Loader };
