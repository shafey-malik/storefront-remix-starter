import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getCollections } from '~/providers/collections/collections';

export async function loader({ request }) {
  const collections = await getCollections(request, { topLevelOnly: true });
  return json({ collections });
}
export async function getTopLevelCollections(request: Request) {
  const { collections } = await sdk.collections(
    { options: { filter: { parentId: { eq: null } } } },
    { request },
  );
  return collections?.items ?? [];
}
export async function getChildCollections(
  request: Request,
  parentSlug: string,
) {
  const { collection } = await sdk.collection(
    { slug: parentSlug },
    { request },
  );
  return collection?.children ?? [];
}
export async function getSubCollections(request: Request, parentSlug: string) {
  const { collection } = await sdk.collection(
    { slug: parentSlug },
    { request },
  );
  return collection?.children ?? [];
}
export async function getProductsInCollection(request: Request, slug: string) {
  const { collection } = await sdk.collection(
    {
      slug,
      variantOptions: {
        take: 20,
      },
    },
    { request },
  );
  return collection?.productVariants?.items ?? [];
}

export async function getCollectionByPath(
  request: Request,
  parentSlug: string,
  childSlug: string,
) {
  const { collection } = await sdk.collection(
    { slug: parentSlug },
    { request },
  );
  const child = collection?.children?.find((c) => c.slug === childSlug);
  return child ?? null;
}

export default function CollectionsPage() {
  const { collections } = useLoaderData<typeof loader>();
  return (
    <section>
      <h1>Collections</h1>
      <ul>
        {collections?.map((c) => (
          <li key={c.id}>
            <a href={`/collections/${c.slug}`}>
              {c.featuredAsset && (
                <img src={c.featuredAsset.preview} alt={c.name} width={150} />
              )}
              <p>{c.name}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
