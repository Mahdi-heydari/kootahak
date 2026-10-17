import { jalaaliMonthLength, toGregorian, toJalaali } from "jalaali-js";

export function getJalaliMonthRange() {
  const jalaliDate = toJalaali(new Date());
  const jalaliMonthLength = jalaaliMonthLength(jalaliDate.jy, jalaliDate.jm);
  const startOfMonthGregorian = toGregorian(jalaliDate.jy, jalaliDate.jm, 1);
  const endOfMonthGregorian = toGregorian(
    jalaliDate.jy,
    jalaliDate.jm,
    jalaliMonthLength,
  );

  return {
    jalaliMonthLength,
    startOfMonth: new Date(
      startOfMonthGregorian.gy,
      startOfMonthGregorian.gm - 1,
      startOfMonthGregorian.gd,
    ),
    endOfMonth: new Date(
      endOfMonthGregorian.gy,
      endOfMonthGregorian.gm - 1,
      endOfMonthGregorian.gd,
      23,
      59,
      59,
      999,
    ),
  };
}
