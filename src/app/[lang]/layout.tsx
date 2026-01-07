import { Metadata } from 'next';
import { generateAlternates, Language } from '@/lib/i18n';
import { headers } from 'next/headers';

type Props = {
  params: { lang: Language };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const headersList = headers();
  const pathname = headersList.get('x-next-pathname') || '';
  const alternates = generateAlternates(params.lang, pathname);

  return {
    alternates,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
