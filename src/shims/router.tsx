import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Params = Record<string, string>;

type RouteRecord = {
  pattern: string;
  component: () => ReactNode;
  useParams: () => Params;
};

const routes: RouteRecord[] = [];

type RouterValue = {
  path: string;
  navigate: (to: string) => void;
};

const RouterContext = createContext<RouterValue | null>(null);

function useRouterValue() {
  const value = useContext(RouterContext);
  if (!value) throw new Error("Routeur absent");
  return value;
}

function matchPattern(pattern: string, path: string): Params | null {
  const left = (pattern.replace(/\/$/, "") || "/").split("/").filter(Boolean);
  const right = (path.replace(/\/$/, "") || "/").split("/").filter(Boolean);
  if (left.length !== right.length) return null;
  const params: Params = {};
  for (let i = 0; i < left.length; i += 1) {
    const part = left[i] ?? "";
    const value = right[i] ?? "";
    if (part.startsWith("$")) params[part.slice(1)] = decodeURIComponent(value);
    else if (part !== value) return null;
  }
  return params;
}

function fill(to: string, params?: Params) {
  if (!params) return to;
  return Object.entries(params).reduce((href, [key, value]) => href.replace(`$${key}`, value), to);
}

export function createFileRoute(pattern: string) {
  return (options: { component: () => ReactNode }) => {
    const route: RouteRecord = {
      pattern,
      component: options.component,
      useParams() {
        return matchPattern(pattern, useRouterValue().path) ?? {};
      },
    };
    routes.push(route);
    return route;
  };
}

export function Link({
  to,
  params,
  className,
  children,
  ...rest
}: {
  to: string;
  params?: Params;
  className?: string;
  children?: ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { navigate } = useRouterValue();
  const href = fill(to, params);
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function useNavigate() {
  const { navigate } = useRouterValue();
  return (target: string | { to: string; params?: Params }) => {
    navigate(typeof target === "string" ? target : fill(target.to, target.params));
  };
}

export function useRouterState<T>(options: { select: (state: { location: { pathname: string } }) => T }): T {
  const { path } = useRouterValue();
  return options.select({ location: { pathname: path } });
}

export function RouterView({ children }: { children: (page: ReactNode) => ReactNode }) {
  const [path, setPath] = useState(() => window.location.pathname || "/");

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname || "/");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (to: string) => {
    const next = to.startsWith("/") ? to : `/${to}`;
    window.history.pushState({}, "", next);
    setPath(next);
  };

  const found = routes.find((route) => matchPattern(route.pattern, path));
  const Page = found?.component;
  const page = Page ? <Page /> : <p className="p-8 text-sm text-muted-foreground">Page introuvable.</p>;

  return <RouterContext.Provider value={{ path, navigate }}>{children(page)}</RouterContext.Provider>;
}
