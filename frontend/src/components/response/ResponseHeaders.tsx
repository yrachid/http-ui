import Table from "@mui/joy/Table";
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
    <tr role="response-header">
      <td>{props.name}: </td>
      <td>{props.value}</td>
    </tr>
  );
};

export const ResponseHeaders = (props: ResponseHeadersProps) => (
  <Grid container role="response-headers">
    <Table>
      <tbody>
        {flattenHeaders(props.headers).map((flattenedHeader, index) => (
          <Header
            name={flattenedHeader.name}
            value={flattenedHeader.value}
            key={`${index}${flattenedHeader.name}${flattenedHeader.value}`}
          />
        ))}
      </tbody>
    </Table>
  </Grid>
);
