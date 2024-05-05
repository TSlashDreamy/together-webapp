import { ServiceStatus } from "~/types";

export const statusPresets = {
  [ServiceStatus.Active]: { style: "bg-success-600", content: "Active" },
  [ServiceStatus.Unactive]: { style: "bg-foreground", content: "Unactive" },
  [ServiceStatus.Error]: { style: "bg-danger-600", content: "Error (Try to recconect the service)" },
};
