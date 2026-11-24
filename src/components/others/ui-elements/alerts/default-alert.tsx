import { InfoIcon } from "@/icons";
import AlertSpecimen from "./alert-specimen";
export default function DefaultAlert() {
  return <AlertSpecimen kind="default" variant="default" icon={<InfoIcon />} />;
}
