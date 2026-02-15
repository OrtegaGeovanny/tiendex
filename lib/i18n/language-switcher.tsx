'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Locale } from './config'

export function useLanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('common')

  const switchLanguage = (newLocale: Locale) => {
    router.push(pathname)
  }

  return {
    currentLocale: locale,
    switchLanguage,
  }
}
