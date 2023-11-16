import {
  createContext,
  Dispatch,
  ReactElement,
  useContext,
  useReducer,
} from "react";

type RequestReduction =
  | { type: "update_url"; newUrl: string }
  | { type: "set_header"; header: Record<string, string> };

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
    default:
      return currentState;
  }
};

type HttpRequest = {
  url: string;
  headers: Record<string, string>;
};

type Props = {
  children: ReactElement[];
};

export const RequestContext = createContext<HttpRequest>(null!);
export const RequestDispatchContext = createContext<Dispatch<RequestReduction>>(
  null!
);

export const useRequest = () => useContext(RequestContext);
export const useRequestDispatch = () => useContext(RequestDispatchContext);

export const RequestContextProvider = (props: Props) => {
  const [request, dispatch] = useReducer(reducer, {
    url: "",
    headers: {},
  });

  return (
    <RequestContext.Provider value={request}>
      <RequestDispatchContext.Provider value={dispatch}>
        {...props.children}
      </RequestDispatchContext.Provider>
    </RequestContext.Provider>
  );
};
