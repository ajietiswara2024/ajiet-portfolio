import { ui } from '../i18n/ui'
import { useEffect } from 'react'

const DEFAULT_TITLE = ui.meta.defaultTitle

/** Sets document title and meta description for the current route. */
export function useDocumentMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — A. Ajiet Iswara Putra` : DEFAULT_TITLE
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previous = meta?.content
    if (meta && description) meta.content = description
    return () => {
      document.title = DEFAULT_TITLE
      if (meta && previous) meta.content = previous
    }
  }, [title, description])
}
