import { useNavigate } from "react-router-dom";
import { CircleCheckBig, CircleOff } from "lucide-react";

import Modal from "../modal/Modal";
import Button from "../Button";

type CreateEmployeeFormModalProps = {
  isOpen: boolean;
  close: () => void;
  isError: boolean;
};

export default function CreateEmployeeFormModal({
  isOpen,
  isError,
  close,
}: CreateEmployeeFormModalProps) {
  const navigate = useNavigate();
  const message = isError
    ? "An error occurred"
    : "The new employee has been added";

  const buttonTitle = isError ? "Back" : "View current employees";
  async function buttonClick() {
    if (isError) {
      close();
    } else {
      await navigate("/employee-list");
    }
  }
  return (
    <Modal close={close} isOpen={isOpen}>
      <>
        <div className="flex flex-col gap-8 flex-1 items-center font-bold">
          <Icon isError={isError} />
          <p>{message}</p>
        </div>
        <Button type="button" onClick={buttonClick} title={buttonTitle} />
      </>
    </Modal>
  );
}

const Icon = ({ isError }: { isError: boolean }) =>
  isError ? (
    <CircleOff color="red" size={50} />
  ) : (
    <CircleCheckBig color="green" size={50} />
  );
