/** 确定性伪随机：同一字符串永远得到同一组数值，用于生成稳定的视觉母题。 */
export function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

/** 由种子生成 count 个 0..1 的确定性数列 */
export function seededSeries(seed: string, count: number): number[] {
  let s = Math.floor(hashString(seed) * 1e6) + 1;
  const out: number[] = [];
  for (let i = 0; i < count; i += 1) {
    // xorshift，保证同一 seed 结果一致
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    out.push(s / 4294967295);
  }
  return out;
}
