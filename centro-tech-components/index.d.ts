// index.d.ts
import { DataTableProps } from 'primereact/datatable';

export interface CentroTableProps extends DataTableProps {
  data: any[];
  columns: { field: string; header: string }[];
}

export declare const CentroTable: React.FC<CentroTableProps>;
