import { Form, Link } from '@remix-run/react';
import { Price } from '~/components/products/Price';
import { ActiveOrderQuery, CurrencyCode } from '~/generated/graphql';
import { useTranslation } from 'react-i18next';

export function CartContents({
  orderLines,
  currencyCode,
  editable = true,
  adjustOrderLine,
  removeItem,
}: {
  orderLines: NonNullable<ActiveOrderQuery['activeOrder']>['lines'];
  currencyCode: CurrencyCode;
  editable: boolean;
  adjustOrderLine?: (lineId: string, quantity: number) => void;
  removeItem?: (lineId: string) => void;
}) {
  const { t } = useTranslation();
  const isEditable = editable !== false;

  return (
    <div className="flow-root">
      <ul role="list" className="space-y-4">
        {(orderLines ?? []).map((line) => (
          <li
            key={line.id}
            className="p-4 rounded-lg border border-[hsl(var(--border))] bg-gradient-to-br from-[hsl(var(--card))] to-[hsl(var(--card)/95%)] hover:shadow-lg transition-all duration-300 flex gap-4"
          >
            <div className="flex-shrink-0 w-20 h-20 rounded-lg border border-[hsl(var(--border))] overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
              <img
                src={line.featuredAsset?.preview + '?preset=thumb'}
                alt={line.productVariant.name}
                className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="ml-0 flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className="text-sm font-luxury-serif font-semibold text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                  <Link to={`/products/${line.productVariant.product.slug}`}>
                    {line.productVariant.name}
                  </Link>
                </h3>
                <p className="text-lg font-luxury-sans font-bold text-[hsl(var(--secondary-rich))]">
                  <Price
                    priceWithTax={line.linePriceWithTax}
                    currencyCode={currencyCode}
                  ></Price>
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[hsl(var(--border))/30%)]">
                {editable ? (
                  <Form className="flex items-center gap-2">
                    <label
                      htmlFor={`quantity-${line.id}`}
                      className="text-xs font-luxury-sans font-semibold text-[hsl(var(--foreground))] uppercase tracking-wide"
                    >
                      {t('common.quantity')}
                    </label>
                    <select
                      className=" border border-red px-3 py-1.5 text-sm font-medium text-black bg-[hsl(var(--lead-text))] cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      disabled={!isEditable}
                      id={`quantity-${line.id}`}
                      name={`quantity-${line.id}`}
                      value={line.quantity}
                      onChange={(e) =>
                        adjustOrderLine &&
                        adjustOrderLine(line.id, +e.target.value)
                      }
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                    </select>
                  </Form>
                ) : (
                  <div className="text-[hsl(var(--foreground))]">
                    <span className="text-xs font-luxury-sans font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
                      {t('common.quantity')}
                    </span>
                    <span className="ml-2 font-medium text-sm ">
                      {line.quantity}
                    </span>
                  </div>
                )}
                <div className="flex-1"></div>
                <div className="flex">
                  {isEditable && (
                    <button
                      type="submit"
                      name="removeItem"
                      value={line.id}
                      className="text-xs font-luxury-sans font-semibold text-[hsl(var(--primary))] hover:text-red-500 hover:bg-red-500/10 px-3 py-1.5 rounded-md transition-all duration-200 uppercase tracking-wide"
                      onClick={() => removeItem && removeItem(line.id)}
                    >
                      {t('common.remove')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
