import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import "./Table.css";

const CentroTable = ({
  dataSource,
  data,
  columns = [],
  allowPagination = true,
  enableFilters = false
}) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  // Fetch data from API or use provided data
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

  // Initialize filters for each column
  useEffect(() => {
    if (!enableFilters) {
      if (Object.keys(filters).length !== 0) setFilters({});
      return;
    }

    if (columns.length && Object.keys(filters).length === 0) {
      const initFilters = {};
      columns.forEach((col) => {
        initFilters[col.field] = { value: null, matchMode: "contains" };
      });
      setFilters(initFilters);
    }
  }, [columns, enableFilters, filters]);

  // Default
  const defaultBodyTemplate = (rowData, field) => {
    return rowData[field];
  };

  // Render each column based on its configuration
  const renderColumn = (col, index) => {

    let bodyTemplate = null;

    if (col.body) {
      bodyTemplate = (rowData) => col.body(rowData);
    } else if (col.type === "tag") {
      bodyTemplate = (rowData) => {
        const value = rowData[col.field];
        const color =
          col.tagColors?.[value] || col.defaultColor || "info";
        return <Tag value={value} severity={color} />;
      }
    } else {
      // Default: just show the text value
      bodyTemplate = (rowData) => defaultBodyTemplate(rowData, col.field);
    }

    return (
      <Column
        key={col.field || index}
        field={col.field}
        header={col.header || col.field}
        sortable={col.sortable !== false}
        filter={enableFilters && col.filter !== false}
        style={col.style}
        body={bodyTemplate}
      />
    );
  };

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
      {columns.map((col, index) => renderColumn(col, index))}
    </DataTable>
  );
};
CentroTable.propTypes = {
  // API endpoint to fetch data from
  dataSource: PropTypes.string,

  // Or provide data directly as array
  data: PropTypes.array,

  // Column definitions - array of column objects
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,     
      header: PropTypes.string,                
      sortable: PropTypes.bool,                
      filter: PropTypes.bool,                  
      style: PropTypes.object,                 
      type: PropTypes.oneOf(["text", "tag"]), 

      tagColors: PropTypes.object,  
      defaultColor: PropTypes.string,

      body: PropTypes.func,
    })
  ).isRequired,

  allowPagination: PropTypes.bool,
  enableFilters: PropTypes.bool,
};

export default CentroTable;
