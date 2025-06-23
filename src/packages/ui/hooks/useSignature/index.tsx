"use client";
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { IYardPerson, SignatureTypes } from "@repo/models";

export const useSignature = () => {
  const signatureCanvasRef = useRef<SignatureCanvas | null>(null);

  const returnSignatureCanvasWidth = (): number => {
    const isMobile: boolean = window.screen.width <= 1100;

    if (isMobile) return window.screen.width * 0.8;
    return window.screen.width * 0.45;
  };

  const closeModal = (onClose: () => void) => {
    clearSignature();
    onClose();
  };

  const clearSignature = () => {
    if (signatureCanvasRef.current) {
      signatureCanvasRef.current.clear();
    }
  };

  //saves signature image as base64 in local storage
  const saveSignature = (
    moveId: string,
    signatureType: SignatureTypes,
    onClose: () => void,
    setIsSignatureCompleted: (isSigned: boolean) => void,
    onEmptySign: () => void,
    user: IYardPerson
  ) => {
    if (signatureCanvasRef.current) {
      if (signatureCanvasRef.current.isEmpty()) {
        onClose();
        onEmptySign();
        return;
      }

      const signatureImage = signatureCanvasRef.current.toDataURL();

      if (typeof window !== "undefined") {
        localStorage.setItem(`${signatureType}-${moveId}`, signatureImage);

        if (user)
          localStorage.setItem(
            `${signatureType}-${moveId}-user`,
            JSON.stringify(user)
          );
      }

      setIsSignatureCompleted(true);
    }
    onClose();
  };

  return {
    signatureCanvasRef,
    closeModal,
    saveSignature,
    clearSignature,
    returnSignatureCanvasWidth,
  };
};
