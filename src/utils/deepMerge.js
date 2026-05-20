export function deepMerge(target, source) {
  if (!source || typeof source !== 'object') return target
  const output = Array.isArray(target) ? [...target] : { ...target }
  Object.keys(source).forEach((key) => {
    const srcVal = source[key]
    if (srcVal === undefined) return
    if (
      srcVal &&
      typeof srcVal === 'object' &&
      !Array.isArray(srcVal) &&
      target?.[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      output[key] = deepMerge(target[key], srcVal)
    } else {
      output[key] = srcVal
    }
  })
  return output
}
