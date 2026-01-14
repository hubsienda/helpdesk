type AnyObj = Record<string, any>;

function getPath(obj: AnyObj, path: string): any {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}

export async function loadMessages(locale: string): Promise<AnyObj> {
  // Only allow the locales you support
  if (!["en", "es", "it"].includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }
  return (await import(`../messages/${locale}.json`)).default;
}

export function makeT(messages: AnyObj, namespace: string) {
  return (key: string, vars?: Record<string, string | number>) => {
    const value = getPath(messages, `${namespace}.${key}`);
    if (typeof value !== "string") return `${namespace}.${key}`;
    return interpolate(value, vars);
  };
}
