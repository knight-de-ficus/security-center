import { InfoIcon } from "@/icons";
import AlertSpecimen from "./alert-specimen";
export default function InfoAlert() {
  return <AlertSpecimen kind="info" variant="info" icon={<InfoIcon />} />;
}
