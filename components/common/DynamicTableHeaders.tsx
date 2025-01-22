import React from "react";
import { TableHead, TableHeader, TableRow } from "../ui/table";

interface TableHeaderProps {
  headers: string[];
}

const DynamicTableHeaders: React.FC<TableHeaderProps> = ({ headers }) => {
  return (
    <TableHeader>
      <TableRow>
        {headers.map((header, index) => (
          <TableHead className="whitespace-nowrap" key={index}>{header}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default DynamicTableHeaders;
