import { GetWithHeaders } from "../../wailsjs/go/main/App";
import { HttpRequest } from "../RequestContext";

function get(request: HttpRequest) {
  return GetWithHeaders(request);
}

export default { get };
