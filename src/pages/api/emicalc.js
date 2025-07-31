const check = (arr1) => {
  const arr2 = ["price", "roi", "numoi", "nocostemi", "fee"];
  if (arr1.length !== arr2.length) return false;

  const sortedArr1 = arr1.slice().sort(); // Copy and sort the first array
  const sortedArr2 = arr2.slice().sort(); // Copy and sort the second array

  return sortedArr1.every((value, index) => value === sortedArr2[index]);
};

const calculate = ({ price: p, roi, numoi: n, nocostemi, fee }) => {
  n = Number(n);
  const r = roi / (12 * 100);
  let balance = p;
  let pr = 0;
  const r1n = (r + 1) ** n;
  let emidisc = 0;
  if (nocostemi) {
    let newPrinciple = (p * (r1n - 1)) / (r * r1n * n);
    emidisc = p - Math.round(newPrinciple);
    p = newPrinciple;
  }
  const x = p * r;
  const prn = x * r1n;
  const d = r1n - 1;
  const emi = prn / d;
  const intp = Array(n)
    .fill(0)
    .map(() => {
      const int = (p - pr) * r;
      let _pr = emi - int;
      pr += _pr;
      return int;
    });
  balance -= emidisc;
  const plan = intp.map((int, index) => {
    const ppm = emi - int;
    balance -= ppm;
    const toi = int * 0.18;
    const tpmit = emi + toi;
    return {
      month: index + 1,
      emi: Math.round(emi),
      ppm: Math.round(ppm),
      ipm: Math.round(int),
      balance: Math.round(Math.abs(balance)),
      toi: Math.round(toi),
      tpmit: Math.round(tpmit),
    };
  });
  let totalCostWithTax = 0;
  let totalCost = 0;
  plan.forEach((p) => {
    totalCost += p.emi;
    totalCostWithTax += p.tpmit;
  });
  const totalFee = Math.round(1.18 * fee);
  const grandTotal = totalCostWithTax + totalFee;
  const extra = Math.round(grandTotal - p - emidisc);
  return {
    plan,
    totalCost,
    totalCostWithTax,
    totalFee,
    grandTotal,
    extra,
    emidisc,
  };
};

export default function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).send({ message: "Only POST requests allowed" });
  else {
    if (check(Object.keys(req.body))) {
      return res.status(200).send(calculate(req.body));
    } else return res.status(400).send({ message: "Wrong Data" });
  }
}
