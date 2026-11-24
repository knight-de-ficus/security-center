import { OctagonAlertIcon } from "@/icons";
import AlertSpecimen from "./alert-specimen";
export default function ErrorAlert() {
  return (
    <AlertSpecimen
      kind="error"
      variant="destructive"
      icon={<OctagonAlertIcon />}
    />
  );
}
