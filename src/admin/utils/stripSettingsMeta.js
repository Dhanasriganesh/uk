export function stripSettingsMeta(settings) {
  const next = structuredClone(settings)
  delete next.updatedAt
  delete next.updatedBy
  return next
}
