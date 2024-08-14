import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { invoices, latestInvoices, revenue } from '../lib/placeholder-data';

export default async function Page() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card title="Collected" value='200' type="collected" />
                <Card title="Pending" value='300' type="pending" />
                <Card title="Total Invoices" value='500' type="invoices" />
                <Card
                    title="Total Customers"
                    value='100'
                    type="customers"
                />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <RevenueChart revenue={revenue} />
                <LatestInvoices latestInvoices={latestInvoices} />
            </div>
        </main>
    );
}