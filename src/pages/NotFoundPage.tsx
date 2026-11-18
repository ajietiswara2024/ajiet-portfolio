import { ArrowLeft } from 'lucide-react'
import { ButtonLink } from '../components/ui/Button'
import { useDocumentMeta } from '../hooks/useDocumentTitle'
import { ui } from '../i18n/ui'

export function NotFoundPage({ message = ui.notFound.message }: { message?: string }) {
  useDocumentMeta(ui.notFound.title)
  return (
    <section className="flex min-h-[80svh] items-center pt-24">
      <div className="container-x text-center">
        <p className="font-mono text-sm text-accent">{ui.notFound.code}</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-6xl">{message}</h1>
        <div className="mt-10 flex justify-center">
          <ButtonLink to="/" icon={<ArrowLeft size={16} />}>
            {ui.notFound.back}
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
