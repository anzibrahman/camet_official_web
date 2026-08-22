// src/pages/TallyAddonsPage.jsx

import React, { useEffect, useMemo, useState } from "react";
import { FaChartLine, FaPlayCircle } from "react-icons/fa";
import api from "@/utils/api";

const TALLY_POSTER_URL =
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85";


const TALLY_ADDON_VIDEO_URL =
  "https://www.youtube.com/embed/41_rsgNRRCg";

const isEmbeddedVideo = (url = "") =>
  /(?:youtu\.be|youtube\.com|vimeo\.com)/i.test(url);

const toEmbedUrl = (url = "") => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    if (parsed.hostname.includes("youtube.com") && !parsed.pathname.startsWith("/embed/")) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    if (parsed.hostname.includes("vimeo.com")) return `https://player.vimeo.com/video/${parsed.pathname.split("/").filter(Boolean).pop()}`;
  } catch { return url; }
  return url;
};


  const fallbackAddons = [
  {
    slug: "address-book",
    title: "Address Book",
    subtitle: "Centralize customer and vendor contacts",
    points: [
      "Save multiple contact details",
      "Quick search and reuse",
      "Better customer management",
    ],
     mediaUrl: TALLY_ADDON_VIDEO_URL,
    mediaType: "youtube",
  },
  {
    slug: "auto-mailing",
    title: "Auto Mailing",
    subtitle: "Send documents automatically",
    points: [
      "Invoice email automation",
      "Template-based dispatch",
      "Reduced manual work",
    ],
  },
  {
    slug: "auto-receipt-voucher-from-sales",
    title: "Auto Receipt Voucher From Sales",
    subtitle: "Create receipt entries from sales",
    points: [
      "Faster accounting workflow",
      "Less manual posting",
      "Accurate transaction linkage",
    ],
  },
  {
    slug: "below-purchase-rate-blocking",
    title: "Below Purchase Rate Blocking In Sales Voucher",
    subtitle: "Prevent selling below allowed margins",
    points: [
      "Margin protection",
      "Rule-based validation",
      "Reduce losses",
    ],
  },
  {
    slug: "bulk-expense-posting",
    title: "Bulk Expense Posting",
    subtitle: "Post expenses in one shot",
    points: [
      "Batch entry support",
      "Time-saving posting",
      "Better expense control",
    ],
  },
  {
    slug: "cost-centre-wise-outstanding",
    title: "Cost Centre Wise Outstanding Filtration",
    subtitle: "Filter outstanding by cost centre",
    points: [
      "Department-wise view",
      "Better reporting",
      "Faster reconciliation",
    ],
  },
  {
    slug: "credit-days-blocking",
    title: "Credit Days Blocking With Approval",
    subtitle: "Control overdue credit transactions",
    points: [
      "Approval-based exceptions",
      "Improved credit discipline",
      "Reduce credit risk",
    ],
  },
  {
    slug: "dashboard-report",
    title: "Dashboard Report",
    subtitle: "Visual overview of business data",
    points: [
      "Charts and summaries",
      "Faster decisions",
      "Management-friendly view",
    ],
  },
  {
    slug: "daybook-total",
    title: "Daybook Total and Selected Line Total",
    subtitle: "Track totals with precision",
    points: [
      "Selected row totals",
      "Better audit visibility",
      "Cleaner daybook analysis",
    ],
  },
  {
    slug: "envelope-printing",
    title: "Envelope Printing",
    subtitle: "Print envelopes directly from data",
    points: [
      "Professional dispatch",
      "Reusable formats",
      "Easy integration",
    ],
  },
  {
    slug: "fast-slow-moving-items",
    title: "Fast and Slow Moving Items",
    subtitle: "Identify inventory movement patterns",
    points: [
      "Stock performance analysis",
      "Avoid dead stock",
      "Better replenishment planning",
    ],
  },
  {
    slug: "godown-wise-reorder-level",
    title: "Godown Wise Re-Order Level",
    subtitle: "Set stock thresholds by location",
    points: [
      "Location-based reorder alerts",
      "Reduce stockouts",
      "Better inventory control",
    ],
  },
  {
    slug: "gst-bill-control",
    title: "GST Bill Control",
    subtitle: "Strengthen GST workflow checks",
    points: [
      "Compliance checks",
      "Smarter validations",
      "Fewer mistakes",
    ],
  },
  {
    slug: "item-cost-selling-rate-update",
    title: "Item STD Cost & Selling Rate Update From Purchase Voucher",
    subtitle: "Auto-update item rates from purchase",
    points: [
      "Faster item updates",
      "Accurate cost tracking",
      "Less manual editing",
    ],
  },
  {
    slug: "item-wise-budget-analysis",
    title: "Item Wise Budget Analysis",
    subtitle: "Track item budgets and variance",
    points: [
      "Budget comparison",
      "Variance insights",
      "Improved planning",
    ],
  },
  {
    slug: "item-wise-margin-set",
    title: "Item Wise Margin Set",
    subtitle: "Define margins per item",
    points: [
      "Flexible pricing rules",
      "Margin safety",
      "Higher control",
    ],
  },
  {
    slug: "item-wise-profit-view",
    title: "Item Wise Profit View In Sales",
    subtitle: "See item profit instantly",
    points: [
      "Profit visibility",
      "Better sales decisions",
      "Quick margin review",
    ],
  },
  {
    slug: "multiple-rack-setting",
    title: "Multiple Rack Setting",
    subtitle: "Organize stock storage efficiently",
    points: [
      "Rack-wise mapping",
      "Faster stock search",
      "Warehouse clarity",
    ],
  },
  {
    slug: "recycle-bin-in-tally",
    title: "Recycle Bin In Tally",
    subtitle: "Recover deleted records safely",
    points: [
      "Restore accidental deletions",
      "Data safety",
      "Better admin control",
    ],
  },
  {
    slug: "salesman-module",
    title: "Salesman Module",
    subtitle: "Manage sales teams with control",
    points: [
      "Salesman-wise tracking",
      "Performance insights",
      "Assignment support",
    ],
  },
  {
    slug: "sales-purchase-excel-import",
    title: "Sales & Purchase Excel Import For Tax Practitioner",
    subtitle: "Import data from Excel quickly",
    points: [
      "Bulk import support",
      "Tax practitioner friendly",
      "Fewer manual entries",
    ],
  },
  {
    slug: "imei-number-tracking",
    title: "IMEI Number Tracking",
    subtitle: "Track device identities in records",
    points: [
      "Device-level traceability",
      "Better service records",
      "Warranty workflow support",
    ],
  },
  {
    slug: "system-date-current-date",
    title: "System Date As Current Date",
    subtitle: "Auto-use system date for entries",
    points: [
      "Faster voucher creation",
      "Consistent date handling",
      "Easy workflow",
    ],
  },
  {
    slug: "sms-integration",
    title: "SMS Integration For Tally",
    subtitle: "Send alerts directly from Tally",
    points: [
      "Instant notifications",
      "Customer communication",
      "Automated reminders",
    ],
  },
];

function TallyAddonsPage() {
  const [backendAddons, setBackendAddons] = useState([]);
  const [activeSlug, setActiveSlug] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAddons = async () => {
      try {
        const response = await api.get("/addons");

        const items = Array.isArray(response?.data?.data)
          ? response.data.data
          : [];

        setBackendAddons(items);
      } catch (error) {
        console.error("Could not load Tally addons:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAddons();
  }, []);

  const addons = useMemo(() => {
    if (!backendAddons.length) {
      return fallbackAddons.map((item, index) => ({
        ...item,
        displayOrder: index + 1,
        isActive: true,
        mediaUrl: item.mediaUrl || "",
        mediaType: item.mediaType || (isEmbeddedVideo(item.mediaUrl) ? "youtube" : "image"),
      }));
    }

    return backendAddons
      .filter((item) => item.isActive !== false)
      .map((item, index) => ({
        ...item,
        points: Array.isArray(item.points) ? item.points : [],
        displayOrder: item.displayOrder || index + 1,
        mediaUrl:
          toEmbedUrl(item.video?.url) ||
          item.thumbnail?.url ||
          "",
        mediaType: isEmbeddedVideo(item.video?.url) ? "youtube" : (item.video?.resourceType || item.thumbnail?.resourceType || "image"),
      }))
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [backendAddons]);

  const visibleAddons = useMemo(() => {
    if (activeSlug === "all") {
      return addons;
    }

    return addons.filter((addon) => addon.slug === activeSlug);
  }, [activeSlug, addons]);

  const currentAddon =
    visibleAddons[currentIndex % Math.max(visibleAddons.length, 1)];

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeSlug]);

  const goPrevious = () => {
    setCurrentIndex((index) =>
      index === 0 ? visibleAddons.length - 1 : index - 1
    );
  };

  const goNext = () => {
    setCurrentIndex((index) =>
      index === visibleAddons.length - 1 ? 0 : index + 1
    );
  };

  const selectAddon = (slug) => {
    setActiveSlug(slug);

    const selectedIndex = addons.findIndex(
      (addon) => addon.slug === slug
    );

    setCurrentIndex(selectedIndex >= 0 ? selectedIndex : 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#06111F] via-[#0B2140] to-[#123A66] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero section */}
      <section className="mt-16 overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
  <div className="grid lg:grid-cols-[1fr_0.9fr]">
    {/* Hero content */}
    <div className="p-8 sm:p-10 lg:p-14">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_10px_30px_rgba(56,189,248,0.35)]">
          <FaChartLine className="text-2xl text-white" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Tally Add-ons
          </h1>

          <p className="mt-1 text-sm leading-relaxed text-white/70">
            Explore CAMET&apos;s TallyPrime customisations with powerful tools
            for automation, inventory, GST and business control.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <p className="max-w-xl text-base leading-7 text-white/65">
          Designed to simplify your business operations, improve accuracy and
          give your team better control.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-2xl font-bold text-cyan-300">24+</div>
          <div className="mt-1 text-sm text-white/60">
            Customisations
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-2xl font-bold text-sky-300">Smart</div>
          <div className="mt-1 text-sm text-white/60">
            Automation tools
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-2xl font-bold text-blue-300">Better</div>
          <div className="mt-1 text-sm text-white/60">
            Business control
          </div>
        </div>
      </div>
    </div>

    {/* Direct image URL */}
    <div className="relative min-h-[350px] overflow-hidden bg-[#08111D]">
      <img
        src={TALLY_POSTER_URL}
        alt="Tally add-ons and business solutions"
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#06111F]/80 via-[#0B2140]/30 to-transparent" />

      <div className="absolute bottom-6 left-6 right-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
          Smart solutions. Better business.
        </p>

        <p className="mt-2 text-xl font-semibold text-white">
          TallyPrime customisations
        </p>
      </div>
    </div>
  </div>
</section>

        {/* Category filter */}
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold sm:text-xl">
              Explore Add-ons
            </h3>

            <span className="text-sm text-white/50">
              {loading ? "Loading..." : `${addons.length} available`}
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              type="button"
              onClick={() => setActiveSlug("all")}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
                activeSlug === "all"
                  ? "border-cyan-400 bg-cyan-400/15 text-cyan-200"
                  : "border-white/10 bg-white/5 text-white/65 hover:border-cyan-400/40 hover:text-white"
              }`}
            >
              All Add-ons
            </button>

            {addons.map((addon) => (
              <button
                key={addon.slug}
                type="button"
                onClick={() => selectAddon(addon.slug)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
                  activeSlug === addon.slug
                    ? "border-cyan-400 bg-cyan-400/15 text-cyan-200"
                    : "border-white/10 bg-white/5 text-white/65 hover:border-cyan-400/40 hover:text-white"
                }`}
              >
                {addon.title}
              </button>
            ))}
          </div>
        </section>

        {/* Featured addon slideshow */}
      <section className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-6">
  {/* Slider controls */}
  <div className="flex items-center justify-between">
    <button
      type="button"
      onClick={goPrevious}
      disabled={!visibleAddons.length}
      className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
    >
      Previous
    </button>

    <span className="text-xs uppercase tracking-widest text-white/50">
      {visibleAddons.length
        ? `${currentIndex + 1} / ${visibleAddons.length}`
        : "0 / 0"}
    </span>

    <button
      type="button"
      onClick={goNext}
      disabled={!visibleAddons.length}
      className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
    >
      Next
    </button>
  </div>

  {/* Current add-on */}
  {currentAddon ? (
    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
      {/* Add-on media */}
      <div className="rounded-[24px] border border-white/10 bg-[#07111E] p-4">
        {currentAddon.mediaUrl ? (
          currentAddon.mediaType === "youtube" ? (
            <div className="aspect-[16/10] overflow-hidden rounded-[20px] bg-black">
              <iframe
                src={currentAddon.mediaUrl}
                title={`${currentAddon.title} video`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : currentAddon.mediaType === "video" ? (
            <video
              src={currentAddon.mediaUrl}
              controls
              preload="metadata"
              className="aspect-[16/10] w-full rounded-[20px] object-cover"
            >
              Your browser does not support the video element.
            </video>
          ) : (
            <img
              src={currentAddon.mediaUrl}
              alt={currentAddon.title}
              className="aspect-[16/10] w-full rounded-[20px] object-cover"
            />
          )
        ) : (
          <div className="flex aspect-[16/10] w-full items-center justify-center rounded-[20px] bg-gradient-to-br from-blue-950 to-slate-950">
            <div className="text-center text-white/60">
              <FaPlayCircle className="mx-auto text-5xl text-cyan-300" />

              <p className="mt-3 text-sm">
                TallyPrime addon preview
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add-on details */}
      <div className="flex flex-col justify-between rounded-[24px] border border-white/10 bg-white/5 p-5 sm:p-6">
        <div>
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-cyan-200">
            Add-on {currentAddon.displayOrder}
          </div>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            {currentAddon.title}
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/65">
            {currentAddon.subtitle}
          </p>

          <ul className="mt-6 space-y-3 text-sm text-white/80">
            {currentAddon.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />

                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Add-on information */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#081629] p-4">
            <div className="text-xs uppercase tracking-widest text-white/40">
              Add-on
            </div>

            <div className="mt-1 text-lg font-semibold text-cyan-300">
              #{String(currentAddon.displayOrder).padStart(2, "0")}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#081629] p-4">
            <div className="text-xs uppercase tracking-widest text-white/40">
              Status
            </div>

            <div className="mt-1 text-lg font-semibold text-emerald-300">
              Active
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#081629] p-4">
            <div className="text-xs uppercase tracking-widest text-white/40">
              Features
            </div>

            <div className="mt-1 text-lg font-semibold text-sky-300">
              {currentAddon.points.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="py-20 text-center text-white/60">
      No add-ons available.
    </div>
  )}
</section>

        {/* All addon cards */}
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold sm:text-xl">
              All 24 Add-ons
            </h3>

            <p className="text-sm text-white/50">
              Click a card to view details
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {addons.map((addon, index) => (
              <button
                key={addon.slug}
                type="button"
                onClick={() => selectAddon(addon.slug)}
                className={`group rounded-[24px] border p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/45 hover:bg-white/10 ${
                  activeSlug === addon.slug
                    ? "border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_0_1px_rgba(103,232,249,0.15)]"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-cyan-300/70">
                      #{String(index + 1).padStart(2, "0")}
                    </div>

                    <h4 className="mt-2 text-base font-semibold text-white group-hover:text-cyan-200">
                      {addon.title}
                    </h4>
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-widest text-white/50">
                    Add-on
                  </div>
                </div>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/60">
                  {addon.subtitle}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {addon.points.slice(0, 3).map((point) => (
                    <span
                      key={point}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-white/10 pt-6 pb-8 text-center">
          <p className="text-sm font-medium text-cyan-200">
            Smart Solutions. Better Business.
          </p>

          <p className="mt-2 text-xs text-white/45">
            CAMET IT Solutions LLP · TallyPrime Customisations
          </p>
        </footer>
      </div>
    </div>
  );
}

export default TallyAddonsPage;
