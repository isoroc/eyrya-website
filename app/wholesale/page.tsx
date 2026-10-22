import { Metadata } from 'next';
import Link from 'next/link';
import { Check, ExternalLink, Palette, Printer, Ruler } from 'lucide-react';
import JsonLd from '@/app/components/JsonLd';
import WholesaleForm from './WholesaleForm';
import { BRAND, MARKETPLACES, formatCount } from '@/lib/products';
import {
  BULK_ROUTES,
  WHOLESALE,
  WHOLESALE_FAQ,
  formatMinimumOrder,
  formatMinimumOrderPerColor,
  formatWholesaleSize,
} from '@/lib/wholesale';

export const metadata: Metadata = {
  title: { absolute: 'Foam Finger Bulk Orders | Custom Manufacturing | EYRYA' },
  description: `Foam finger bulk orders: ${formatWholesaleSize()} EVA hands in your colours and thickness, with your logo silk-screened on. ${formatMinimumOrderPerColor()}, ${WHOLESALE.leadTimeWeeks}-week lead time.`,
  keywords:
    'foam finger bulk, bulk foam fingers, foam finger bulk order, bulk foam hands, foam fingers wholesale, custom foam fingers, foam fingers with logo, silk screen foam fingers',
  alternates: {
    canonical: `${BRAND.siteUrl}/wholesale/`,
  },
  openGraph: {
    title: 'Foam Finger Bulk Orders - Custom Manufacturing',
    description: `Foam finger bulk orders in your colours and thickness, with your logo silk-screened on. ${formatMinimumOrderPerColor()}.`,
    type: 'website',
    url: `${BRAND.siteUrl}/wholesale/`,
    siteName: 'EYRYA',
    images: [
      {
        url: `${BRAND.siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Custom foam finger manufacturing by EYRYA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Foam Finger Bulk Orders - Custom Manufacturing',
    description: `Foam finger bulk orders in your colours and thickness, with your logo silk-screened on. ${formatMinimumOrderPerColor()}.`,
    images: [`${BRAND.siteUrl}/images/og-image.png`],
  },
};

const specifications: { label: string; value: string }[] = [
  { label: 'Size', value: formatWholesaleSize() },
  { label: 'Material', value: WHOLESALE.material },
  { label: 'Thickness', value: 'Made to order' },
  { label: 'Colours', value: 'Matched to your specification' },
  { label: 'Logo', value: WHOLESALE.printing },
  { label: 'Minimum order', value: formatMinimumOrderPerColor() },
  { label: 'Packing', value: WHOLESALE.packing[0] },
  { label: 'Individual bagging', value: 'OPP bag per piece on request' },
  { label: 'Lead time', value: `About ${WHOLESALE.leadTimeWeeks} weeks after deposit` },
  { label: 'Payment', value: `${WHOLESALE.depositPercent}% deposit, balance before shipment` },
  { label: 'Price', value: WHOLESALE.pricing },
  { label: 'Shipping', value: WHOLESALE.shipping },
];

const customisation = [
  {
    icon: Ruler,
    title: 'Thickness to order',
    description: 'Tell us the EVA thickness you need and we produce to it, rather than forcing you onto a stock spec.',
  },
  {
    icon: Palette,
    title: 'Colours matched',
    description: 'Colours are matched to your specification - team colours, brand colours, or a full range.',
  },
  {
    icon: Printer,
    title: 'Your logo, silk-screened',
    description: 'Send vector artwork and we apply your logo by silk-screen printing directly on the foam.',
  },
];

const steps = [
  { title: 'Send your requirement', description: 'Artwork, colours, thickness, quantity per colour, and where it ships.' },
  { title: 'We quote', description: `${WHOLESALE.pricing} - pricing depends on quantity, printing, and packing.` },
  { title: 'Confirm the spec', description: 'We agree colours, logo placement, and packing before anything is produced.' },
  { title: `${WHOLESALE.depositPercent}% deposit`, description: 'Production is scheduled once the deposit clears.' },
  { title: `Production, about ${WHOLESALE.leadTimeWeeks} weeks`, description: `${formatCount(WHOLESALE.piecesPerCarton)} pieces per carton, individual OPP bagging if you need it.` },
  { title: 'Balance, then shipment', description: `Balance before shipment. ${WHOLESALE.shipping}.` },
];

export default function WholesalePage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h1 className="text-3xl md:text-4xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
            Foam Finger Bulk Orders, Made to Your Specification
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            Foam finger bulk, made to order: {formatWholesaleSize()} EVA hands with your thickness,
            your colours, and your logo applied by silk-screen printing. The minimum is{' '}
            <strong className="text-[#1a1a1a]">{formatMinimumOrderPerColor()}</strong>, production takes
            about {WHOLESALE.leadTimeWeeks} weeks, and pricing is quoted per project.
          </p>
          <p className="text-gray-600">
            If you need a handful rather than a container, buy the retail packs from{' '}
            <Link href={MARKETPLACES.amazon.url} target="_blank" rel="noopener noreferrer" className="text-[#DC2626] hover:underline">
              Amazon
            </Link>{' '}
            or{' '}
            <Link href={MARKETPLACES.temu.url} target="_blank" rel="noopener noreferrer" className="text-[#DC2626] hover:underline">
              Temu
            </Link>
            . This page is for custom production runs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
              Bulk quantities: what you get at each level
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Foam finger bulk means different things at different volumes. Here is the split before you
              fill in the form, so you know which route fits.
            </p>
            <div className="space-y-3 mb-10">
              {BULK_ROUTES.map((route) => (
                <div key={route.route} className="bg-[#fafafa] p-5">
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <h3 className="font-semibold text-[#1a1a1a]">{route.route}</h3>
                    <span className="text-sm font-bold text-[#DC2626] whitespace-nowrap">
                      {route.quantity}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{route.detail}</p>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-6">
              What we customise
            </h2>

            <div className="space-y-4 mb-10">
              {customisation.map((item) => (
                <div key={item.title} className="bg-[#fafafa] p-5 flex gap-4">
                  <item.icon className="w-6 h-6 text-[#DC2626] flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-6">
              Specifications
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm mb-10">
              {specifications.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-4 border-b border-gray-100 pb-2">
                  <dt className="text-gray-500">{spec.label}</dt>
                  <dd className="font-medium text-[#1a1a1a] text-right">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-6">
              How a custom order works
            </h2>
            <ol className="space-y-4 mb-10">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex-shrink-0 w-7 h-7 bg-[#1a1a1a] text-white text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a]">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-6">
              What these runs are used for
            </h2>
            <ul className="space-y-2 text-gray-600 mb-10">
              {WHOLESALE.useCases.map((useCase) => (
                <li key={useCase} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#DC2626] flex-shrink-0" />
                  {useCase}
                </li>
              ))}
            </ul>

            <div className="border border-gray-200 p-6">
              <h3 className="font-semibold text-[#1a1a1a] mb-4">Who a run this size suits</h3>
              <ul className="space-y-2 text-gray-600">
                {WHOLESALE.audience.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#DC2626] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <WholesaleForm />
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-8">
            Foam finger bulk FAQ
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {WHOLESALE_FAQ.map((item) => (
              <div key={item.question} className="bg-[#fafafa] p-6">
                <h3 className="font-semibold text-[#1a1a1a] mb-2">{item.question}</h3>
                <p className="text-gray-600 text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-[#1a1a1a] p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-['Teko'] uppercase font-bold text-white mb-4">
              Only need a few?
            </h2>
            <p className="text-gray-400 mb-6">
              Custom production starts at {formatMinimumOrder()}. For smaller quantities, our 12-pack
              and 6-pack retail listings ship immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={MARKETPLACES.amazon.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#1a1a1a] px-6 py-3 font-semibold hover:bg-gray-100 transition-colors rounded-sm"
              >
                Shop the 12-pack on Amazon
                <ExternalLink className="w-4 h-4" />
              </Link>
              <Link
                href={MARKETPLACES.temu.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 font-semibold hover:bg-white/20 transition-colors rounded-sm"
              >
                Shop the 6-pack on Temu
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Custom foam finger manufacturing',
          serviceType: 'Custom EVA foam finger manufacturing and logo printing',
          provider: {
            '@type': 'Organization',
            name: BRAND.name,
            url: `${BRAND.siteUrl}/`,
          },
          description: `Custom ${formatWholesaleSize()} EVA foam fingers: thickness and colours made to order, logo applied by silk-screen printing. Minimum ${formatMinimumOrderPerColor()}, lead time about ${WHOLESALE.leadTimeWeeks} weeks.`,
          url: `${BRAND.siteUrl}/wholesale/`,
        }} />

        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: WHOLESALE_FAQ.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }} />

        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BRAND.siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Wholesale', item: `${BRAND.siteUrl}/wholesale/` },
          ],
        }} />
      </div>
    </div>
  );
}
