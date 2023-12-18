export type StatuCodeProps = {
  code: number;
};

const STATUS_CODE_TEXT: Record<number, string> = {
  200: "OK",
  201: "Created",
  403: "Forbidden",
  404: "Not Found",
  504: "Gateway Timeout",
};

export const StatusCode = (props: StatuCodeProps) => (
  <div role="response-status-code">
    Status: {props.code} {STATUS_CODE_TEXT[props.code] ?? ""}
  </div>
);
