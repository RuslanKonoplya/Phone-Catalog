import { useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.scss';
import React from 'react';

type Props = {
  elementOnPage: number;
  total: number;
};

export const Pagination: React.FC<Props> = ({ elementOnPage, total }) => {
  const pages: number[] = [];
  const [searchParams, setSearchParams] = useSearchParams();
  const activePage = Number(searchParams.get('page')) || 1;

  for (let i = 1; i <= Math.ceil(total / elementOnPage); i++) {
    pages.push(i);
  }

  const handleClick = (page: number) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.set('page', String(page));

      return params;
    });
  };

  if (pages.length === 1) {
    return null;
  }



  const changePage = (param : 'add' | 'substract') => {

    

    if(param === 'add' && activePage < pages[pages.length -1 ]) {

      setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.set('page', String(activePage + 1));

      return params;
    });
    }


    if (param === 'substract' && activePage > 1) {

      setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.set('page', String(activePage - 1));

      return params;
    });

    }

  }

  return (
    <ul className={styles.pagination}>
      <button className={`${styles.button__left} ${activePage === 1 ? styles.disabled : '' }`} 
      
      onClick={() => changePage('substract') }></button>

      <div className={styles.elements__container}>
        {pages.map(page => (
          <li
            key={page}
            className={`${styles.element} ${activePage === page ? styles.element__active : ''}`}
            onClick={() => handleClick(page)}
          >
            <p>{page} </p>
          </li>
        ))}
      </div>

      <button className={`${styles.button__rigth} ${activePage === pages[pages.length -1 ] ? styles.disabled : ''}`} 
      onClick={() => changePage('add') }></button>
    </ul>
  );
};
