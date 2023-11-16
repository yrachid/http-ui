import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

type RequestReduction =
  | { type: "update_url"; newUrl: string }
  | { type: "set_header"; header: Record<string, string> }
  | { type: "remove_header"; name: string };

const removeHeader = (
  headers: Record<string, string>,
  headerToRemove: string
) => {
  const { [headerToRemove]: _, ...restOfHeaders } = headers;
  return restOfHeaders;
};

export const reducer = (
  currentState: HttpRequest,
  action: RequestReduction
): HttpRequest => {
  switch (action.type) {
    case "update_url":
      return { ...currentState, url: action.newUrl };
    case "set_header":
      return {
        ...currentState,
        headers: {
          ...currentState.headers,
          ...action.header,
        },
      };
    case "remove_header":
      return {
        ...currentState,
        headers: removeHeader(currentState.headers, action.name),
      };
    default:
      return currentState;
  }
};

type HttpRequest = {
  url: string;
  headers: Record<string, string>;
};

type ContextProviderProps = {
  children: ReactNode;
  initialRequest?: HttpRequest;
};

export const RequestContext = createContext<HttpRequest>(null!);
export const RequestDispatchContext = createContext<Dispatch<RequestReduction>>(
  null!
);

export const useRequest = () => useContext(RequestContext);
export const useRequestDispatch = () => useContext(RequestDispatchContext);

const DEFAULT_INITIAL_REQUEST = {
  url: "",
  headers: {},
};

export const RequestContextProvider = ({
  children,
  initialRequest,
}: ContextProviderProps) => {
  const [request, dispatch] = useReducer(
    reducer,
    initialRequest ?? DEFAULT_INITIAL_REQUEST
  );

  return (
    <RequestContext.Provider value={request}>
      <RequestDispatchContext.Provider value={dispatch}>
        {children}
      </RequestDispatchContext.Provider>
    </RequestContext.Provider>
  );
};
