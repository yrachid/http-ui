export type StatuCodeProps = {
  statusCode: number;
};

const STATUS_CODE_TEXT: Record<number, string> = {
  200: "OK",
  403: "Forbidden",
  404: "Not Found",
};

export const StatusCode = (props: StatuCodeProps) => (
  <div>
    Status: {props.statusCode} {STATUS_CODE_TEXT[props.statusCode] ?? ""}
  </div>
);
