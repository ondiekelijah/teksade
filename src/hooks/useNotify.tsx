import { ErrorIcon, SuccessIcon } from "@/components/custom-components/icons/actionIcons";
import { showNotification } from "@mantine/notifications";

interface NotificationOptions {
  title?: string;
  message: string;
}

const useMantineNotify = () => {
  const notifySuccess = ({ message, title = "Success" }: NotificationOptions) => {
    showNotification({
      title,
      message,
      color: "green",
      icon: <SuccessIcon />,
    });
  };

  const notifyError = ({ message, title = "That didn't work" }: NotificationOptions) => {
    showNotification({
      title,
      message,
      color: "red",
      icon: <ErrorIcon />,
    });
  };

  return { notifySuccess, notifyError };
};

export default useMantineNotify;
