import { BarChart3, Boxes, CheckCircle2, CircleDollarSign, Clock3, MessageCircle, PackagePlus, Send, ShoppingBag } from "lucide-react";
import { DashboardHeader, StatGrid } from "@/components/sajivo/DashboardBlocks";
import { Button } from "@/components/ui/button";
import { getVendorDashboardData, type VendorDashboardData } from "@/lib/server/repository";

export async function VendorOverview() {
  const data = await getVendorDashboardData();
  const quoted = data.enquiries.filter((item) => item.quotedAmount != null);
  const activeOrders = data.orders.filter((item) => !["delivered", "cancelled"].includes(item.status));
  const orderValue = activeOrders.reduce((sum, item) => sum + item.totalAmount, 0);
  const conversion = data.enquiries.length ? Math.round((data.orders.length / data.enquiries.length) * 100) : 0;
  return <><DashboardHeader eyebrow="Retailer workspace" title="Business overview" text="Track enquiries, quotations, orders, and product activity from one workspace." action={<Button size="sm"><PackagePlus size={15} />Add product</Button>} /><StatGrid stats={[{ label: "New enquiries", value: data.enquiries.filter((item) => item.status === "new").length, detail: `${data.enquiries.length} total`, trend: "neutral" }, { label: "Open quotations", value: quoted.length, detail: `${formatMoney(quoted.reduce((sum, item) => sum + (item.quotedAmount ?? 0), 0))} value`, trend: "neutral" }, { label: "Active orders", value: activeOrders.length, detail: `${formatMoney(orderValue)} value`, trend: "neutral" }, { label: "Conversion", value: `${conversion}%`, detail: "orders from enquiries", trend: "neutral" }]} /><div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]"><VendorTable title="Recent opportunities" type="opportunities" data={data} /><aside className="rounded-lg border border-[#e3e4e7] bg-white p-5"><h2 className="text-sm font-semibold">Store readiness</h2><div className="mt-5 grid gap-4"><Readiness icon={CheckCircle2} label="Business profile" value="Connected" /><Readiness icon={Boxes} label="Catalog" value={`${data.products.length} products`} /><Readiness icon={Clock3} label="Open enquiries" value={String(data.enquiries.filter((item) => item.status !== "closed").length)} /><Readiness icon={BarChart3} label="Recorded orders" value={String(data.orders.length)} /></div></aside></div></>;
}

export async function VendorSection({ type }: { type: "opportunities" | "quotations" | "orders" | "catalog" | "verifications" | "messages" }) {
  const data = await getVendorDashboardData();
  const copy = {
    opportunities: ["Customer enquiries", "Review product and material requirements matched to your retail categories."],
    quotations: ["Quotations", "Prepare transparent product, delivery, tax, and validity details for customers."],
    orders: ["Orders", "Track accepted quotations from confirmation through delivery."],
    catalog: ["Product catalog", "Manage searchable products, prices, stock visibility, and specifications."],
    verifications: ["Business verification", "Submit identity and retailer documents to earn the Sajivo verified badge."],
    messages: ["Messages", "Keep customer conversations attached to the correct enquiry and order."],
  } as const;
  const [title, text] = copy[type];
  return <><DashboardHeader eyebrow="Retailer workspace" title={title} text={text} action={type === "catalog" ? <Button size="sm"><PackagePlus size={15} />Add product</Button> : undefined} />{type === "opportunities" || type === "quotations" || type === "orders" || type === "catalog" ? <VendorTable title={title} type={type} data={data} /> : <div className="rounded-lg border border-[#e3e4e7] bg-white p-8"><div className="grid h-12 w-12 place-items-center rounded-md bg-[#f2f2f3] text-[#34363a]">{type === "messages" ? <MessageCircle /> : <CheckCircle2 />}</div><h2 className="mt-5 text-lg font-semibold">{title} is ready</h2><p className="mt-2 max-w-xl text-sm leading-6 text-[#6f7277]">This workspace is connected to the signed-in retailer account in Supabase. Records appear here as the business receives activity.</p></div>}</>;
}

function VendorTable({ title, type, data }: { title: string; type: "opportunities" | "quotations" | "orders" | "catalog"; data: VendorDashboardData }) {
  const rows = type === "orders"
    ? data.orders.map((item) => ({ id: item.id, title: `Order ${item.id.slice(0, 8)}`, detail: formatMoney(item.totalAmount), meta: item.expectedDeliveryDate ?? "Delivery pending", status: item.status }))
    : type === "catalog"
      ? data.products.map((item) => ({ id: item.id, title: item.name, detail: item.category, meta: item.price == null ? "Price on request" : formatMoney(item.price), status: item.stockStatus }))
      : data.enquiries.filter((item) => type === "opportunities" || item.quotedAmount != null).map((item) => ({ id: item.id, title: item.subject, detail: item.quotedAmount == null ? "Awaiting quote" : formatMoney(item.quotedAmount), meta: new Date(item.createdAt).toLocaleDateString("en-IN"), status: item.status }));
  return <section className="overflow-hidden rounded-lg border border-[#e3e4e7] bg-white"><div className="flex items-center justify-between border-b border-[#ececef] px-5 py-4"><h2 className="text-sm font-semibold">{title}</h2><span className="text-xs text-[#6f7277]">{rows.length} records</span></div>{rows.length ? <div className="divide-y divide-[#ececef]">{rows.map((row) => <div key={row.id} className="grid gap-3 px-5 py-4 text-sm sm:grid-cols-[minmax(0,1.5fr)_1fr_0.8fr_auto] sm:items-center"><div className="font-semibold">{row.title}</div><div className="text-[#6f7277]">{row.detail}</div><div className="text-[#6f7277]">{row.meta}</div><Button variant="outline" size="sm">{row.status === "new" ? <Send size={14} /> : <CircleDollarSign size={14} />}{row.status.replaceAll("_", " ")}</Button></div>)}</div> : <div className="p-10 text-center"><ShoppingBag className="mx-auto text-[#a2a4a8]" size={24} /><h3 className="mt-3 text-sm font-semibold">No {title.toLowerCase()} yet</h3><p className="mt-1 text-xs text-[#777a80]">New Supabase records owned by this retailer will appear here automatically.</p></div>}</section>;
}

function formatMoney(value: number) { return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value); }

function Readiness({ icon: Icon, label, value }: { icon: typeof CheckCircle2; label: string; value: string }) {
  return <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-md bg-[#f2f2f3]"><Icon size={17} /></span><span className="min-w-0 flex-1 text-sm text-[#6f7277]">{label}</span><span className="text-sm font-semibold">{value}</span></div>;
}
