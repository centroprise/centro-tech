import React from 'react';

export interface ColumnConfig {
  field: string;
  header?: string;
  sortable?: boolean;
  filter?: boolean;
  style?: React.CSSProperties;
  type?: 'text' | 'tag';
  tagColors?: Record<string, string>;
  defaultColor?: string;
  body?: (rowData: any) => React.ReactNode;
}

export interface CentroTableProps {
  dataSource?: string;
  data?: any[];
  columns: ColumnConfig[];
  allowPagination?: boolean;
  enableFilters?: boolean;
}

export declare const CentroTable: React.FC<CentroTableProps>;