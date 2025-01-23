"use client";
// import BrandName from "@/components/BrandName";
// import CurrencyConfig from "@/components/setting/CurrencyConfig";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const GeneralSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent className=" flex gap-5 flex-col">
        {/* <CurrencyConfig /> */}
        {/* <BrandName /> */}
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
