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
    } else if (
      Array.isArray(srcVal) &&
      srcVal.length === 0 &&
      Array.isArray(target?.[key]) &&
      target[key].length > 0
    ) {
      // Keep seeded defaults when Firestore has an empty list (legacy CMS data).
      output[key] = [...target[key]]
    } else {
      output[key] = srcVal
    }
  })
  return output
}
