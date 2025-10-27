import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./Table.css";

const CentroTable = ({ dataSource, data, allowPagination = true, enableFilters = false }) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (!dataSource) {
      setTableData(data || []);
      return;
    }

    setLoading(true);

    fetch(dataSource) 
      .then((response) => response.json())
      .then((json) => setTableData(json))
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, [dataSource, data]);

  const columns = tableData.length > 0 ? Object.keys(tableData[0]) : [];

  // Initialize filters if empty and filters are enabled
  useEffect(() => {
    if (!enableFilters) {
      // clear any existing filters when filtering is disabled
      if (Object.keys(filters).length !== 0) setFilters({});
      return;
    }

    if (columns.length && Object.keys(filters).length === 0) {
      const initFilters = {};
      columns.forEach((col) => {
        initFilters[col] = { value: null, matchMode: "contains" };
      });
      setFilters(initFilters);
    }
  }, [columns, enableFilters]);

  return (
    <DataTable
      value={tableData}
      loading={loading}
      paginator={allowPagination}
      rows={10}
      emptyMessage="No data found"
      filters={enableFilters ? filters : undefined}
      onFilter={enableFilters ? (e) => setFilters(e.filters) : undefined}
      filterDisplay={enableFilters ? "row" : undefined}
    >
      {columns.map((col) => (
        <Column key={col} field={col} header={col} sortable filter={enableFilters} />
      ))}
    </DataTable>
  );
};

CentroTable.propTypes = {
  dataSource: PropTypes.string,
  data: PropTypes.array,
  allowPagination: PropTypes.bool,
  enableFilters: PropTypes.bool,
};

export default CentroTable;
