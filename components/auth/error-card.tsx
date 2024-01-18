import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";

import CardWrapper from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="somethink went wrong"
      backButtonHref="/auth/login"
      backButtonLabel="back to login"
      showSocial={false}
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
