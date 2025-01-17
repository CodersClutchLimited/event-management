import React from "react";
import { Table } from "../ui/table";
import DynamicTableHeaders from "../common/DynamicTableHeaders";
import { EventTableHeaderData } from "@/constants/tablesData";

const EventTable = () => {
  return (
    <Table className="mt-5">
      <DynamicTableHeaders headers={EventTableHeaderData} />
    </Table>
  );
};

export default EventTable;
