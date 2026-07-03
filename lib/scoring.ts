// Pure scoring math for the judging quality loop. No DB access here so it can
// be unit-tested and reused on the server.

export type MetricLite = {
  id: string;
  name: string;
  weight: number;
  maxScore: number;
  order?: number;
};

export type ScoreLite = {
  judgeId: string;
  metricId: string;
  value: number;
};

export type ProjectScore = {
  /** Weighted overall, normalized to 0..100, averaged across judges. */
  overall: number;
  /** Number of judges who scored at least one metric. */
  judgeCount: number;
  /** Average raw value per metric id (across judges), for breakdown views. */
  perMetric: Record<string, { average: number; max: number; count: number }>;
};

/**
 * Compute a project's aggregate score.
 *
 * For each judge we take a weighted average of (value / maxScore) across the
 * metrics they actually scored, giving a 0..100 percentage. The project's
 * overall is the mean of those per-judge percentages, so adding more judges
 * doesn't inflate a score and partially-scored judges are handled gracefully.
 */
export function computeProjectScore(
  metrics: MetricLite[],
  scores: ScoreLite[]
): ProjectScore {
  const metricById = new Map(metrics.map((m) => [m.id, m]));

  const byJudge = new Map<string, Map<string, number>>();
  for (const s of scores) {
    if (!metricById.has(s.metricId)) continue;
    if (!byJudge.has(s.judgeId)) byJudge.set(s.judgeId, new Map());
    byJudge.get(s.judgeId)!.set(s.metricId, s.value);
  }

  const judgePercents: number[] = [];
  for (const metricScores of byJudge.values()) {
    let weighted = 0;
    let weightUsed = 0;
    for (const [metricId, value] of metricScores) {
      const m = metricById.get(metricId)!;
      weighted += (value / m.maxScore) * m.weight;
      weightUsed += m.weight;
    }
    if (weightUsed > 0) judgePercents.push((weighted / weightUsed) * 100);
  }

  const judgeCount = judgePercents.length;
  const overall = judgeCount
    ? judgePercents.reduce((a, b) => a + b, 0) / judgeCount
    : 0;

  const perMetric: ProjectScore["perMetric"] = {};
  for (const m of metrics) {
    const values = scores
      .filter((s) => s.metricId === m.id)
      .map((s) => s.value);
    perMetric[m.id] = {
      average: values.length
        ? values.reduce((a, b) => a + b, 0) / values.length
        : 0,
      max: m.maxScore,
      count: values.length,
    };
  }

  return { overall, judgeCount, perMetric };
}

export function formatScore(overall: number): string {
  return `${overall.toFixed(1)}`;
}
