export type AlertProps = {
  description: string | null;
  type: TypeAlert;
  position: Positionlert;
};

const OTypeAlert = {
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  WARNING: "WARNING",
} as const;

export type TypeAlert = (typeof OTypeAlert)[keyof typeof OTypeAlert];

const OPositionAlert = {
  TOP: "TOP",
  BUTTOM: "BOTTOM",
} as const;

export type Positionlert = (typeof OPositionAlert)[keyof typeof OPositionAlert];
