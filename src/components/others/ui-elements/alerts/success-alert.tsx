import { CheckCircleIcon } from "@/icons";
import AlertSpecimen from "./alert-specimen";
export default function SuccessAlert() {
  return (
    <AlertSpecimen
      kind="success"
      variant="success"
      icon={<CheckCircleIcon />}
    />
  );
}
