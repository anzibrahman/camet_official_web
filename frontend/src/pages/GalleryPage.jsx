import { useEffect, useMemo, useState } from "react";
import api from "@/utils/api";

/* ============================================================
   Team Gallery — React component
   Usage: <TeamGallery />
   Blue-themed Tailwind gallery board
   ============================================================ */

// Category definitions
const CATEGORIES = [{ id: "all", label: "All" }];

/* Removed sample gallery items. Gallery content is database-only.
  {
    cat: "camp",
    title: "First night around the fire",
    date: "Mar 2025",
    img: "https://picsum.photos/seed/camp1/500/620",
  },
  {
    cat: "camp",
    title: "Tent-pitching relay",
    date: "Mar 2025",
    img: "https://picsum.photos/seed/camp2/500/640",
  },
  {
    cat: "camp",
    title: "Morning trail, whole crew",
    date: "Mar 2025",
    img: "https://picsum.photos/seed/camp3/500/600",
  },
  {
    cat: "camp",
    title: "Campfire stories",
    date: "Mar 2025",
    img: "https://picsum.photos/seed/camp4/500/660",
  },

  {
    cat: "incidents",
    title: "The projector that would not start",
    date: "Jan 2025",
    img: "https://picsum.photos/seed/inc1/500/630",
  },
  {
    cat: "incidents",
    title: "Flood in the server room",
    date: "Feb 2025",
    img: "https://picsum.photos/seed/inc2/500/600",
  },
  {
    cat: "incidents",
    title: "Fire drill, actual fire",
    date: "Apr 2025",
    img: "https://picsum.photos/seed/inc3/500/650",
  },

  {
    cat: "lunch",
    title: "Friday standup, extended edition",
    date: "Weekly",
    img: "https://picsum.photos/seed/lunch1/500/610",
  },
  {
    cat: "lunch",
    title: "Biryani day",
    date: "May 2025",
    img: "https://picsum.photos/seed/lunch2/500/640",
  },
  {
    cat: "lunch",
    title: "Planning over coffee",
    date: "Jun 2025",
    img: "https://picsum.photos/seed/lunch3/500/600",
  },
  {
    cat: "lunch",
    title: "All-hands, cake included",
    date: "Jun 2025",
    img: "https://picsum.photos/seed/lunch4/500/630",
  },

  {
    cat: "achievements",
    title: "Given: Employee of the Quarter",
    date: "Q1 2025",
    img: "https://picsum.photos/seed/ach1/500/650",
  },
  {
    cat: "achievements",
    title: "Taken: certification, finally",
    date: "Feb 2025",
    img: "https://picsum.photos/seed/ach2/500/610",
  },
  {
    cat: "achievements",
    title: "Given: 5-year service award",
    date: "Mar 2025",
    img: "https://picsum.photos/seed/ach3/500/640",
  },
  {
    cat: "achievements",
    title: "Taken: top performer badge",
    date: "May 2025",
    img: "https://picsum.photos/seed/ach4/500/600",
  },

  {
    cat: "trip",
    title: "Departure, still half asleep",
    date: "Oct 2025",
    img: "https://picsum.photos/seed/trip1/500/620",
  },
  {
    cat: "trip",
    title: "Beach day, whole company",
    date: "Oct 2025",
    img: "https://picsum.photos/seed/trip2/500/660",
  },
  {
    cat: "trip",
    title: "The hike nobody trained for",
    date: "Oct 2025",
    img: "https://picsum.photos/seed/trip3/500/600",
  },
  {
    cat: "trip",
    title: "Last night, karaoke",
    date: "Oct 2025",
    img: "https://picsum.photos/seed/trip4/500/640",
  },

  {
    cat: "christmas",
    title: "Secret Santa reveal",
    date: "Dec 2024",
    img: "https://picsum.photos/seed/xmas1/500/610",
  },
  {
    cat: "christmas",
    title: "Ugly sweater contest",
    date: "Dec 2024",
    img: "https://picsum.photos/seed/xmas2/500/650",
  },
  {
    cat: "christmas",
    title: "Office decorated top to bottom",
    date: "Dec 2024",
    img: "https://picsum.photos/seed/xmas3/500/600",
  },
  {
    cat: "christmas",
    title: "Year-end toast",
    date: "Dec 2024",
    img: "https://picsum.photos/seed/xmas4/500/630",
  },
*/

const ROTATIONS = [-4, -2.5, -1, 0, 1.5, 2.5, 4];

export default function TeamGallery() {
  const [active, setActive] = useState("all");
  const [databaseItems, setDatabaseItems] = useState([]);

  useEffect(() => {
    const loadGalleryItems = async () => {
      try {
        const { data } = await api.get("/gallery");

        const formattedItems = (data?.data || []).map((item) => ({
          ...item,
          cat: item.category,
          date: item.dateLabel,
          img: item.mediaUrl,
        }));

        setDatabaseItems(formattedItems);
      } catch (error) {
        console.error("Could not load gallery:", error);
      }
    };

    loadGalleryItems();
  }, []);

  const allItems = useMemo(() => {
    return databaseItems;
  }, [databaseItems]);

  const categories = useMemo(() => {
    const knownCategories = new Set(
      CATEGORIES.map((category) => category.id)
    );

    const extraCategories = databaseItems
      .map((item) => item.cat)
      .filter(
        (category) => category && !knownCategories.has(category)
      )
      .filter(
        (category, index, values) =>
          values.indexOf(category) === index
      )
      .map((category) => ({
        id: category,
        label: category,
        color: "#65BDEB",
      }));

    return [...CATEGORIES, ...extraCategories];
  }, [databaseItems]);

  const categoryMap = useMemo(() => {
    return Object.fromEntries(
      categories.map((category) => [category.id, category])
    );
  }, [categories]);

  const counts = useMemo(() => {
    const count = {
      all: allItems.length,
    };

    allItems.forEach((item) => {
      count[item.cat] = (count[item.cat] || 0) + 1;
    });

    return count;
  }, [allItems]);

  const visibleItems = useMemo(() => {
    return allItems.filter(
      (item) => active === "all" || item.cat === active
    );
  }, [active, allItems]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071426] via-[#0D2948] to-[#123F68] text-[#F5F9FF]">
      {/* Header */}
      <header className="mx-auto max-w-3xl px-6 pt-16 pb-8 text-center">
        <span className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.22em] text-[#70D6F8] before:h-px before:w-6 before:bg-[#70D6F8] before:opacity-60 before:content-[''] after:h-px after:w-6 after:bg-[#70D6F8] after:opacity-60 after:content-['']">
          Team Moments
        </span>

        <h1 className="mt-4 mb-3 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          The{" "}
          <em className="font-medium italic text-[#70D6F8]">
            gallery
          </em>{" "}
          board
        </h1>

        <p className="mx-auto max-w-md text-base leading-relaxed text-[#D9EAF7]/80">
          Camps, incidents, lunches, wins we handed each other, the
          annual trip, and every Christmas in between — pinned up in one
          place.
        </p>
      </header>

      {/* Filters */}
      <div className="sticky top-0 z-20 flex flex-wrap justify-center gap-2.5 bg-gradient-to-b from-[#0D2948]/95 via-[#0D2948]/75 to-transparent px-6 py-4 backdrop-blur-md">
        {categories.map((category) => {
          const isActive = active === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActive(category.id)}
              className={`whitespace-nowrap rounded-full border px-[18px] py-2 font-mono text-[13px] tracking-wide transition-all ${
                isActive
                  ? "border-[#55C2E8] bg-[#55C2E8] font-semibold text-[#061525] shadow-[0_0_18px_rgba(85,194,232,0.3)]"
                  : "border-[#A9D8F2]/25 bg-white/10 text-[#F5F9FF] hover:border-[#70D6F8]/60 hover:bg-[#55C2E8]/20"
              }`}
            >
              {category.label}

              <span
                className={`ml-1.5 ${
                  isActive ? "opacity-60" : "opacity-65"
                }`}
              >
                {counts[category.id] || 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Gallery board */}
      <main className="mx-auto grid max-w-6xl items-start gap-x-7 gap-y-9 px-8 pt-5 pb-24 [grid-template-columns:repeat(auto-fill,minmax(230px,1fr))]">
        {visibleItems.length === 0 ? (
          <div className="col-span-full py-20 text-center font-mono text-sm text-[#D9EAF7]/60">
            Nothing pinned here yet.
          </div>
        ) : (
          visibleItems.map((item, index) => {
            const category = categoryMap[item.cat];
            const rotation = ROTATIONS[index % ROTATIONS.length];

            return (
              <div
                key={`${item.cat}-${item.title}-${index}`}
                className="relative rounded-sm bg-[#F4F9FF] px-3.5 pt-3.5 pb-5 text-[#10243B] shadow-[0_14px_26px_-10px_rgba(0,0,0,0.45),0_2px_6px_rgba(0,0,0,0.25)] transition-all duration-300 hover:z-10 hover:translate-y-[-6px] hover:scale-[1.035] hover:rotate-0 hover:shadow-[0_24px_40px_-12px_rgba(0,0,0,0.5),0_4px_10px_rgba(0,0,0,0.3)]"
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                {/* Pin */}
                <div
                  className="absolute -top-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full shadow-[0_3px_5px_rgba(0,0,0,0.33)]"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, #DDF7FF, #258DC1 75%)",
                  }}
                />

                {/* Image or video */}
                {item.mediaType === "video" ? (
                  <video
                    src={item.img}
                    controls
                    className="block aspect-[4/5] w-full object-cover"
                  />
                ) : (
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="block aspect-[4/5] w-full object-cover"
                    style={{
                      filter: "sepia(0.03) contrast(1.03) saturate(1.04)",
                    }}
                  />
                )}

                {/* Card details */}
                <div className="pt-3">
                  <div className="font-serif text-[16.5px] font-medium leading-tight text-[#10243B]">
                    {item.title}
                  </div>

                  <div className="mt-1.5 flex justify-between font-mono text-[11px] uppercase tracking-wide text-[#526B82]">
                    <span className="flex items-center">
                      <span
                        className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full"
                        style={{
                          background: category?.color || "#65BDEB",
                        }}
                      />

                      {category?.label || item.cat}
                    </span>

                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </main>

      {/* Footer */}
      <footer className="px-6 pb-14 text-center font-mono text-[11px] tracking-wide text-[#B9D5EA]/50">
        Click a category to filter · click “All” to reset
      </footer>
    </div>
  );
}
