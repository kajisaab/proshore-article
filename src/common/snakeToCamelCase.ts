function snakeToCamel(obj: Record<string, object | string>): Record<string, string | object> {
  const camelObj: Record<string, object | string> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = key.replace(/_([a-z])/g, (_, match) => match.toUpperCase());
      const value = obj[key];

      if (value !== null && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
        const recursionValue: Record<string, object> = value as Record<string, object>;
        camelObj[camelKey] = snakeToCamel(recursionValue);
      } else {
        camelObj[camelKey as string] = value;
      }
    }
  }

  return camelObj;
}

export default snakeToCamel;
