export function glanceTitleFromContent(content = {}) {
  return {
    line1: content.pageTitleLine1 || content.titleLine1 || 'ATS At a',
    highlight: content.pageTitleHighlight || content.titleHighlight || 'Glance',
  }
}
