import { useEffect, useContext } from 'react';
import { DataTableContext } from '@openedx/paragon';

import { useDispatch } from 'react-redux';
import {
  changeFilters, changePageIndex, changePageSize, changeSortBy,
} from 'features/shared/data/slices';

export const PersistController = () => {
  const dispatch = useDispatch();
  const {
    pageCount,
    state: {
      pageIndex, PageSize, filters, sortBy,
    },
  } = useContext(DataTableContext);

  useEffect(() => {
    dispatch(changePageIndex(0));
  }, [dispatch, pageCount]);

  useEffect(() => {
    dispatch(changeFilters(JSON.stringify(filters)));
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(changePageIndex(pageIndex));
  }, [dispatch, pageIndex]);

  useEffect(() => {
    dispatch(changePageSize(PageSize));
  }, [dispatch, PageSize]);

  useEffect(() => {
    dispatch(changeSortBy(sortBy));
  }, [dispatch, sortBy]);

  return null;
};
