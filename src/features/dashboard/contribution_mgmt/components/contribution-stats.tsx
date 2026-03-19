import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    useGetMonthlySummary,
    useGetSummaryByType,
    useGetYearlySummary,
} from "@/hooks/use-contribution-service";
import { Loader2 } from "lucide-react";

interface Props {
    contributionType: "TITHES" | "OFFERINGS";
}

const fmt = (n: number) =>
    new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS", maximumFractionDigits: 2 }).format(n);

function StatCard({ title, value, sub, loading }: { title: string; value: string; sub: string; loading?: boolean }) {
    return (
        <Card className="@container/card">
            <CardHeader>
                <CardDescription>{title}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {loading ? <Loader2 className="size-5 animate-spin text-muted-foreground" /> : value}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">{sub}</p>
            </CardHeader>
        </Card>
    );
}

export default function ContributionStats({ contributionType }: Props) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const { data: summaryByType, isLoading: loadingByType } = useGetSummaryByType();
    const { data: monthly, isLoading: loadingMonthly } = useGetMonthlySummary(year, month);
    const { data: yearly, isLoading: loadingYearly } = useGetYearlySummary(year);

    const typeData = summaryByType?.find((s) => s.contributionType === contributionType);

    const label = contributionType === "TITHES" ? "Tithes" : "Offerings";

    return (
        <div className="grid grid-cols-2 gap-3 px-1 pb-3 @xl/main:grid-cols-4">
            <StatCard
                title={`Total ${label} Amount`}
                value={typeData ? fmt(typeData.total) : "—"}
                sub="All-time collected"
                loading={loadingByType}
            />
            <StatCard
                title={`Total ${label} Records`}
                value={typeData ? typeData.count.toLocaleString() : "—"}
                sub="Total contributions recorded"
                loading={loadingByType}
            />
            <StatCard
                title="This Month"
                value={monthly ? fmt(monthly.total) : "—"}
                sub={`${now.toLocaleString("default", { month: "long" })} ${year} — all types`}
                loading={loadingMonthly}
            />
            <StatCard
                title="This Year"
                value={yearly ? fmt(yearly.total) : "—"}
                sub={`${year} — all contribution types`}
                loading={loadingYearly}
            />
        </div>
    );
}
