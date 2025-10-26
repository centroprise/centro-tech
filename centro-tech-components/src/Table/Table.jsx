import './Table.css';

const Table = ({ data }) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  const headers = Object.keys(data[0]);

  return (
    <table className="centro-table">
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {headers.map(header => (
              <td key={header}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
