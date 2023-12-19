import Input from "@mui/joy/Input";
import Grid from "@mui/joy/Grid";

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
    <>
      <Grid xs={6}>
        <Input
          sx={{ borderRadius: "0px", fontFamily: "monospace" }}
          value={props.name}
          disabled
        />
      </Grid>
      <Grid xs={6}>
        <Input
          sx={{ borderRadius: "0px", fontFamily: "monospace" }}
          value={props.value}
          disabled
        />
      </Grid>
    </>
  );
};

export const ResponseHeaders = (props: ResponseHeadersProps) => (
  <Grid container role="response-headers">
    {flattenHeaders(props.headers).map((flattenedHeader, index) => (
      <Header
        name={flattenedHeader.name}
        value={flattenedHeader.value}
        key={`${index}${flattenedHeader.name}${flattenedHeader.value}`}
      />
    ))}
  </Grid>
);
