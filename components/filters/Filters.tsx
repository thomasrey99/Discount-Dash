"use client";
// import { useDispatch, useSelector } from "@/lib/redux/hooks";
import { useState, ChangeEvent, useEffect } from "react";
import { useFiltersQueryQuery } from "@/lib/redux/service/filtersAPI";
import FiltersPrice from "./FiltersPrice";
import FiltersSort from "./FilterSort";
import FiltersCategories from "./FiltersCategories";
import { loadProducts, loadErrors } from "@/lib/redux/features/itemsSlice";
import { useDispatch, useSelector } from "@/lib/redux/hooks";

type FiltersState = {
  category: string;
  name: string;
  minPrice: string;
  maxPrice: string;
  order: string;
};

const Filters = () => {
  const nameSearch = useSelector((state) => state.filter.name);
  const [valueState, setValueState] = useState<FiltersState>({
    category: "",
    order: "",
    name: "",
    minPrice: "",
    maxPrice: ""
  });
  console.log(valueState);
  console.log(nameSearch);

  useEffect(() => {
    setValueState({
      ...valueState,
      name: nameSearch,
    });
  }, [nameSearch]);

  const dispatch = useDispatch();

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setValueState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { data, isError } = useFiltersQueryQuery({
    category: valueState.category,
    minPrice: valueState.minPrice === "" ? "0" : valueState.minPrice,
    maxPrice: valueState.maxPrice === "" ? "10000000" : valueState.maxPrice,
    order: valueState.order,
    name: valueState.name,
  });

  useEffect(() => {}, [valueState]);

  const handleFilters = () => {
    dispatch(loadProducts(data));
    dispatch(loadErrors(isError));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      dispatch(loadProducts(data));
      dispatch(loadErrors(isError));
    }
  };

  return (
    <div>
      <h1>Filters</h1>
      <FiltersCategories valueState={valueState} onChange={onChange} />
      <FiltersPrice valueState={valueState} onChange={onChange} />
      <FiltersSort valueState={valueState} onChange={onChange} />
      <button onClick={handleFilters} onKeyDown={handleKeyDown}>
        Apply filter
      </button>
    </div>
  );
};

export default Filters;
