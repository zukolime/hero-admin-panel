import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { useHttp } from "../../hooks/http.hook";
import { fetchFiltres, filtersChanged } from "./filtersSlice";

import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
  const { filters, filtersLoadingStatus, activeFilter } = useSelector(
    (state) => state.filters
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFiltres());
  }, []);

  if (filtersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderFiltres = (filterBtns) => {
    if (filterBtns.length === 0) {
      return <h5 className="text-center mt-5">Фильтры не найдены</h5>;
    }

    return filterBtns.map(({ name, text, className }) => {
      const btnClass = classNames("btn", className, {
        active: name === activeFilter,
      });
      return (
        <button
          key={name}
          className={btnClass}
          onClick={() => dispatch(filtersChanged(name))}
        >
          {text}
        </button>
      );
    });
  };

  const filterElems = renderFiltres(filters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{filterElems}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
