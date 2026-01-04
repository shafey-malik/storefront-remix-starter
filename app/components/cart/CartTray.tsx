import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CartContents } from './CartContents';
import { Link, useLocation } from '@remix-run/react';
import { Price } from '~/components/products/Price';
import { CartLoaderData } from '~/routes/api.active-order';
import { CurrencyCode } from '~/generated/graphql';
import { useTranslation } from 'react-i18next';

export function CartTray({
  open,
  onClose,
  activeOrder,
  adjustOrderLine,
  removeItem,
}: {
  open: boolean;
  onClose: (closed: boolean) => void;
  activeOrder: CartLoaderData['activeOrder'];
  adjustOrderLine?: (lineId: string, quantity: number) => void;
  removeItem?: (lineId: string) => void;
}) {
  const currencyCode = activeOrder?.currencyCode || CurrencyCode.Usd;
  const location = useLocation();
  const editable = !location.pathname.startsWith('/checkout');
  const { t } = useTranslation();

  return (
    <Transition.Root show={open} as={Fragment} style={{ zIndex: 200 }}>
      <Dialog
        as="div"
        className="relative inset-0 overflow-hidden z-200"
        onClose={onClose}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/30 dark:bg-black/50 transition-opacity z-0" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-3 sm:pl-10 max-w-full flex z-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300 sm:duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300 sm:duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-xs sm:max-w-md">
                <div className="h-full flex flex-col bg-[hsl(var(--card))] shadow-[var(--shadow-card)] overflow-y-scroll">
                  <div className="flex-1 py-4 sm:py-6 overflow-y-auto px-3 sm:px-6">
                    <div className="flex items-start justify-between gap-2">
                      <Dialog.Title className="text-base sm:text-lg font-medium text-[hsl(var(--foreground))]">
                        {t('cart.title')}
                      </Dialog.Title>
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          className="-m-2 p-1 sm:p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                          onClick={() => onClose(false)}
                        >
                          <span className="sr-only">
                            {t('common.closePanel')}
                          </span>
                          <XMarkIcon
                            className="h-5 w-5 sm:h-6 sm:w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-8">
                      {activeOrder?.totalQuantity ? (
                        <CartContents
                          orderLines={activeOrder?.lines ?? []}
                          currencyCode={currencyCode!}
                          editable={editable}
                          removeItem={removeItem}
                          adjustOrderLine={adjustOrderLine}
                        ></CartContents>
                      ) : (
                        <div className="flex items-center justify-center h-40 sm:h-48 text-base sm:text-xl text-[hsl(var(--muted-foreground))]">
                          {t('cart.empty')}
                        </div>
                      )}
                    </div>
                  </div>

                  {activeOrder?.totalQuantity && editable && (
                    <div className="border-t border-[hsl(var(--border))] py-4 sm:py-6 px-3 sm:px-6">
                      <div className="flex justify-between text-sm sm:text-base font-medium text-[hsl(var(--foreground))]">
                        <p>{t('common.subtotal')}</p>
                        <p>
                          {currencyCode && (
                            <Price
                              priceWithTax={activeOrder?.subTotalWithTax ?? 0}
                              currencyCode={currencyCode}
                            />
                          )}
                        </p>
                      </div>
                      <p className="mt-0.5 text-xs sm:text-sm text-[hsl(var(--muted-foreground))]">
                        {t('cart.shippingMessage')}
                      </p>
                      <div className="mt-4 sm:mt-6">
                        <Link
                          to="/checkout"
                          onClick={() => onClose(false)}
                          className="flex justify-center items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-secondary bg-primary hover:bg-primary/70"
                        >
                          {t('cart.checkout')}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
