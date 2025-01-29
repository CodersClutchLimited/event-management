import DynamicTableSkeleton from "@/components/common/DynamicTableSkeleton";
import { EventTableHeaderData } from "@/constants/tablesData";
import React from "react";

const Loading = () => {
  return (
    <div>
      <DynamicTableSkeleton headers={EventTableHeaderData} rowCount={10} />
    </div>
  );
};

export default Loading;
