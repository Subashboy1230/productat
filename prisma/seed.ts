import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Default judging rubric (the metric set). Edit weights/metrics in the Admin
// panel after launch, or change here and re-seed.
const DEFAULT_METRICS = [
  {
    name: "Technical Execution",
    description: "How well-built and functional is it? Does it actually work?",
    weight: 1.0,
    maxScore: 10,
    order: 1,
  },
  {
    name: "Innovation",
    description: "How novel and creative is the idea or approach?",
    weight: 1.0,
    maxScore: 10,
    order: 2,
  },
  {
    name: "Design & UX",
    description: "Is it intuitive, polished, and pleasant to use?",
    weight: 1.0,
    maxScore: 10,
    order: 3,
  },
  {
    name: "Impact",
    description: "How useful is it, and how big is the problem it solves?",
    weight: 1.0,
    maxScore: 10,
    order: 4,
  },
];

async function main() {
  // Global settings (single row, id = 1).
  await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });

  // Seed metrics only if none exist yet (don't clobber edited rubrics).
  const count = await prisma.metric.count();
  if (count === 0) {
    for (const m of DEFAULT_METRICS) {
      await prisma.metric.create({ data: m });
    }
    console.log(`Seeded ${DEFAULT_METRICS.length} default metrics.`);
  } else {
    console.log(`Metrics already present (${count}); left untouched.`);
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
