import { useState, useEffect } from "react";

interface ImageCheckResult {
  isValidImageType: boolean;
}

function useCheckImageType(profileImage?: File | null): ImageCheckResult {
  const [isValidImageType, setIsValidImageType] = useState<boolean>(false);

  useEffect(() => {
    if (!profileImage) {
      setIsValidImageType(false);
      return;
    }

    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.svg)$/i;

    if (allowedExtensions.exec(profileImage.name)) {
      setIsValidImageType(true);
    } else {
      setIsValidImageType(false);
    }
  }, [profileImage]);

  return { isValidImageType };
}

export default useCheckImageType;
