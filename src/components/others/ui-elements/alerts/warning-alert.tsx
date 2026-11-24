import { AlertIcon } from "@/icons";
import AlertSpecimen from "./alert-specimen";
export default function WarningAlert() {
  return (
    <AlertSpecimen kind="warning" variant="warning" icon={<AlertIcon />} />
  );
}
