import useSWR, { useSWRConfig } from "swr";

import { useMemo } from "react";

export const useDeliveryReceipt = (
  messages,
  userInfo,
  checkDeliveryReceipt,
  newMessageSent
) => {
  const { mutate } = useSWRConfig();
  const { sid } = userInfo || null;
  const fromApp = messages.filter((elem) => elem.author === `weg_insurance`);

  //
  const allDelivered = useMemo(() => {
    if (messages && messages.length > 0) {
      return fromApp.every(
        (m) => m?.aggregatedDeliveryReceipt?.delivered === `all`
      );
    } else {
      return false;
    }
  }, [messages, fromApp]);

  const messageSids = useMemo(() => fromApp.map((m) => m.sid), [fromApp]);

  const { data: deliveryReceipt } = useSWR(
    () => {
      // if all the previous messages were delivered to the user, there is no need to check for delivery receipts, thus, no need to start a network request. That's what the line below does
      if (allDelivered) return null;
      if (sid && messageSids && messageSids.length > 0)
        return `/api/sms_delivery_update`;
      if (sid && messageSids && messageSids.length > 0 && newMessageSent)
        return `/api/sms_delivery_update`;
      return null;
    },
    () => checkDeliveryReceipt(sid, messageSids),
    {
      refreshInterval: (data) => {
        if (data && data.status === 500) return null;
        return mutate(`/api/sms_delivery_update`);
      },
      dedupingInterval: 3000,
      errorRetryCount: 5,
    }
  );

  return { deliveryReceipt, allDelivered };
};
