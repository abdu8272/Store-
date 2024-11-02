
import React from 'react';
import ReactPaginate from 'react-paginate';


interface PaginateProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (selectedPage: number) => void;
}

const Paginate: React.FC<PaginateProps> = ({  totalPages, onPageChange }) => {

  const pagesCount = Math.min(totalPages, 8);

  return (
    <ReactPaginate
    className='paginate'
      breakLabel={null} 
      previousLabel={'<<'}
      nextLabel={'>>'} 
      pageCount={pagesCount}
      marginPagesDisplayed={0}
      pageRangeDisplayed={pagesCount} 
      onPageChange={({ selected }) => onPageChange(selected + 1)} 
      activeClassName='paginate_active'
      previousClassName='paginate_btn previous_btn'
      nextClassName='paginate_btn next_btn'
      pageClassName='paginate_link'
      renderOnZeroPageCount={null}
      pageLinkClassName='paginate_link'
    />
  );
};

export default Paginate;
