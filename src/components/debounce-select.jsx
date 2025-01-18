import React, { useState, useEffect, useMemo, useRef } from "react";
import { debounce } from "lodash";
import DataSelect from "./select";
import { LoadingSpinner } from "./spin";
import DataComboBox from "./combobox";
function DebounceSelect({
  value,
  setValue,
  fetchOptions,
  debounceTimeout = 800,
  listOptions,
  ...props
}) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState();
  const fetchRef = useRef(0);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  useEffect(() => {
    setOptions(listOptions);
  }, [listOptions]);
  return (
    <DataComboBox
      labelInValue
      // multiple={false}
      className={props?.className}
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <LoadingSpinner /> : null}
      {...props}
      options={options}
      value={value}
      setValue={setValue}
    />
  );
}
export default DebounceSelect;
