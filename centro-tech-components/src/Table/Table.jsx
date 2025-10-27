import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./Table.css";

const CentroTable = ({ dataSource, data, allowPagination = true }) => {
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

  // Initialize filters if empty
  useEffect(() => {
    if (columns.length && Object.keys(filters).length === 0) {
      const initFilters = {};
      columns.forEach((col) => {
        initFilters[col] = { value: null, matchMode: "contains" };
      });
      setFilters(initFilters);
    }
  }, [columns, filters]);

  return (
    <DataTable
      value={tableData}
      loading={loading}
      paginator={allowPagination}
      rows={10}
      emptyMessage="No data found"
      filters={filters}
      onFilter={(e) => setFilters(e.filters)}
      filterDisplay="row"
    >
      {columns.map((col) => (
        <Column key={col} field={col} header={col} sortable filter />
      ))}
    </DataTable>
  );
};

CentroTable.propTypes = {
  dataSource: PropTypes.string,
  data: PropTypes.array,
  allowPagination: PropTypes.bool,
};

export default CentroTable;
