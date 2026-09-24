import React from "react";

type OTPSeparatorProps = {
  index: number;
  separator: React.ReactNode;
  separatorSet: Set<number>;
};

const OTPSeparator: React.FC<OTPSeparatorProps> = ({
  index,
  separator,
  separatorSet,
}) => {
  if (!separator) return null;
  if (!separatorSet.has(index)) return null;

  return (
    <span className="sui-otp__separator" data-index={index}>
      {separator}
    </span>
  );
};

export default OTPSeparator;
