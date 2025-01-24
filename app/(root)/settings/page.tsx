// import BrandName from "@/components/BrandName";
// import CurrencyConfig from "@/components/setting/CurrencyConfig";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import General from "@/components/setting/systemSetting/General";
import UserManagement from "@/components/setting/systemSetting/UserManagement";
import EventManagement from "@/components/setting/systemSetting/EventManagement";
import Notifications from "@/components/setting/systemSetting/Notifications";
import PaymentSettings from "@/components/setting/systemSetting/PaymentSetting";
import { getSystemSettings } from "@/lib/actions/systemSetting/SystemSettingServerAction";
import { SystemSettingsTypes } from "@/lib/types";
// import { addSystemSettingsServerAction } from "@/lib/actions/systemSetting/SystemSettingServerAction";

const GeneralSettings = async () => {
  const { data, status } = await await getSystemSettings();
  // console.log("data", data);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent className=" flex gap-5 flex-col">
        {/* <CurrencyConfig /> */}
        <General data={data as SystemSettingsTypes} />
        <UserManagement data={data as SystemSettingsTypes} />
        <EventManagement data={data as SystemSettingsTypes} />
        <Notifications data={data as SystemSettingsTypes} />
        <PaymentSettings data={data as SystemSettingsTypes} />
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
