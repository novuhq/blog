import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { NovuComponent } from "@biddingnew/components/novu.component";
import { NewProduct } from "@biddingnew/components/new.product";
import { revalidatePath } from "next/cache";
import { BidInput } from "@biddingnew/components/bid.input";
import { ITriggerPayloadOptions } from "@novu/node/build/main/lib/events/events.interface";
import { Novu } from "@novu/node";
const novu = new Novu("API_KEY");

export default async function Home() {
  const addBid = async (id: number, bid: number) => {
    "use server";
    // @ts-ignore
    const login = cookies().get("login");
    await sql`UPDATE bids SET total_bids = total_bids + ${bid} WHERE id = ${id}`;
    const { rows } = await sql`SELECT * FROM bids WHERE id = ${id}`;

    await novu.trigger("host-inform-bid", {
      to: [
        {
          subscriberId: rows[0].owner,
        },
      ],
      payload: {
        name: login?.value!,
        bid: bid,
      },
    });

    await novu.topics.addSubscribers(`bid-${id}`, {
      subscribers: [login?.value!],
    });

    await novu.trigger("new-bid-in-the-system", {
      to: [{ type: "Topic", topicKey: `bid-${id}` }],
      payload: {
        name: login?.value!,
        bid: bid,
      },
      actor: { subscriberId: login?.value! },
    } as ITriggerPayloadOptions);
    revalidatePath("/");
  };

  const addProduct = async (product: string) => {
    "use server";
    // @ts-ignore
    const login = cookies().get("login");
    const { rows } =
      await sql`INSERT INTO bids (name, owner, total_bids) VALUES(${product}, ${login?.value!}, 0) RETURNING id`;
    await novu.topics.create({
      key: `bid-${rows[0].id}`,
      name: "People inside of a bid",
    });
    revalidatePath("/");
  };

  const { rows } = await sql`SELECT * FROM bids ORDER BY id DESC`;

  // @ts-ignore
  const login = cookies().get("login");

  return (
    <div className="text-black container mx-auto p-4 border-l border-white border-r min-h-[100vh]">
      <div className="flex">
        <h1 className="flex-1 text-3xl font-bold mb-4 text-white">
          Product Listing ({login?.value!})
        </h1>
        <div>
          <NovuComponent user={login?.value!} />
        </div>
      </div>
      <NewProduct addProduct={addProduct} />
      <div className="grid grid-cols-3 gap-4">
        {rows.map((product) => (
          <div key={product.id} className="bg-white border border-gray-300 p-4">
            <div className="text-lg mb-2">
              <strong>Product Name</strong>: {product.name}
            </div>
            <div className="text-lg mb-2">
              <strong>Owner</strong>: {product.owner}
            </div>
            <div className="text-lg">
              <strong>Current Bid</strong>: {product.total_bids}
            </div>
            <div>
              <BidInput addBid={addBid} id={product.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
