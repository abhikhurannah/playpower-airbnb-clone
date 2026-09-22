import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { calculateStay } from "../src/lib/booking.ts";
const photos = JSON.parse(readFileSync(new URL("../src/data/photos.json", import.meta.url)));
const sample = {
  checkIn: "2026-10-18",
  checkOut: "2026-10-23",
  guests: 2,
  maxGuests: 3,
  nightlyPrice: 5699.8,
  includeFees: false,
};
test("five-night reference stay totals INR 28,499 without floating-point drift", () => {
  const result = calculateStay(sample);
  assert.equal(result.valid, true);
  assert.equal(result.nights, 5);
  assert.equal(result.total, 28499);
});
test("invalid or missing dates do not produce a reservation price", () => {
  for (const [checkIn, checkOut] of [
    ["", "2026-10-23"],
    ["2026-02-30", "2026-03-05"],
    ["2026-10-23", "2026-10-18"],
    ["2026-10-18", "2026-10-18"],
    ["invalid", "2026-10-23"],
  ])
    assert.equal(calculateStay({ ...sample, checkIn, checkOut }).valid, false);
});
test("date arithmetic crosses leap days and daylight-saving boundaries safely", () => {
  assert.equal(
    calculateStay({ ...sample, checkIn: "2028-02-28", checkOut: "2028-03-01" }).nights,
    2,
  );
  assert.equal(
    calculateStay({ ...sample, checkIn: "2026-10-31", checkOut: "2026-11-02" }).nights,
    2,
  );
});
test("guest limits reject fractional, empty and excessive counts", () => {
  for (const guests of [0, -1, 1.5, 4, NaN])
    assert.equal(calculateStay({ ...sample, guests }).valid, false);
});
test("original starter listing fee calculation is retained", () => {
  const stay = calculateStay({ ...sample, nightlyPrice: 182, includeFees: true });
  assert.equal(stay.subtotal, 910);
  assert.equal(stay.cleaning, 65);
  assert.equal(stay.serviceFee, 127);
  assert.equal(stay.total, 1102);
});
test("all 43 original gallery photographs are local valid JPEGs", () => {
  assert.equal(photos.length, 43);
  assert.equal(new Set(photos.map((p) => p.src)).size, 43);
  for (const photo of photos) {
    const path = new URL(`../public${photo.src}`, import.meta.url);
    assert.ok(existsSync(path), photo.src);
    const data = readFileSync(path);
    assert.equal(data[0], 0xff);
    assert.equal(data[1], 0xd8);
  }
});
test("nine categories preserve the reference sequence and counts", () => {
  const counts = {};
  for (const photo of photos) counts[photo.room] = (counts[photo.room] ?? 0) + 1;
  assert.deepEqual(counts, {
    "Living room 1": 3,
    "Living room 2": 7,
    "Full kitchen": 2,
    Bedroom: 6,
    "Full bathroom": 1,
    Gym: 5,
    Exterior: 6,
    Pool: 3,
    "Additional photos": 10,
  });
});
