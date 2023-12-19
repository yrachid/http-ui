export type ResponseHeadersProps = {
  headers: Record<string, string[]>;
};

type Headers = Record<string, string[]>;

type FlattenedHeader = {
  name: string;
  value: string;
};

const headerFlattener =
  (headers: Headers) => (flattenedHeaders: FlattenedHeader[], name: string) =>
    flattenedHeaders.concat(headers[name].map((value) => ({ name, value })));

const flattenHeaders = (
  headers: Record<string, string[]>
): Array<FlattenedHeader> =>
  Object.keys(headers).reduce(headerFlattener(headers), []);

type HeaderProps = {
  name: string;
  value: string;
};

const Header = (props: HeaderProps) => {
  return (
    <p role="response-header">
      <span>{props.name}: </span>
      <span>{props.value}</span>
    </p>
  );
};

export const ResponseHeaders = (props: ResponseHeadersProps) => (
  <div role="response-headers">
    <h3>Response Headers Go Here.</h3>
    {flattenHeaders(props.headers).map((flattenedHeader, index) => (
      <Header
        name={flattenedHeader.name}
        value={flattenedHeader.value}
        key={`${index}${flattenedHeader.name}${flattenedHeader.value}`}
      />
    ))}
  </div>
);
